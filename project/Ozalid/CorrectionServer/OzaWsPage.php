<?php

class OzaWsPageBasic{
	public $id;
	public $refDocId;
	public $altoPageId;
	public $pageNb;
	public $vres;
	public $pageBlock;
}

class OzaWsPageBlock{
	public $id;
	public $x;
	public $y;
	public $w;
	public $h;
	public $t;
}

class OzaWsPageContent{
	public $id;				
	public $validate;        	// Whether all the non corrected page words have been validated
	public $metadata;			
	public $previousBlockId;	
	public $nextBlockId;		
}

class OzaWsPageMetadata{
	public $wcLimit;
	public $ccfLimit;
	public $fullData;
}

class OzaWsPageBasic{
	public $id;
	public $refDocId;
	public $altoPageId;
	public $pageNb;
	public $vres;
	public $pageBlock;
	public $newlyGen;
}

class OzaWsPageStructContent{
	public $id;
	public $refDocId;
	public $altoPageId;
	public $imageId;
	public $pageNb;
	public $hres;
	public $vres;
	public $pageBlock;
	public $blocks;
	public $hierarchy;// The blocks hierarchy in the page, as a tree. Contains only Ids, no other block data.
	public $newlyGen;
}

class OzaWsPageSum{
	public $id;
	public $imageId;
	public $pageNb; // option
	public $pageBlock;// refer to OzaWsPageBlock
	public $newlyGen;
}