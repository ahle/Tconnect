

TraceDB = {}
TraceDB.DEBUG = false;
TraceDB.adapters = {};
TraceDB.plugins = {};

function quote(str) {
	return "'" + str + "'";
}

var TRACEDB_VERSION = 1;

var TRACEDB_SIZE = 5 * 1024 * 1024;

// The object stores created for each database
// DOC_STORE stores the document meta data, its revision history and state
var TRACE_STORE = quote('document-store');
// BY_SEQ_STORE stores a particular version of a document, keyed by its
// sequence id
var BY_SEQ_STORE = quote('by-sequence');
// Where we store attachments
var ATTACH_STORE = quote('attach-store');
var META_STORE = quote('metadata-store');

var unknownError = function(callback) {
  return function(event) {
    PouchUtils.call(callback, {
      status: 500,
      error: event.type,
      reason: event.target
    });
  };
};

TraceDB = function(name){	
	if (typeof opts === 'function' || typeof opts === 'undefined') {
	    callback = opts;
	    opts = {};
	  }
	this.name = name;
	
	if (typeof name === 'object') {
	    opts = name;
	    name = undefined;
	}

	if (typeof callback === 'undefined') {
	    callback = function() {};
	}
	
	
	
	this.post = function(){
		
		
	}
	// create new trace or update an existing trace
	this.put = function(trace, options, callback){
		
		
		
	}
}

TraceDB.parseAdapter = function(name){
	var match=name.match();
};

TraceDBAdapter = function(opts, callback){
	
	var api = {};
	var customApi = "";
	
	api.post = function(doc, opts, callback){
		if (typeof opts === 'function') {
		      callback = opts;
		      opts = {};
		    }
		    if (typeof doc !== 'object' || Array.isArray(doc)) {
		      return call(callback, Pouch.Errors.NOT_AN_OBJECT);
		    }
		    return customApi.bulkDocs({docs: [doc]}, opts,
		        autoCompact(yankError(callback)));
	}
	
	
	
	
	
	
	
};

TraceDB.destroy = function(name, opts, callback){
	 if (typeof opts === 'function' || typeof opts === 'undefined') {
		    callback = opts;
		    opts = {};
		  }

		  if (typeof name === 'object') {
		    opts = name;
		    name = undefined;
		  }

		  if (typeof callback === 'undefined') {
		    callback = function() {};
		  }
		  var backend = TraceDB.parseAdapter(opts.name || name);

		  var cb = function(err, response) {
		    if (err) {
		      callback(err);
		      return;
		    }

		    for (var plugin in TraceDB.plugins) {
		    	TraceDB.plugins[plugin]._delete(backend.name);
		    }
		    if (TraceDB.DEBUG) {
		      console.log(backend.name + ': Delete Database');
		    }

		    // call destroy method of the particular adaptor
		    //TraceDB.adapters[backend.adapter].destroy(backend.name, opts, callback);
		  };

		  // remove Pouch from allDBs
		  //TraceDB.removeFromAllDbs(backend, cb);
};

var webSqlDB = function(opts, callback){
	
	var api={}
	var instanceId = null;
	var name = opts.name;
	
	var db = openDatabase(name, version, pouch_size);
	if(!db){
		return "";
	}
	
	function dbCreated(){
		callback(null, api);
	}
	
	function setup(){
		
	}
	
	api.type = function(){
		return 'websql';
	}
	api.id = function(){
		return instanceId;
	}
	api._info = function(callback){
		db.transaction(function(tx){
			var sql = 'SELECT COUNT(id) AS count FROM ' + DOC_STORE;
			
			
			
		});		
	}
	
	api._bulkDocs = function idb_bulkDocs(req, opts, callback){
		var newEdits = opts.new_edits;
		var userDocs = req.docs;
		var docsWritten = 0;
		
		// parse the docs, give them a sequence number for the result
		var docInfos = userDocs.map(function(doc, i){
			var newDoc = PouchUtils.parseDoc(doc, newEdits);
			newDoc._bulk_seq = i;
			return newDoc;		
		});
		var docInfoErrors = docInfos.filter(function(docInfo){
			return docInfo.error;
		});
		
		var tx;
		var results = [];
		var fetched
		
		function sortByBulkSeq(a, b){
			return a._bulk_seq - b._bulk_seq;
		}
		
		function complete(event){
			var aresults = [];
			results.sort(sortByBulkSeq);
			results.forEach(function(result){
				delete result._bulk_seq;
				
			});
		}
		
		function preprocessAttachment(att, finish){
			
		}
		
		function preprocessAttachment(callback){
			
		}
		
		function writeDoc(docInfo, callback, isUpdate){
			
			function finish(){
				var data = docInfo.data;
				//var sql = 'INSERT INTO ' + BY
			}			
		}
		
		function updateDoc(){
			
		}
		
		function insertDoc(){
			
		}
		
		function processDoc(){
			
		}
		
		function makeErr(err, seq){
			err._bulk_seq = seq;
			return err;
		}
		
		function saveAttachment(docInfo, digest, data, callback){
			//
		}
		
		function metadataFetched(tx, results){
			
		}
		
		preprocessAttachments(function(){
			//db.transaction(function(txn));
		});		
	};
	
	api._get = function(id, opts, callback){
		var doc;
		var metadata;
		var error;
		
	}
	
	function makeRevs(arr){
		
	}
	
	api._allDocs = function(opts, callback){
		
	}
	
	api._changes = function idb_changes(opts){
		
	}
	
	api._close = function(callback){
		
	}
	
	api._getAttachment = function(attachment, opts, callback){
		
	}
	
	api._getRevisionTree = function(docId, callback){
		
	}
	
	api._doCompaction = function(){
		
	}
}

var MapReduce = function(db){
	
	function viewQuery(fun, options){
		
		var builtInReduce = {
				"_sum": function(keys, values){
					return sum(values);
				},
				"_count": function(keys, values, rereduce){
					if(rereduce){
						return sum(values);
					} else {
						return values.length;
					}
				}
		}
		var emit = function(key, val){
			var viewRow = {
					id: current.doc._id,
					key: key,
					value: val
			}
		}
		var  checkComplete=function(){
			if (completed && results.length == num_started){
				results.sort(function(a,b){
					
				});			
				
			}
		}
		
	}
	
	function httpQuery(fun, opts, callback){
		
		var params = [];
		
		
		
		
		
		
		
		
		
		
	}
	
}


