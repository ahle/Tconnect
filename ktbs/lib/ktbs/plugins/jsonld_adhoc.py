#    This file is part of KTBS <http://liris.cnrs.fr/sbt-dev/ktbs>
#    Copyright (C) 2011-2012 Pierre-Antoine Champin <pchampin@liris.cnrs.fr> /
#    Universite de Lyon <http://www.universite-lyon.fr>
#
#    KTBS is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Lesser General Public License as published
#    by the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    KTBS is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Lesser General Public License for more details.
#
#    You should have received a copy of the GNU Lesser General Public License
#    along with KTBS.  If not, see <http://www.gnu.org/licenses/>.

"""
I provide ad-hoc JSON-LD serializers.
"""
from rdflib import BNode, Literal, RDF, URIRef, Variable, XSD
from rdflib_sparql.processor import prepareQuery
from rdfrest.parsers import wrap_exceptions
from rdfrest.serializers import get_prefix_bindings, iter_serializers, \
    register_serializer, SerializeError

from ..namespace import KTBS, KTBS_NS_URI

def encode_unicodes(func):
    def wrapped(*args, **kw):
        for i in func(*args, **kw):
            yield i.encode("utf-8")
    return wrapped

JSONLD = "application/ld+json"

@register_serializer(JSONLD, "json", 81, KTBS.ComputedTraceObsels)
@register_serializer(JSONLD, "json", 81, KTBS.StoredTraceObsels)
@register_serializer("application/json", None, 60, KTBS.ComputedTraceObsels)
@register_serializer("application/json", None, 60, KTBS.StoredTraceObsels)
@wrap_exceptions(SerializeError)
@encode_unicodes
def serialize_json_trace_obsels(graph, resource, bindings=None):
    trace_uri = resource.trace.uri
    model_uri = resource.trace.model_uri
    if model_uri[-1] not in { "/", "#" }:
        model_uri += "#"

    def compact(uri):
        uri = str(uri)
        if uri.startswith(model_uri):
            return "m:%s" % uri[len(model_uri):]
        elif uri.startswith(trace_uri):
            return uri[len(trace_uri):]
        else:
            return uri
    
    def json(node):
        if isinstance(node, URIRef):
            return '{ "@id": "%s" }' % compact(node)
        elif isinstance(node, BNode):
            return '{}'
        else: 
            assert isinstance(node, Literal)
            if node.datatype in (
                    XSD.integer, XSD.double, XSD.decimal, XSD.bool):
                return unicode(node)
            else:
                return u'"%r"' % node

    yield u"""
{
    "@context": [
        "http://liris.cnrs.fr/silex/2011/ktbs-jsonld-context",
        { "m": "%s" }
    ],
    "@id": ".",
    "hasObselList": "@obsels",
    "obsels": [""" % model_uri

    obsels = graph.query("""
        PREFIX : <%s#>
        SELECT ?obs ?otype ?subject ?begin ?end
        {
            ?obs a ?otype ; :hasSubject ?subject ; :hasBegin ?begin ;
                 :hasEnd ?end ;
            .
        } ORDER BY ?begin ?end
    """ % KTBS_NS_URI)

    # hack due to a bug in rdflib_sparq 1.0
    obsels = ( (i[Variable("?obs")], i[Variable("?otype")],
                i[Variable("?subject")], i[Variable("?begin")],
                i[Variable("?end")],) for i in obsels.bindings )

    comma = u""
    for obs, otype, subject, begin, end in obsels:
        yield comma + u"""
        {
            "@id": "%s",
            "@type": "%s",
            "subject": "%s",
            "begin": %s,
            "end": %s""" % (compact(obs), compact(otype), subject, begin, end)

        source_obsels = list(graph.objects(obs, KTBS.hasSourceObsel))
        if source_obsels:
            source_obsels = ", ".join( '"%s"' % compact(i)
                                       for i in source_obsels )
            yield u""",\n            "hasSourceObsel": [%s]""" % source_obsels

        for pred, obj in graph.query(OTHER_ARCS, initBindings={"subj": obs}):
            yield u""",\n            "%s": %s""" % (compact(pred), json(obj))
        yield u"""
        }"""
        comma = u"," # after first obsel, prefix others with a comma

    yield """
    ]
}
"""

OTHER_ARCS = prepareQuery("""
    SELECT ?pred ?obj
    {
        ?subj ?pred ?obj .
        FILTER( substr(str(?pred), 1, %s) != "%s#" && ?pred != <%s>)
    } ORDER BY ?pred ?obj """ % (len(KTBS_NS_URI)+1, KTBS_NS_URI, RDF.type))


@register_serializer(JSONLD, "json", 81, KTBS.ComputedTrace)
@register_serializer(JSONLD, "json", 81, KTBS.StoredTrace)
@register_serializer("application/json", None, 60, KTBS.ComputedTrace)
@register_serializer("application/json", None, 60, KTBS.StoredTrace)
@wrap_exceptions(SerializeError)
@encode_unicodes
def serialize_json_trace(graph, resource, bindings=None):
    
    yield u"""
{
    "@context": "http://liris.cnrs.fr/silex/2011/ktbs-jsonld-context",
    "@id": "%s",
    "@type": "%s",
    "hasModel": "%s",
    "origin": "%s",
    "hasObselList": "%s/@obsels" """ % (
        resource.uri,
        resource.RDF_MAIN_TYPE[len(KTBS_NS_URI)+1:],
        resource.model_uri,
        resource.origin,
        resource.uri,
        )
    default_subject = graph.value(resource.uri, KTBS.hasDefaultSubject)
    if default_subject:
        yield u""",\n    "hasDefaultSubject": "%s" """% str(default_subject)
    if resource.label:
        yield u""",\n    "label": "%s" """% str(resource.label)
    yield u"""
}
"""


def start_plugin():
    pass
