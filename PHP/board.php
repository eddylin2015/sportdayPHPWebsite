<html>
<head>
<script type="text/javascript">
        function WriteInfo() {
			window.location.href=window.location.href;
        }
    </script>
</head>
<body bgcolor="#C7FF91">
<table border=1><tr><td>
<marquee id="scroller" scrollamount="1" direction="up" width=800 height="600" Loop="1" onFinish="WriteInfo();">

<?php
date_default_timezone_set("Asia/Taipei");
$d=dir("C:\\AppServ\\www\\boardfile");
$homepath="boardfile";
echo "start<br>"."\n";
$cnt=0;
$files=array();
while($entry=$d->read())
{
	$filename=$homepath."/".($entry);
	if(file_exists($filename) ){
	if($entry=="." || $entry==".."){
	}else{
	
	$dt1=new Datetime("now");
	$dt2=new DateTime(date("Y-m-d H:i:s",filemtime($filename)));
    $dt1Y=$dt1->format('Y-m-d');
	$dt1H=$dt1->format('H')+0;
	$dt2Y=$dt2->format('Y-m-d');
	$dt2H=$dt2->format('H')+0;
	
	//if($dt1Y==$dt2Y && abs($dt1H - $dt2H)<3 )  //3hours
	
  	if($dt1Y==$dt2Y && ($dt1H - $dt2H)<3 )
	{
		echo $entry;
		$filedatetime=filemtime($filename).":".$cnt++;
		$elem=array($filedatetime=>$filename);
		$files=array_merge($files,$elem);
	

	}
	}
}
krsort($files);
foreach($files as $filename)
{
	  	$rHandle = fopen($filename, 'r');

        $sData = '';
        while(!feof($rHandle))
            $sData .= fread($rHandle, filesize($filename));
        fclose($rHandle);
		echo $sData;
}
}

echo "end<br>"."\n";
?>



</marquee>
</td>




</table> 

</body>
</html>