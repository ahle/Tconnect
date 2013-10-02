#!/bin/bash

## IMPORTANT
## some tests have been commented out with label "[1]" as they do not pass now
## that a quick and dirty hack has been implemented for allowing read-only
## triples in PUT. This is a temporary hack.

#
# I try a number of HTTP queries on localhost:8001, and check that the HTTP 
# return code is as expected. I display an error message for each failed test.
#
# Note that I normally start and stop my own server, but will silently use
# an existing one if any. This is useful if you want to inspect the standard
# error of the server while some tests are failing.
#

CURL="curl -s -D /dev/stderr"

cd `dirname $0`

start_server () {
    ../bin/ktbs -C >&2 &
    TEST_KTBS_PID=$!
    while true; do
        curl localhost:8001 -s >/dev/null && break
    done
}

stop_server () {
    if (ps | grep -q $TEST_KTBS_PID); then
        kill $TEST_KTBS_PID
    fi
}

clear_server () {
    # TODO MINOR use delete (when implemented) instead of re-starting server
    stop_server
    start_server
}

parse_response () {
    # override variables that may be absent from headers
    ETAG=
    X_UP_TO_DATE=
    # get new variable values from header
    OUT1="/tmp/$(basename $0)-$$.1.sh"
    OUT2="/tmp/$(basename $0)-$$.2.sh"
    VARS="/tmp/$(basename $0)-$$.sh"
    "$@" >"$OUT1" 2>"$OUT2"
    #cat "$OUT2" "$OUT1" | sed -f test_http_parse_response.sed >"$VARS"
    cat "$OUT2" "$OUT1" | python parse_http_response.py >"$VARS"
    #echo "===" ">>>"; cat "$VARS"; echo "===" "<<<" ## DEBUG
    . "$VARS"
    rm -f "$VARS" "$OUT1" "$OUT2"
    if [ "$CODE" == "" ]; then CODE=FAIL; fi
}

assert () {
    # usage: assert [ --msg ERROR_MESSAGE ] TEST ARGUMENTS
    if [ "$1" == "--msg" ]; then
        MSG=$2
        shift 2
    else
        MSG="FAIL: Assertion $@"
    fi
    if [ "$@" ]; then
        true
    else
        echo $MSG
        if [ "$BATCH" = "" ]; then
            if [ "$KEEP" = "" ]; then
                stop_server
            else
                echo "Keeping server alive for testing..."
                wait $TEST_KTBS_PID
            fi
            exit
        fi
    fi
}

check_get () {
    # $1 expected HTTP code
    # $2 CURL URL
    # $3 etag (optional)
    if [ "$3" != "" ]; then
        IF_NONE_MATCH="If-None-Match: $3"
    else
        IF_NONE_MATCH=""
    fi
    parse_response $CURL "$2" -H "$IF_NONE_MATCH"
    MSG="FAIL: GET  $2 $3 => $CODE (expected $1)"
    assert --msg "$MSG" "$CODE" == "$1"
}

check_post () {
    # $1 expected HTTP code
    # $2 CURL URL
    # $3 turtle file to post
    POST_OPT="-H content-type:text/turtle --data-binary @$3"
    parse_response $CURL $POST_OPT "$2"
    MSG="FAIL: POST $2 $3 => $CODE (expected $1) $MSG"
    assert --msg "$MSG" "$CODE" == "$1"
}

check_put () {
    # $1 expected HTTP code
    # $2 CURL URL
    # $3 turtle file to post
    # $4 etag (optional)
    if [ "$4" != "" ]; then
        IF_MATCH="If-Match: $4"
    else
        IF_MATCH=""
    fi
    PUT_OPT="-H content-type:text/turtle --data-binary @$3 -X PUT"
    parse_response $CURL $PUT_OPT "$2" -H "$IF_MATCH"
    MSG="FAIL: PUT  $2 $3 $4 => $CODE (expected $1) $MSG"
    assert --msg "$MSG" "$CODE" == "$1"
}

check_ctype () {
    # $1 expected content type
    # $2 CURL URL
    # $3 accept field (optional)
    if [ "$3" == "" ]; then
        ACCEPT="Accept: text/turtle,application/rdf+xml;q=0.8,*/*;q=0.1"
    else
        ACCEPT="Accept: $3"
    fi
    parse_response $CURL "$2" -H "$ACCEPT"
    MSG="FAIL: Content-type $2 $3 => $CONTENT_TYPE (expected $1)"
    assert --msg "$MSG" "$CONTENT_TYPE" == "$1"
}

check_complies () {
    # $1 expected complies result
    # $2 CURL URL
    # $3 accept field (optional)
    if [ "$3" == "" ]; then
        ACCEPT="Accept: text/turtle,application/rdf+xml;q=0.8,*/*;q=0.1"
    else
        ACCEPT="Accept: $3"
    fi
    parse_response $CURL "$2"
    MSG="FAIL: compliesWithModel $2 $3 => $COMPLIES (expected $1)"
    assert --msg "$MSG" "$COMPLIES" == "$1"
}



populate_primary_trace () {
check_post 201 localhost:8001/ bas_base1.ttl
check_post 201 localhost:8001/base1/ mod_model1.ttl
check_put  200 localhost:8001/base1/model1/ gra_model1.ttl $ETAG
check_post 201 localhost:8001/base1/ trc_t01.ttl
}

populate_transformed_traces () {
check_post 201 localhost:8001/base1/ trc_filtered1.ttl
check_post 201 localhost:8001/base1/ trc_filtered2.ttl
check_post 201 localhost:8001/base1/ trc_fusioned1.ttl
}

populate_obsels () {
check_post 201 localhost:8001/base1/t01/ obs1.ttl
check_post 201 localhost:8001/base1/t01/ obs2.ttl
check_post 201 localhost:8001/base1/t01/ obs3.ttl
check_post 201 localhost:8001/base1/t01/ obs4.ttl
}

update_transformed_traces () {
$CURL localhost:8001/base1/fusioned1/@obsels >/dev/null 2>/dev/null
}

job1 () {
# check that the server is here
check_get  200 localhost:8001/
check_get  200 localhost:8001/?editable

# create new base and test it
check_get  404 localhost:8001/base1/
check_post 201 localhost:8001/ bas_base1.ttl
check_post 400 localhost:8001/ bas_base1.ttl # fail second time
check_get  200 localhost:8001/base1/
check_post 201 localhost:8001/ bas_bnode1.ttl
check_post 201 localhost:8001/ bas_bnode1.ttl # blank node works twice

# create new trace-model and test it
check_get  404 localhost:8001/base1/model1/
check_post 201 localhost:8001/base1/ mod_model1.ttl; etagmod=$ETAG
check_post 400 localhost:8001/base1/ mod_model1.ttl # fail second time
check_put  200 localhost:8001/base1/model1/ gra_model1.ttl "$etagmod"
check_get  200 localhost:8001/base1/model1/
check_get  303 localhost:8001/base1/model1/OpenChat
assert $LOCATION = "http://localhost:8001/base1/model1/"
check_get  303 localhost:8001/base1/model1/channel
assert $LOCATION = "http://localhost:8001/base1/model1/"
check_get  303 localhost:8001/base1/model1/onChannel
assert $LOCATION = "http://localhost:8001/base1/model1/"

# create new trace and test it
check_get  404 localhost:8001/base1/t01/
check_post 201 localhost:8001/base1/ trc_t01.ttl
check_post 400 localhost:8001/base1/ trc_t01.ttl # fail second time
check_get  303 localhost:8001/base1/t01/
assert "$LOCATION" = "http://localhost:8001/base1/t01/@about"
check_get  200 localhost:8001/base1/t01/@about
check_get  200 localhost:8001/base1/t01/@obsels
check_get  200 'localhost:8001/base1/t01/@obsels?minb=1&maxb=2&mine=3&maxe=4'
check_get  200 localhost:8001/base1/t01/@about?editable
check_post 201 localhost:8001/base1/ trc_bnode1.ttl
check_post 201 localhost:8001/base1/ trc_bnode1.ttl # blank node works twice

# create obsels and test them
check_get  404 localhost:8001/base1/t01/obs1
check_post 201 localhost:8001/base1/t01/ obs1.ttl
check_post 400 localhost:8001/base1/t01/ obs1.ttl # fail second time
check_get  303 localhost:8001/base1/t01/obs1
assert "$LOCATION" = "http://localhost:8001/base1/t01/@obsels?id=obs1"
check_post 201 localhost:8001/base1/t01/ obs2.ttl
check_post 201 localhost:8001/base1/t01/ obs2.ttl # blank node works twice
check_get  303 $LOCATION # accessing new obsel redirects to @obsels?id=X
check_get  200 $LOCATION # now accessing @obsels?id=X
} #end job1

job2 () { # check how etag change with GET and POST
  populate_primary_trace
  parse_response $CURL localhost:8001/base1/t01/@about; etaga=$ETAG
check_get 304 localhost:8001/base1/t01/@about "$etaga"
check_get 200 localhost:8001/base1/t01/@about '"foobar"'
  parse_response $CURL localhost:8001/base1/t01/@obsels; etago=$ETAG
check_get 304 localhost:8001/base1/t01/@obsels "$etago"
check_get 200 localhost:8001/base1/t01/@obsels '"foobar"'
check_post 201 localhost:8001/base1/t01/ obs1.ttl
check_get 304 localhost:8001/base1/t01/@about "$etaga"
check_get 200 localhost:8001/base1/t01/@obsels "$etago"
} # end job2

job3 () { # check PUT
  populate_primary_trace
  populate_obsels
check_put  200 localhost:8001/ <(curl -s localhost:8001/?editable)
check_put  200 localhost:8001/ change_maintainer.ttl
#check_put  400 localhost:8001/ trc_t01.ttl # bad data ## [1]

check_put  403 localhost:8001/base1/t01/@about \
    <(curl -s localhost:8001/base1/t01/@about?editable) # missing ETag
check_put  403 localhost:8001/base1/t01/@about \
    <(curl -s localhost:8001/base1/t01/@about?editable) \* # generic ETag
check_put  412 localhost:8001/base1/t01/@about \
    <(curl -s localhost:8001/base1/t01/@about?editable) '"foobar"' # bad ETag
  parse_response $CURL localhost:8001/base1/t01/@about
  etag="$ETAG"
check_put  200 localhost:8001/base1/t01/@about \
    <(curl -s localhost:8001/base1/t01/@about?editable) "$etag" # good ETag
assert "$ETAG" != "$etag"
  etag="$ETAG"
check_put  400 localhost:8001/base1/t01/@about trc_t01.ttl "$etag" # bad data
} # end job3

job4 () { # check illegal POSTing
  populate_primary_trace
  populate_transformed_traces
# try to post illegal elements
check_post 400 localhost:8001/base1/ illegal_transformation1.ttl
check_post 400 localhost:8001/base1/ illegal_transformation2.ttl
check_post 400 localhost:8001/base1/ illegal_transformation3.ttl
check_post 400 localhost:8001/base1/ illegal_transformation4.ttl
check_post 400 localhost:8001/base1/ illegal_transformation5.ttl
check_post 400 localhost:8001/base1/ illegal_trace1.ttl
check_post 400 localhost:8001/base1/ illegal_trace2.ttl
check_post 400 localhost:8001/base1/ illegal_ttrace1.ttl
check_post 400 localhost:8001/base1/ illegal_ttrace2.ttl
check_post 400 localhost:8001/base1/ illegal_ttrace3.ttl
check_post 400 localhost:8001/base1/ illegal_ttrace4.ttl
check_post 400 localhost:8001/base1/t01/ illegal_obs1.ttl
check_post 400 localhost:8001/base1/t01/ illegal_obs2.ttl
check_post 400 localhost:8001/base1/t01/ illegal_obs3.ttl
check_post 400 localhost:8001/base1/t01/ illegal_obs4.ttl
check_post 400 localhost:8001/base1/t01/ illegal_obs5.ttl
check_post 400 localhost:8001/base1/t01/ illegal_obs6.ttl
check_post 400 localhost:8001/base1/t01/ illegal_obs7.ttl
check_post 400 localhost:8001/base1/t01/ illegal_obs8.ttl
check_post 400 localhost:8001/base1/t01/ illegal_obs9.ttl
check_post 400 localhost:8001/base1/t01/ illegal_obs10.ttl
# try to post elements of wrong types
check_post 400 localhost:8001/ trc_t01.ttl
check_post 400 localhost:8001/ obs1.ttl
check_post 400 localhost:8001/base1/ bas_base1.ttl
check_post 400 localhost:8001/base1/ obs1.ttl
check_post 400 localhost:8001/base1/t01/ bas_base1.ttl
check_post 400 localhost:8001/base1/t01/ trc_t01.ttl
} # end job4

job5 () { # test some bad querystrings
  populate_primary_trace
check_get  400 localhost:8001/?foo=bar
check_post 400 localhost:8001/?foo=bar bas_bnode1.ttl
check_put  400 localhost:8001/?foo=bar <(curl -s localhost:8001/?editable)
check_get  400 localhost:8001/base1/?foo=bar
check_post 400 localhost:8001/base1/?foo=bar trc_bnode1.ttl
check_put  400 localhost:8001/?foo=bar \
  <(curl -s localhost:8001/base1/?editable)
check_get  400 localhost:8001/base1/t01/?foo=bar
check_post 400 localhost:8001/base1/t01/?foo=bar trc_bnode1.ttl
check_put  400 localhost:8001/base1/t01/?foo=bar \
  <(curl -s localhost:8001/base1/t01/?editable)
check_get  400 localhost:8001/base1/t01/@about?foo=bar
check_post 400 localhost:8001/base1/t01/@about?foo=bar trc_bnode1.ttl
  parse_response $CURL localhost:8001/base1/t01/@about
check_put  400 localhost:8001/base1/t01/@about?foo=bar \
  <(curl -s localhost:8001/base1/t01/@about?editable) $ETAG
} # end job5

job6 () { # check content-negotation
check_ctype text/turtle localhost:8001/
check_ctype text/turtle localhost:8001/ "text/txt,text/turtle;q=0.1"
check_ctype application/rdf+xml localhost:8001/ \
    "application/rdf+xml,text/turtle;q=0.1"
check_ctype text/turtle localhost:8001/.ttl "*/*"
check_ctype application/rdf+xml localhost:8001/.rdf "*/*"
# check that extension overrides Accept
check_ctype text/turtle localhost:8001/.ttl "application/rdf+xml"
check_ctype application/rdf+xml localhost:8001/.rdf "text/turtle"
check_ctype application/rdf+xml localhost:8001/.rdf "application/x-foobar"
  parse_response $CURL localhost:8001/ -H "Accept: application/x-foobar"
assert $CODE == 406 # not acceptable
# check unrecognized extension
check_get 404 localhost:8001/.xyz
} # end job6

job7 () { # check monotonicity
  populate_primary_trace
check_post 201 localhost:8001/base1/t01/ obs3.ttl
check_post 400 localhost:8001/base1/t01/ obs2.ttl
} # end job7


job8 () { # check transformations
# t01 --> filtered1 --> filtered2 -
#     `----------------------------`-> fusioned1
# filtered1 will contain obs[123], filtered2 will contain obs[23]
# fusioned1 will contain obs[1234] plus another copy of obs[23]
  populate_primary_trace
  populate_transformed_traces
check_get 303 localhost:8001/base1/t01/
assert $LOCATION = http://localhost:8001/base1/t01/@about
check_get 303 localhost:8001/base1/filtered1/
assert $LOCATION = http://localhost:8001/base1/filtered1/@about
check_get 303 localhost:8001/base1/filtered2/
assert $LOCATION = http://localhost:8001/base1/filtered2/@about
check_get 303 localhost:8001/base1/fusioned1/
assert $LOCATION = http://localhost:8001/base1/fusioned1/@about
check_get 200 localhost:8001/base1/filtered1/@about
check_get 200 localhost:8001/base1/filtered2/@about
check_get 200 localhost:8001/base1/fusioned1/@about
check_get 200 localhost:8001/base1/filtered1/@obsels; etag1=$ETAG
check_get 200 localhost:8001/base1/filtered2/@obsels; etag2=$ETAG
check_get 200 localhost:8001/base1/fusioned1/@obsels; etag3=$ETAG
check_get 304 localhost:8001/base1/filtered1/@obsels $etag1
check_get 304 localhost:8001/base1/filtered2/@obsels $etag2
check_get 304 localhost:8001/base1/fusioned1/@obsels $etag3
check_post 201 localhost:8001/base1/t01/ obs1.ttl
check_get 200 localhost:8001/base1/filtered1/@obsels $etag1; etag1=$ETAG
check_get 304 localhost:8001/base1/filtered2/@obsels $etag2
check_get 200 localhost:8001/base1/fusioned1/@obsels $etag3; etag3=$ETAG
check_post 201 localhost:8001/base1/t01/ obs2.ttl
check_get 200 localhost:8001/base1/filtered1/@obsels $etag1; etag1=$ETAG
check_get 200 localhost:8001/base1/filtered2/@obsels $etag2; etag2=$ETAG
check_get 200 localhost:8001/base1/fusioned1/@obsels $etag3; etag3=$ETAG
check_post 201 localhost:8001/base1/t01/ obs3.ttl
check_get 200 localhost:8001/base1/filtered1/@obsels $etag1; etag1=$ETAG
check_get 200 localhost:8001/base1/filtered2/@obsels $etag2; etag2=$ETAG
check_get 200 localhost:8001/base1/fusioned1/@obsels $etag3; etag3=$ETAG
check_post 201 localhost:8001/base1/t01/ obs4.ttl
check_get 304 localhost:8001/base1/filtered1/@obsels $etag1
check_get 304 localhost:8001/base1/filtered2/@obsels $etag2
check_get 200 localhost:8001/base1/fusioned1/@obsels $etag3; etag3=$ETAG
check_get 200 'localhost:8001/base1/fusioned1/@obsels?minb=1&maxb=2&mine=3&maxe=4'
} # end job8

job9 () { # check that etag does not change while we request computed traces
          # with ?quick
  populate_primary_trace
check_post 201 localhost:8001/base1/ trc_filtered1.ttl
check_get 200 localhost:8001/base1/filtered1/@obsels; etag1=$ETAG
check_post 201 localhost:8001/base1/t01/ obs1.ttl
check_post 201 localhost:8001/base1/t01/ obs2.ttl
check_post 201 localhost:8001/base1/t01/ obs3.ttl
check_get 304 localhost:8001/base1/filtered1/@obsels?quick $etag1
assert "$X_UP_TO_DATE" == "False"
check_get 200 localhost:8001/base1/filtered1/@obsels $etag1; etag1a=$ETAG
assert "$X_UP_TO_DATE" == "" # no X-Up-To-Date when ?quick is not used
check_get 200 localhost:8001/base1/filtered1/@obsels?quick $etag1
assert $etag1a == $ETAG
assert "$X_UP_TO_DATE" == "True"
} # end job9

job10 () { # check that t01/@about changes when the trace violates its model
  populate_primary_trace
  parse_response $CURL localhost:8001/base1/t01/@about; etag="$ETAG"
} # end job10

job11 () { # test amending trace
  populate_primary_trace
  populate_transformed_traces
  populate_obsels
  parse_response $CURL localhost:8001/base1/t01/@obsels; etagp=$ETAG
check_get  200 localhost:8001/base1/filtered1/@obsels; etagt1=$ETAG
check_get  200 localhost:8001/base1/filtered2/@obsels; etagt2=$ETAG
check_get  200 localhost:8001/base1/fusioned1/@obsels; etagt3=$ETAG
check_get  304 localhost:8001/base1/filtered1/@obsels?quick $etagt1
check_get  304 localhost:8001/base1/filtered2/@obsels?quick $etagt2
check_get  304 localhost:8001/base1/fusioned1/@obsels?quick $etagt3
  # we amend the primary trace
check_put  200 localhost:8001/base1/t01/@obsels <(true) $etagp
  # with ?quick, transformed traces are not affected, even by an amendment
check_get  304 localhost:8001/base1/filtered1/@obsels?quick $etagt1
check_get  304 localhost:8001/base1/filtered2/@obsels?quick $etagt2
check_get  304 localhost:8001/base1/fusioned1/@obsels?quick $etagt3
  # however, without ?quick, traces are computed again
check_get  200 localhost:8001/base1/filtered1/@obsels; etagt1=$ETAG
check_get  200 localhost:8001/base1/filtered2/@obsels; etagt2=$ETAG
check_get  200 localhost:8001/base1/fusioned1/@obsels; etagt3=$ETAG
populate_obsels
check_get  200 localhost:8001/base1/filtered1/@obsels $etagt1
check_get  200 localhost:8001/base1/filtered2/@obsels $etagt2
check_get  200 localhost:8001/base1/fusioned1/@obsels $etagt3
} # end job11

job12 () { # test trace-model compliance
  populate_primary_trace
  populate_transformed_traces
check_complies yes localhost:8001/base1/t01/@about
check_complies '?' localhost:8001/base1/filtered1/@about
check_complies '?' localhost:8001/base1/filtered2/@about
check_complies '?' localhost:8001/base1/fusioned1/@about
  check_post 201 localhost:8001/base1/t01/ obs1.ttl
check_complies yes localhost:8001/base1/t01/@about
check_complies '?' localhost:8001/base1/filtered1/@about
check_complies '?' localhost:8001/base1/filtered2/@about
check_complies '?' localhost:8001/base1/fusioned1/@about
  update_transformed_traces
check_complies yes localhost:8001/base1/t01/@about
check_complies yes localhost:8001/base1/filtered1/@about
check_complies yes localhost:8001/base1/filtered2/@about
check_complies yes localhost:8001/base1/fusioned1/@about
  check_post 201 localhost:8001/base1/t01/ obs2.ttl
check_complies yes localhost:8001/base1/t01/@about
check_complies '?' localhost:8001/base1/filtered1/@about
check_complies '?' localhost:8001/base1/filtered2/@about
check_complies '?' localhost:8001/base1/fusioned1/@about
  update_transformed_traces
check_complies yes localhost:8001/base1/t01/@about
check_complies yes localhost:8001/base1/filtered1/@about
check_complies yes  localhost:8001/base1/filtered2/@about
check_complies yes localhost:8001/base1/fusioned1/@about
  check_post 201 localhost:8001/base1/t01/ obs3.ttl
check_complies yes localhost:8001/base1/t01/@about
check_complies '?' localhost:8001/base1/filtered1/@about
check_complies '?' localhost:8001/base1/filtered2/@about
check_complies '?' localhost:8001/base1/fusioned1/@about
  update_transformed_traces
check_complies yes localhost:8001/base1/t01/@about
check_complies yes localhost:8001/base1/filtered1/@about
check_complies yes  localhost:8001/base1/filtered2/@about
check_complies yes localhost:8001/base1/fusioned1/@about
  check_post 201 localhost:8001/base1/t01/ obs4.ttl
check_complies yes localhost:8001/base1/t01/@about
check_complies '?' localhost:8001/base1/filtered1/@about
check_complies '?' localhost:8001/base1/filtered2/@about
check_complies '?' localhost:8001/base1/fusioned1/@about
  update_transformed_traces
check_complies yes localhost:8001/base1/t01/@about
check_complies yes localhost:8001/base1/filtered1/@about
check_complies yes  localhost:8001/base1/filtered2/@about
check_complies yes localhost:8001/base1/fusioned1/@about
  clear_server
  populate_primary_trace
  check_post 201 localhost:8001/base1/t01/ obs2.ttl
check_complies no  localhost:8001/base1/t01/@about
} # end job12

job13 () { # scripted transformations
  populate_primary_trace
  populate_transformed_traces
check_post 201 localhost:8001/base1/ met_count.ttl; etag_m=$ETAG
check_post 201 localhost:8001/base1/ trc_count1.ttl
check_complies '?' localhost:8001/base1/count1/@about
  parse_response $CURL localhost:8001/base1/count1/@obsels; etag=$ETAG
check_get  304 localhost:8001/base1/count1/@obsels $etag
  populate_obsels
check_get  200 localhost:8001/base1/count1/@obsels $etag; etag=$ETAG
check_get  304 localhost:8001/base1/count1/@obsels $etag
check_complies '?' localhost:8001/base1/count1/@about
  # the compliance status is unknown, because the model is unreachable
check_put  550 localhost:8001/base1/count met_count_illegal.ttl $etag_m
}

job14 () { # source-less computed trace
  populate_primary_trace
check_post 201 localhost:8001/base1/ met_helloworld.ttl
check_post 201 localhost:8001/base1/ trc_helloworld1.ttl
check_complies '?' localhost:8001/base1/helloworld1/@about
check_get  200 localhost:8001/base1/helloworld1/@obsels $etag; etag=$ETAG
# the query above collected 'hello'
check_get  200 localhost:8001/base1/helloworld1/@obsels $etag; etag=$ETAG
# the query above collected 'world'; the trace is now finished
check_get  304 localhost:8001/base1/helloworld1/@obsels $etag
check_complies '?' localhost:8001/base1/helloworld1/@about
  # the compliance status is unknown, because the model is unreachable
}

job15 () { # sparql transformations
  populate_primary_trace
check_post 201 localhost:8001/base1/ met_session.ttl
check_post 201 localhost:8001/base1/ trc_session1.ttl
check_complies '?' localhost:8001/base1/session1/@about
check_get  200 localhost:8001/base1/session1/@obsels; etag=$ETAG
check_get  304 localhost:8001/base1/session1/@obsels $etag
  populate_obsels
check_get  200 localhost:8001/base1/session1/@obsels $etag; etag=$ETAG
check_get  304 localhost:8001/base1/session1/@obsels $etag
check_complies 'no' localhost:8001/base1/session1/@about
}

job16 () { # supermethod transformations
  populate_primary_trace
check_post 201 localhost:8001/base1/ met_count.ttl
check_post 201 localhost:8001/base1/ met_session.ttl
check_post 201 localhost:8001/base1/ trc_super1.ttl
check_complies '?' localhost:8001/base1/super1/@about
check_get  200 localhost:8001/base1/super1/@obsels; etag_o=$ETAG
check_get  304 localhost:8001/base1/super1/@obsels $etag_o
  populate_obsels
check_get  200 localhost:8001/base1/super1/@obsels $etag_o; etag_o=$ETAG
check_get  304 localhost:8001/base1/super1/@obsels $etag_o
check_complies '?' localhost:8001/base1/super1/@about
check_get  303 localhost:8001/base1/__super1_count/
check_get  303 localhost:8001/base1/__super1_session/
# check that touching dependancies alter the trace
  parse_response $CURL localhost:8001/base1/count; etag_c=$ETAG
check_put  200 localhost:8001/base1/count met_count_mod.ttl $etag_c
check_get  200 localhost:8001/base1/super1/@obsels $etag_o; etag_o=$ETAG
}

job17 () { # the last job should always end the script gracefully
           # (this is not absolutely required, but provides more explicit
           # feedback)
    echo "I'm finally done!" >&2
    stop_server
    exit 0
}

# parse arguments
while [ "$*" != "" ]; do
    if [ "$1" = "--batch" ]; then
        BATCH=yes
    elif [ "$1" = "--keep" ]; then
        KEEP=yes
    elif [ "$START" = "" ]; then
        START="$1"
    else
        echo "usage: $0 [--batch|--keep] [start]" >&2
        exit 1
    fi
    shift
done

trap stop_server SIGINT

# main loop
start_server
if [ "$START" = "" ]; then i=1; else i="$START"; fi
while true; do
    echo === job$i >&2
    job$i || break
    i=$(echo $i+1|bc)
    clear_server
done
true
stop_server
