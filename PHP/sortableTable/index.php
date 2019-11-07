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
	<script type="text/javascript" >
		function f(i,j)
		{
			window.location.href=("sport.php?id="+i+"&lock="+j);
		}
		function f0(i,fj,fl)
		{
	if(fj==1){
		window.location.href=("field.php?id="+i+"&fj="+fj+"&lock="+fl);}
	if(fj==0){window.location.href=("fieldhj.php?id="+i+"&fj="+fj+"&lock="+fl);}
		}
	</script> 
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
		table tfoot tr i
			background: #c0c0c0;
		}
 
		table tbody tr {
			background: #f0f0f0;
		}
 
		td, th {
			border: 1px solid white;
		}
	</style>
</head>
 
<body>
<br/>
<?php
$con=mysql_connect(cfg::$dbhost,cfg::$dbuser,cfg::$dbpwd);
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
$db_selected = mysql_select_db(cfg::$db,$con);
mysql_query("SET NAMES UTF8");

$sql = "SELECT si_id,s_item,lock_item,lock_time,ds_n FROM sport_item ;";
$result = mysql_query($sql,$con);
echo "<table id='myTable'>";	
echo "<thead><tr><th class=c1>id<th class=c1>s_item<th class=c1>lock<th class=c1>link<td>lock time</tr></thead>";
echo "<tbody>";


while($row = mysql_fetch_row($result))
{
	echo "<tr>";
	echo "<td>r";
	if($row[0]<10) echo "0";
	echo $row[0];
	echo "<td>";
	echo iconv( "UTF-8","BIG5-HKSCS",$row[1] );	
	echo "<td>".$row[2];
	echo "<td><input type=button onclick=\"f(".$row[0].",'".$row[2]."')\">";
	echo "<td>".$row[3];
	echo "<td>".$row[4];
echo "</tr>";
}

$sql = "SELECT fi_id,f_item,lock_item,rcx,lock_time,ds_n FROM field_item ;";
$result = mysql_query($sql,$con);

while($row = mysql_fetch_row($result))
{
	echo "<tr>";
	echo "<td>f";
	if($row[0]<10) echo "0";
	echo $row[0];
	echo "<td>";
	echo iconv( "UTF-8","BIG5-HKSCS",$row[1] );	
	echo "<td>".$row[2];
	$rcxflg=1;
	if($row[3]=='RCFJH'){$rcxflg=0;}
		echo "<td><input type=button onclick=\"f0(".$row[0].",$rcxflg,'".$row[2]."')\">";
	echo "<td>".$row[4];
	echo "<td>".$row[5];
echo "</tr>";
}




echo "</tbody></table>";




mysql_close($con);

?>
<script type="text/javascript">
<?
echo "var t = new SortableTable(document.getElementById('myTable'), 100);";
?>
</script>
<pre>
<?
// print_r($_SERVER);
 ?>
</body>
</html>
