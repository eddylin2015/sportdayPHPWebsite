<?
include_once('inc/config.php');
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
$siid=$_REQUEST['siid'];
$keycode=$_REQUEST['keycode'];
$regstafreg=$_REQUEST['regstafref'];
if($keycode!='111233234577553311') {echo 'ERROR!ERROR! no right!';exit;}
$errortxt="";
LogSQLErr("lock".$siid,$regstafreg);
$con=mysql_connect(cfg::$dbhost,cfg::$dbuser,cfg::$dbpwd);
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
$db_selected = mysql_select_db(cfg::$db,$con);
mysql_query("SET NAMES UTF8");
mysql_query("update sport_item set lock_item=1  where si_id=".$siid,$con);
if(mysql_affected_rows($con)==1)
	echo "lock 1 µ§($siid)\n";
mysql_close($con);
//ESDB::CloseConn();
?>



