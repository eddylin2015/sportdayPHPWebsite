<?
function LogSQLErr($sql,$errmsg)
{
	$handle=fopen("ESDBLogErr.txt","a");
	fwrite($handle,$sql);
	fwrite($handle,"\n");
	fwrite($handle,$errmsg);
	fwrite($handle,"\n");
	fclose($handle);
}
function json_decode_nice($json, $assoc = FALSE){ 
   $json=str_replace('\\', '',$json);
   //$json=str_replace('"', '',$json);
   $json = str_replace(array("\n","\r"),"",$json); 
   $json = preg_replace('/([{,]+)(\s*)([^"]+?)\s*:/','$1"$3":',$json);
   $json = preg_replace('/(,)\s*}$/','}',$json);
   return json_decode($json,$assoc); 
}
function v_replace($source)
{
	$a = array( "\\", '"',"," );
	$b   = array('', "'", "'" );
        $res= str_replace($a, $b, $source);
		 return $res;
}
$json=$_REQUEST['datajson'];
$keycode=$_REQUEST['keycode'];
$regstafreg=$_REQUEST['regstafref'];
$fiid=$_REQUEST['siid'];
if($keycode!='111233234577553311') {echo 'ERROR!ERROR! no right!';exit;}
$errortxt="";
LogSQLErr(print_r($json, true),$regstafreg);
include_once('inc/config.php');
$con=mysql_connect(cfg::$dbhost,cfg::$dbuser,cfg::$dbpwd);
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
$db_selected = mysql_select_db(cfg::$db,$con);
mysql_query("SET NAMES UTF8");
$result = mysql_query("select lock_item from field_item where fi_id=".$fiid,$con);
$flag=true;
while($row = mysql_fetch_row($result))
{
	if($row[0]==1){ $flag=false; echo "Locked1";}
}
//ESDB::OpenConnUTF8(); 
if(flag)
foreach($json as $key => $value) {
	list( $f, $id) = split ('_', $key); 

	$sql="update field_rc set $f=\"".v_replace($value)."\" where frc_id='$id' ";//and staf_ref='$regstafref';";	
	if($f=='HJ'){$sql="update field_item set $id=\"".v_replace($value)."\" where fi_id='$fiid' ";echo $sql;}
	mysql_query($sql,$con);
	if(mysql_affected_rows($con)==1)
	echo "($key) 1 µ§\n";
          // print "$key => $value\n".$sql;
}
mysql_close($con);
//ESDB::CloseConn();
?>



