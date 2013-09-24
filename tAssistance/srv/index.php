<?php
$dir = dirname(dirname(__FILE__));
require_once $dir.'/includes/global_variable.php';

function get_user($session_id){
	global $db_server,$db_user,$db_pwd,$db_name;
	
	$con = mysqli_connect($db_server,$db_user,$db_pwd,$db_name);
	// Check connection
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: ".mysqli_connect_error();
		exit;
	}

	$select_sql = "SELECT * FROM ta_session WHERE local_session = '".$session_id."'";

	if ($result = mysqli_query($con,$select_sql))
	{
		$row = mysqli_fetch_object($result);
		return $row->user;
	}
}
$session_id = session_id();
$user_id = get_user($session_id);

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Trace Assistant</title>
<link href="../css/trace.css" rel="stylesheet" >
<link href="../css/bootstrap.css" rel="stylesheet" >
<script type="text/javascript" src="../tService/js/js.php"></script>
<script type="text/javascript" src="../js/js.php"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
</head>
<body>
	User:
	 <?php echo $user_id;?>


	<div class="container">
		<ul class='nav nav-tabs'>
			<li class="active"><a href="#tab1" data-toogle="tab">Tab1</a></li>
			<li><a href="#tab2" data-toogle="tab">Tab2</a></li>
		</ul>
		<div class="tab-content">
			<div class="tab-pane active" id="tab1">
				<div id="tracePanel" style="width: 1000px; border: solid 1px black">
					<div id="chart1"></div>
					<div id="controlPanel"></div>
				</div>
				d
			</div>
			<div class="tab-pane" id="tab2">Hoang 2</div>
		</div>
	</div>



	<script type="text/javascript">

	$(window).on("hashchange", function(){
	    $('a[href="' + location.hash + '"]').tab('show');
	});

	console.log("hoang");

	/*var a = new tService.Service({});
	a.createTrace({
		ktbs_base: "http://localhost:8001/ozalid/",
		name: "t2", 
		success: function(){console.log("success is callbacked");},
		error: function(jqXHR,textStatus, errorThrown){console.log("error is callbacked.");}
		});
	*/
	/*tService.trace_read({
					
		trace_uri: "http://localhost:8001/ozalid/t2/",			
		success: function(){console.log("success is callbacked");},
		error: function(jqXHR,textStatus, errorThrown){console.log("error is callbacked.");}
		});*/
	
	tAssistant.trace_view({
		trace_uri: "http://localhost:8001/ozalid/t4/",
		success: function(){console.log("success is callbacked");},
		error: function(jqXHR,textStatus, errorThrown){console.log("error is callbacked.");}
		
	});
	
		
	

	

</script>


</body>
</html>