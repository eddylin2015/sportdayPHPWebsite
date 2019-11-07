<?
function authenticate() {
    header('WWW-Authenticate: Basic realm="Cool Authentication System"');
    header('HTTP/1.0 401 Unauthorized');
    echo "You must enter a valid login ID and password to access this resource\n";
    exit;
}
function loginSuc(){
	echo "<table><tr><td><a href='/sortableTable/'><button>home</button></a></td>";
	echo "<td>Welcome: " . htmlspecialchars($_SERVER['PHP_AUTH_USER']) ;
	echo  "</td><td>";
   // echo "Old: " . htmlspecialchars($_REQUEST['OldAuth']);
    echo "<form action='' method='post'>\n";
    echo "<input type='hidden' name='SeenBefore' value='1' />\n";
    echo "<input type='hidden' name='OldAuth' value=\"" . htmlspecialchars($_SERVER['PHP_AUTH_USER']) . "\" />\n";
    echo "<input type='submit' value='Re Authenticate' />\n";
    echo "</form></td></tr></table>\n";
}
if (!isset($_SERVER['PHP_AUTH_USER']) ||
    ($_POST['SeenBefore'] == 1 && $_POST['OldAuth'] == $_SERVER['PHP_AUTH_USER'])) {
    authenticate();
    } 
else if( $_SERVER['PHP_AUTH_USER'] == 'teacher1' &&  $_SERVER['PHP_AUTH_PW'] == 'xxxxxx') 
{
	loginSuc();
}else if( $_SERVER['PHP_AUTH_USER'] == 'student1' &&  $_SERVER['PHP_AUTH_PW'] == 'xxxxx') 
{
	loginSuc();
}else if( $_SERVER['PHP_AUTH_USER'] == 'student2' &&  $_SERVER['PHP_AUTH_PW'] == 'xxxxx') 
{
	loginSuc();
}else if( $_SERVER['PHP_AUTH_USER'] == 'student3' &&  $_SERVER['PHP_AUTH_PW'] == 'xxxxx') 
{
	loginSuc();
}else if( $_SERVER['PHP_AUTH_USER'] == 'student4' &&  $_SERVER['PHP_AUTH_PW'] == 'xxxxx') 
{
	loginSuc();
}
else
{
authenticate();
}

?>
