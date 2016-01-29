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
		}
table {
    border-collapse: collapse;
}

table, td, th {
    border: 1px solid black;
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
<script>
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
	PostUrl='race_post.php';
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
			$.post("race_lock.php",
				{siid:<? echo  $_REQUEST["id"];?>,keycode:'111233234577553311',regstafref:'<? echo $user;?>'})
				.done(function(data){
				alert("lock:"+data);
			});	
	
	});
	$('#tab_r').click(function(event){ tab_dire=0;});
	$('#tab_d').click(function(event){ tab_dire=1;});

});
</script>
</head>
<body>
<?
$user=$_SERVER['PHP_AUTH_USER'];
if($_REQUEST['lock'] != 1){
echo "<table><tr><td><button id=edit_tbl>Edit</button><td><button id=tab_r>&gt;</button><td><button id=tab_d>v</button><td><button id=save_tbl>SAVE</button>";
$user=$_SERVER['PHP_AUTH_USER'];
if(substr($user,0,1)=='t'){ echo "<td><button id=lock_tbl>LOCK</button></td>";}
echo "</table>";
}
?>

<?php
$id=$_REQUEST["id"];
$con=mysql_connect(cfg::$dbhost,cfg::$dbuser,cfg::$dbpwd);
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
$db_selected = mysql_select_db(cfg::$db,$con);
mysql_query("SET NAMES UTF8");
$rcx="RCX";

$sql = "SELECT title,rcx,s_item FROM sport_item where si_id=$id;";
$result = mysql_query($sql,$con);
while($row = mysql_fetch_row($result))
{
echo iconv( "UTF-8","BIG5-HKSCS",$row[2] );	
echo "<table id='EDUTBL'>";	
echo "<thead><tr>";$a = explode(",", 	$row[0]);
for($i=0;$i<count($a);$i++)
{echo "<th class='c".($i+1)."' width=50px>";
echo iconv( "UTF-8","BIG5-HKSCS",$a[$i] );
echo "</th>";
$rcx=$row[1];
}
echo "</tr></thead>";
}
$f="*";
if($rcx=="RC5") {$f="rank,s_number ,number ,name  ,classno  ,rc  ,note  ";}
else if($rcx=="RC0") {$f="rank,s_number,number,classno,name,rc,note";}
else if($rcx=="RC1") {$f="rank,group_id,road,number,classno,name,rc,grk,note";}
else if($rcx=="RC2") {$f="rank,road,number,classno,name,rc,note";}
else if($rcx=="RC3") {$f="rank,group_id,road,name,number,rc,classno,grk,note";}
else if($rcx=="RC4") {$f="rank,road,name,number,rc,classno,note";}
else if($rcx=="RC6") {$f="rank,group_id,road,number,name,classno,rc,note";}
else if($rcx=="RC7") {$f="rank,group_id,s_number,number,name,classno,rc,grk,note";}
$f_split=split(',',"rc_id,".$f);
$sql = "SELECT rc_id,$f FROM sport_rc where si_id=$id order by length(group_id), group_id,road,BIT_LENGTH( s_number),s_number;";
$result = mysql_query($sql,$con);
echo "<tbody>";
while($row = mysql_fetch_row($result))
{
 $id=$row[0];
  echo "<tr>";
for($i=1;$i<count($row);$i++)
{
	if(trim($f_split[$i])=='rank'){  echo "<td class=M imemode=number  height=30px width=20px id=rank_$id>";}
	else if	(trim($f_split[$i])=='grk'){  echo "<td class=M height=30px width=30px id=grk_$id>";}
	else if	(trim($f_split[$i])=='rc'){  echo "<td class=M align=right imemode=tel height=30px width=100px id=rc_$id>";}
	else if	(trim($f_split[$i])=='note'){  echo "<td class=M  height=30px width=30px id=note_$id>";}
	else {echo "<td>";}
  echo iconv( "UTF-8","BIG5-HKSCS",$row[$i] );
  echo "</td>";
}
echo "</tr>";
  
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
//var t = new SortableTable(document.getElementById('EDUTBL'), 100);
</script>
 
</body>
</html>
