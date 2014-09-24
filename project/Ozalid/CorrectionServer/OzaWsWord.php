<?php

class OzaWsWordCorrection{
	public $rfw;
	public $pb;  // yes or no, the system consider the word as incorrect
	public $usw; // The corresponding user word ID, if any (if a correction was always done on it)
	public $cs;  // The list of the character corrections of the word (CharCorrection). To submit a word content correction, a CharCorrection must be submitted for each word character.
	public $sid; // The new page style ID for the word
	public $pb;
	public $sg;
	public $pg;
	public $hg;
	public $lx;
	public $bs; // The IDs of the blocks containing the second part of the ceasured word.
	public $cea; // Whether this word contains a caesura
	
	// rect for word
	public $x;   
	public $y;
	public $w;
	public $h;	
}

class OzaWsCharCorrection{
	public $c; // The character code
	public $ccf; // The character confidence, between 0 and 10
	public $cl;
	public $rfC; // The corresponding reference word ID, if any
	public $pg; // ?????
	public $ts; // The character types
	public $cea; // If the character is a caesura, provides data on this caesura : the IDs of the blocks containing the second part of the word, and the position and size of this part of the word. The type of this attribute is : CaesuraData
	
	// rect for char
	public $x;
	public $y;
	public $w;
	public $h;
}
