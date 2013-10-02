#!/usr/bin/env python
# -*- coding: utf-8 -*-

""" Vu avec PA vendredi : il ne faut pas utiliser pat.sub() mais pat.match() 
    qui retourne un objet dont on appelle la methode .groups() pour récuperer 
    les groupes qui ont matché.
    pat.sub() retourne la chaine inchangée si le matching ne se fait pas et 
    ce n'est pas terrible à tester.
    Si un élément ne matche pas, pat.match() retournera None que l'on pourra 
    tester. Ensuite on fera template % objet.groups() ou quelque chose 
    d'approchant.
    Pas de '\' avant (), ni {}. Accepter qu'il n'y ait pas de '\r'.
"""

import sys
import re

import logging
LOG = logging.getLogger(__name__)

def remove_eol(line):
    """ Remove the trailing \r if present, and return the result.
    """
    if len(line) >= 2 and line[-2] == '\r':
        return line[:-2]
    elif len(line) >= 1:
        return line[:-1]
    else:
        return line

def replace_with_template(line, filter, template, flags):
    """ Replace the header response by a formatted response with the data
        extracted by the regular expression.

        :param line: A line of the HTTP reponse received.
        :param filter: The regular expression used to extract specific groups.
        :param template: The template string to format the HTTP response.
        :param flags: Optional flags for the regular expression matching.

        :returns: None if the matching failed.
                  String containing the formatted http response otherwise.
    """
    hresp = None

    # With python 2.6, one have to call re.compile to use flags
    pat = re.compile(filter, flags)
    m = pat.match(line)

    # If one element does not match the regular expression, m will be None
    # m.groups(): tuple containing the groups matched with the reg. exp.
    if m is not None:
        try:
            hresp = m.expand(template)
        except e, msg:
            # Can have "invalid group reference", ignore the line
            # or let the exception occur ?
            pass

    return hresp


# 0 is the default for flags in re.py
patterns = [
  (r"^\s*HTTP\S*\s*([0-9]{3}) (.*)$", r"CODE='\1';MSG='\2'", 0),
  (r"^\s*content-type\s*:\s*(.*)(;.*)?$", r"CONTENT_TYPE='\1'", re.IGNORECASE),
  (r"^\s*etag\s*:\s*(.*)$", r"ETAG='\1'", re.IGNORECASE),
  (r"^\s*location\s*:\s*(.*)$", r"LOCATION='\1'", re.IGNORECASE),
  (r"^\s*x-up-to-date\s*:\s*(.*)$", r"X_UP_TO_DATE='\1'", re.IGNORECASE),
  (r".*:compliesWithModel \"([^\"']*)\".*", r"COMPLIES='\1'", 0),
  ]

#logging.basicConfig(filename='regexp.log',level=logging.DEBUG)

for line in sys.stdin.readlines():
    line = remove_eol(line)
    for p in patterns:
        LOG.debug("... Executing : %s filter (flags: %s)", p[0],
                  p[2])
        LOG.debug("... on : '%s'", line)

        formattedResp = replace_with_template(line,
                                              p[0],
                                              p[1],
                                              p[2])
        if formattedResp is not None:
            LOG.debug(">>> %s", formattedResp)
            print formattedResp
            break

    # If no pattern matched, print the line for debug purposes
    #else:
    #    print "#", line
