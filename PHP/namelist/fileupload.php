<?php
if(isset($_POST["title"]))
{
			include_once("config.php");
    		$target_path = conf::$target_path;
			if($_REQUEST["title"]>""){
		        $extrafilename	="";
			    $basefilename=basename( $_FILES['uploadedfile']['name']);
				if(strpos($basefilename,'.'))
				{
					$arr=split("[.]",$basefilename); //子目錄有多層, 使用陣列
					$extrafilename=$arr[1];
				}
				$target_path = $target_path .$_REQUEST["title"].".".$extrafilename ;
			}else{
				$target_path = $target_path . basename( $_FILES['uploadedfile']['name']); 
			}
			echo $target_path;
			if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path)) {
    			echo "The file ".  basename( $_FILES['uploadedfile']['name']). 
    			" has been uploaded";
			} else{
    			echo "There was an error uploading the file, please try again!";
			}
	exit;
}
include_once("config.php");
$key=conf::$key;

if(isset($_POST["user"])&&isset($_POST["pwd"])&&$_POST["user"]==$key&&$_POST["pwd"]==$key)
{
print <<<END
<table>
<tr><td>
<table>
<form action="fileupload.php" enctype="multipart/form-data" method="POST" onSubmit="return AIM.submit(this, {'onStart' : startCallback, 'onComplete' : completeCallback})">
<tr><td><label>Title:</label><td> <input type="text" name="title" >
<tr><td><label>UpLoad File:</label><td> <input type="file" name="uploadedfile" >
<tr><td><td><input type="submit" value="Upload file" />
</form>
</table>
<td><div># of submited forms: <span id="nr">0</span>__Last submit response : <pre id="r"></pre></div>
END;
}
?>
