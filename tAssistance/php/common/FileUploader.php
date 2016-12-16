<?php

namespace TAssistance\common;

class FileUploader {
	
	public $file_dir = "/var/www/tconnect/tAssistance/img/";
	public $uploadOk = 1;
	
	public function __construct($fileToUpload){
		echo $fileToUpload["name"];
		$this->fileToUpload = $fileToUpload;
		$this->target_file = $this->file_dir.basename($fileToUpload["name"]);
		
		
		
		echo $fileToUpload["name"];
	}
	
	public function check(){
		
		$fileToUpload = $this->fileToUpload;
		
		if (file_exists($this->target_file)) {
			echo "Sorry, file already exists.";
			$this->exist = true;
		}
		else{
			$this->exist = false;
		}
		
		$check =  getimagesize($fileToUpload["tmp_name"]);
		if($check !== false) {
			echo "File is an image - " . $check["mime"] . ".";
			$this->isImage = true;
		} else {
			echo "File is not an image.";
			
		}
		
		if($fileToUpload["size"] > 500000) {
			echo "Sorry, your file is too large.";
			$this->isTooLarge = true;
		}
		else{
			$this->isTooLarge = false;
		}
		
		$imageFileType = pathinfo($this->target_file,PATHINFO_EXTENSION);
		
		if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
		&& $imageFileType != "gif" ) {
			echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
			$this->imageFileTypeOk = false;
		} else {
			$this->imageFileTypeOk = true;
		}
	}
	
	public function valid(){
		$this->check();
		if(!$this->exist && $this->isImage && $this->isTooLarge && $this->imageFileTypeOk)
			return true;
		return false;
	}
	
	public function saveFile(){
		if ($this->valid()) {
			echo "Sorry, your file was not uploaded.";
			
		} else{
			$fileToUpload = $this->fileToUpload;
			if (move_uploaded_file($fileToUpload["tmp_name"], $this->target_file)) {
				echo "The file ". basename($fileToUpload["name"]). " has been uploaded.";
				return true;
			} else {
				echo "Sorry, there was an error uploading your file.";
			}
			
		}
		return false;
	}
} 
