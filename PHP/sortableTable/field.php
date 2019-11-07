<?
include_once('inc/coolauth.php');
include_once('inc/config.php');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<title>Scrollable HTML table</title>
	<meta http-equiv="Content-type" content="text/html; charset=big5" />
	<script type="text/javascript" src="webtoolkit.sortabletable.js"></script>
<script src="js/jquery-1.10.2.min.js"></script>
<link type="text/css" href="js/grid.css" rel="stylesheet">
<script src="js/grid.js"></script>
 
	<style>
		table {
			text-align: left;
			font-size: 12px;
			font-family: verdana;
			background: #c0c0c0;
		}
 
		table thead  {
			cursor: pointer;
		}
 
		table thead tr,
		table tfoot tr {
			background: #c0c0c0;
		}
 
		table tbody tr {
			background: #f0f0f0;
		}
 
		td, th {
			border: 1px solid white;
margin:0px;
		}
textarea
{
display:block;
margin-top:0px;
margin-left:0px;
margin-right:0px;
margin-bottom:0px;
background-color:#EFFBFB
}

	</style>
</head>
 
<body>
<script>
imemodeforsport='field';
function myTrim(x)
{
	return x.replace(/^\s+|\s+$/gm,'');
}
$(document).ready(function(){
	$('#edit_tbl').click(function(event){
		var input_first=null;
		$('.M').each(function(i){
			inputtxt=editCell($(this));
			if(input_first==null) input_first=inputtxt;		
		});
	});
	GenOriginalData();
	PostUrl='field_post.php';
	$('#save_tbl').click(function(event){
		closeedit();
		var json={};
		var json_count=0;
		var result_set="";
		var error_msg="";
		$('.M').each(function(i){
			if(OriginalData[$(this).attr('id')]!=$(this).text()){
				json_count++;
				decode=$(this).text();
				//decode
				$(this).text(decode);
				json[$(this).attr('id')]=myTrim($(this).text());
			}
		});
	//	PostUrl=null;
		if(json_count>0 && PostUrl != null)
		{
			$.post(PostUrl,
				{datajson:json,
				siid:<? echo $_REQUEST["id"]; ?>,
				keycode:'111233234577553311',regstafref:'<? echo $user;?>'})
				.done(function(data){
				alert("update data:"+data+error_msg);
				for(var key in json){
					OriginalData[key]=-1;
				}
			});	
		}else{alert("POST:\n"+JSON.stringify(json));}	
	});
	$('#lock_tbl').click(function(event){
			$.post("field_lock.php",
				{siid:<? echo  $_REQUEST["id"];?>,keycode:'111233234577553311',regstafref:'<? echo $user;?>'})
				.done(function(data){
				alert("lock:"+data);
			});	
	
	});
	$('#tab_r').click(function(event){ tab_dire=0;});
	$('#tab_d').click(function(event){ tab_dire=1;});

});
</script>
<?
if($_REQUEST['lock'] != 1){
echo "<table><tr><td><button id=edit_tbl>Edit</button><td><button id=tab_r>&gt;</button><td><button id=tab_d>v</button><td><button id=save_tbl>SAVE</button>";
$user=$_SERVER['PHP_AUTH_USER'];
if(substr($user,0,1)=='t'){ echo "<td><button id=lock_tbl>LOCK</button></td>";}
echo "</table>";
}
?>

<?php
$id=$_REQUEST["id"];
$rcx=$_REQUEST["fj"];

$col_span = null;
$c_fieldnames = null;
$fieldnames=null;
$f_split=null;
if ($rcx == 0)
{
   $fieldnames = "frc_id,rcx,rank,s_number,number,classno,name,h1,h2,h3,h4,h5,h6,h7,h8,h9,h10,h11,h12,h13,h14,h15,h16,rc,note";
   $c_fieldnames = "名次,次序,比賽號,姓名,班級,"
	   ."h1,h2,h3,h4,h5,h6,h7,h8,h9,h10,h11,h12,h13,h14,h15,h16,"
	   ."成績,備註";
   $f_split=split(',', $fieldnames);
}
else if ($rcx == 1)
{

	$fieldnames = "frc_id,rcx,rank,s_number,number,classno,name,h1,h2,h3,b3,h4,h5,b5,h6,rc,note";
	$f_split=split(',', $fieldnames);
     	$c_fieldnames = "名<br>次,次<br>序,比賽<br>號,姓名,班級,一,二,三,B3,四,五,B5,六,成績,備註";
}


$con=mysql_connect(cfg::$dbhost,cfg::$dbuser,cfg::$dbpwd);
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
$db_selected = mysql_select_db(cfg::$db,$con);
mysql_query("SET NAMES UTF8");


$sql = "SELECT f_item FROM field_item where fi_id=$id;";
$result = mysql_query($sql,$con);
while($row = mysql_fetch_row($result))
{
	echo iconv( "UTF-8","BIG5-HKSCS",$row[0] );
}	
echo "<table id='EDUTBL'>";	
echo "<thead><tr>";$a = explode(",", 	$c_fieldnames);
for($i=0;$i<count($a);$i++)
{echo "<th class='c".($i+1)."'>";echo $a[$i];
//echo iconv( "UTF-8","BIG5-HKSCS",$a[$i] );
echo "</th>";
}
echo "</tr></thead>\n";

$f=$fieldnames;

$sql = "SELECT $f FROM field_rc where fi_id=$id order by BIT_LENGTH( s_number),s_number;";
$result = mysql_query($sql,$con);
echo "<tbody>";
while($row = mysql_fetch_row($result))
{
  $frcid=$row[0];
  echo "<tr><td height=30px imemode=number width=30px class=M id=rank_$frcid>".$row[2]."</td>";
  for($i=3;$i<7;$i++)
  {
   echo "<td>".  iconv( "UTF-8","BIG5-HKSCS",$row[$i] ). "</td>";
  }
  for($i=7;$i<count($row);$i++)
  {
	  if(substr(trim($f_split[$i]),0,1)=='h'){

		   echo "<td height=30px  width=50px align=right  imemode=tel class=M id=".$f_split[$i]."_$frcid>".$row[$i]."</td>";
	  }
	  else if(trim($f_split[$i])=='b3'||trim($f_split[$i])=='b5'||trim($f_split[$i])=='rc'){
		   echo "<td height=30px  width=50px align=right  imemode=tel class=M id=".$f_split[$i]."_$frcid>".$row[$i]."</td>";
	  }
	  else{
		  echo "<td height=30px width=40px  class=M id=".$f_split[$i]."_$frcid>".$row[$i]."</td>";
	  }
  }
  echo "</tr>\n";
  }
  echo "</tbody>";
echo "</table>";

mysql_close($con);

?>
<script type="text/javascript">
<?
if(substr($user,0,1)=='t'){
	echo "var t = new SortableTable(document.getElementById('EDUTBL'), 100);";
}
?>

</script>
 
</body>
</html>
