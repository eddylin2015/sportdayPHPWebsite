<?php
header('Content-Type:text/html;charset=Big5');
$subpath= $_GET['subpath'];  //���w�l���|
date_default_timezone_set("Asia/Taipei");

include_once("config.php");
$homepath= conf::$homepath;   //��x����x�s�bhome ���|�bC:\mbcintweb\std_dailog

echo "<h4>File LIST  Update Time:". date('Y-m-d H:i:s') ."</h4>";

$d = dir($homepath."\\".$subpath); //d ��ܷ�e�ؿ��U�@�hitem ����list�C��

echo "<!Path: ".$d->path.">\n";

//��^�W�@�h�ؿ�
$parentDir="";
$arr=split("[/\]",$subpath); //�l�ؿ����h�h, �ϥΰ}�C
if(count($arr)>0)
{
	for($i=0; $i<count($arr)-1;$i++)
	{
		$parentDir=$parentDir."".$arr[$i];
	}
	echo "<img src=ico\\back.gif><a  href=filelist.php?subpath=".$parentDir.">��^�W�@�h</a><br>\n";
}
//�C�X�ؿ��U�@�h�Ҧ�����
echo "<ul>\n";

$files=array();
$dirs=array();
while($entry=$d->read()) 
{
	if($entry=="."||$entry==".."){continue;}  //. ��e�ؿ��� ..�W�@�h�ؿ� ���B�z
	
    if(strpos($entry,'.'))  //�H���ؤ���"." ���O�����O���Τl�ؿ�
	{
		//��ܤ��W
		//home�ؿ��U���
		$filename =$homepath."/" .($entry);		   
		if (file_exists($filename)) {
		            $filedatetime=date ("YmdHis", filemtime($filename)).(rand(1, 99)+100) ;
					$elem=array($filedatetime => array($filename,$entry,date ("Ymd-H:i:s", filemtime($filename))));
					$files=array_merge($files,$elem);
		}
	}
	else
	{
		//��ܥؿ��W
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
$d->close();//�����ؿ��귽
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
<!modify by cool 2007-11-07 :�ѨM����W���D, urlencode �N����W�[�H�s��>
<!modify by cool 2007-11-07 :�W�[����>
<!modify by cool 2007-01-22 :�ѨM����W���D, urlencode �N����W�[�H�s��>