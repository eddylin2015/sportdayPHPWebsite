<?php
header('Content-Type:text/html;charset=Big5');
$subpath= $_GET['subpath'];  //指定子路徑
date_default_timezone_set("Asia/Taipei");

include_once("config.php");
$homepath= conf::$homepath;   //日誌文件儲存在home 路徑在C:\mbcintweb\std_dailog

echo "<h4>File LIST  Update Time:". date('Y-m-d H:i:s') ."</h4>";

$d = dir($homepath."\\".$subpath); //d 表示當前目錄下一層item 項目list列表

echo "<!Path: ".$d->path.">\n";

//返回上一層目錄
$parentDir="";
$arr=split("[/\]",$subpath); //子目錄有多層, 使用陣列
if(count($arr)>0)
{
	for($i=0; $i<count($arr)-1;$i++)
	{
		$parentDir=$parentDir."".$arr[$i];
	}
	echo "<img src=ico\\back.gif><a  href=filelist.php?subpath=".$parentDir.">返回上一層</a><br>\n";
}
//列出目錄下一層所有項目
echo "<ul>\n";

$files=array();
$dirs=array();
while($entry=$d->read()) 
{
	if($entry=="."||$entry==".."){continue;}  //. 當前目錄或 ..上一層目錄 不處理
	
    if(strpos($entry,'.'))  //以項目中有"." 為記號分別文件或子目錄
	{
		//顯示文件名
		//home目錄下文件
		$filename =$homepath."/" .($entry);		   
		if (file_exists($filename)) {
		            $filedatetime=date ("YmdHis", filemtime($filename)).(rand(1, 99)+100) ;
					$elem=array($filedatetime => array($filename,$entry,date ("Ymd-H:i:s", filemtime($filename))));
					$files=array_merge($files,$elem);
		}
	}
	else
	{
		//顯示目錄名
		$temp="";
		if($subpath=="")
		{
		$temp=$subpath.$entry;
		}else{
		$temp=$subpath."/".$entry;
		}
	   $filename =$homepath."/" .$temp;
	   if (is_dir($filename)) {
	            $filedatetime=date("YmdHis", filemtime($filename));
				$elem=array($filedatetime => array($temp,$entry,date("Ymd-H:i:s", filemtime($filename))));
				$dirs=array_merge($dirs,$elem);
	   }
	}
}
$d->close();//關閉目錄資源
echo "<table width=100%>";
krsort($files);
foreach($files as $elem)
{
	echo "<tr><td><img src=ico\\doc.gif><a target=_blank href=$elem[0]>$elem[1]</a><td>last modified: $elem[2]";
}
krsort($dirs);
foreach($dirs as $elem)
{
    echo "<tr><td><img src=ico\\dir.gif><a  href=filelist.php?subpath=$elem[0]>$elem[1]</a><td>last modified: $elem[2]\n";
}
echo "</table>";
echo "</ul>\n";
?>

<p align=right><font size=1>&copy;mbc  Sept 2007-jan 2009</font></p>
<!code by cool 2007-10-08>
<!modify by cool 2007-10-08 :return parent direction>
<!modify by cool 2007-11-07 :解決中文名問題, urlencode 將中文名加以編號>
<!modify by cool 2007-11-07 :增加註解>
<!modify by cool 2007-01-22 :解決中文名問題, urlencode 將中文名加以編號>