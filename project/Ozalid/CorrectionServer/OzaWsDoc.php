<?php

class OzaWsDocs{
	public $docs; // a list of OzaWsDoc
}

class OzaWsDoc{
	public $id;
	public $altoId;
	public $desc; // reference to OzaWsDocDesc
	public $pageIds; // a list of pageIds
	public $pagesCount;
	public $state; // editable
	public $creationDate;
	public $newGenDate;
	public $coverPageId;
	public $whiteOcrMode;
	public $titlePage;
}

class OzaWsDocDesc{
	public $title;
	public $author;
	public $genre;
	public $publisher;
	public $date;
}

class OzaWsDocStats{
	public $refDocId;
	public $pages; // a list of OzaDocStatsPage
	public $size;
}

class OzaWsDocStatsPage{
	public $id;
	public $size;
	public $corrs; // option
	public $authors;// option
}

class OzaWsDocSum{
	public $id;
	public $altoId;
	public $state;
	public $pages; // a list of OzaDocStatsPage
	public $desc;
}

class OzaWsDocUserStats{
	public $refDocId;
	public $corrections;
}

class OzaWsDocUserCorrStats{
	public $idPage;
	public $size;
	public $v;
}

class OzaWsDocStyle{
	public $id; // id is refered by block or page
	public $ff; // font family
	public $fsi; // font size
	public $fst; // font style
}