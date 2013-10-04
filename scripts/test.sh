#!/bin/bash

function make_opts(){

s_true=true
OPTIND=2
while getopts "a:b:c:" opt; do
  case $opt in
    a)
      echo "-a was triggered, Parameter: $OPTARG"
	 s_true=false
      ;;
    \?)
      echo "Invalid option: -$OPTARG"
      
      ;;
    :)
      echo "Option -$OPTARG requires an argument."
      exit 1
      ;;
  esac
  
done
shift $((OPTIND-1))

echo $s_true
	if [ "runtime" = "runtime" ]
	then
		echo "-s is required"
		exit;
	fi

echo "pprform"

}
# 
#make_opts -ktbs -a hoang
make_opts -ktbs -a hoang dsqfs

