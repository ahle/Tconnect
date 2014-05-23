<?php

require_once "/var/www/tconnect/project/Ozalid/CorrectionServer/OzaDBClient.php";

$db = new OzaDBClient();
$summary = $db->getDocumentSummary("52fa4364e4b09db6f09a3f64");
echo $summary;


