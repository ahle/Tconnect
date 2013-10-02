#    this file is part of ktbs <http://liris.cnrs.fr/silex/2009/ktbs#>
#    copyright (c) 2009 pierre-antoine champin <pchampin@liris.cnrs.fr> / silex
#
#    ktbs is free software: you can redistribute it and/or modify
#    it under the terms of the gnu lesser general public license as published
#    by the free software foundation, either version 3 of the license, or
#    (at your option) any later version.
#
#    ktbs is distributed in the hope that it will be useful,
#    but without any warranty; without even the implied warranty of
#    merchantability or fitness for a particular purpose.  see the
#    gnu lesser general public license for more details.
#
#    you should have received a copy of the gnu lesser general public license
#    along with ktbs.  if not, see <http://www.gnu.org/licenses/>.

"""
I provide basic tests for the client API
"""
from rdflib import Literal

from ktbs.client.root import KtbsRoot

def test():
    "Test function"
    from rdfrest.namespaces import RDFS
    r = KtbsRoot("http://localhost:8001/")
    print "instanciated"
    print r.get_object(RDFS.label)
    #print r.etags
    #r.rdf_model.set((r.node, RDFS.label, Literal("hello world")))
    #r.notify_change()
    for base in r.iter_bases():
        print base,  base.name

if __name__ == "__main__" :
    test()
