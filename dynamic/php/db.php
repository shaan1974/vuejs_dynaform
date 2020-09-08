<?php
	/* Mode */

	$is_local="false";
	if ( $_SERVER['SERVER_NAME']=="localhost" )
	{
		$is_local="true";
	}

/* Database config */

	if ( $is_local=="true" )
	{
		$db_host		= 'localhost';
		$db_host		= '127.0.0.1';
		$db_user		= 'root';
		$db_pass		= '';
		$db_database	= 'rest'; 
	}

	else
	{
		$db_host		= 'xxx.mysql';
		$db_user		= 'xxx';
		$db_pass		= 'CRYPTED';
		$db_database	= 'xxx'; 		
	}	

/* End config */

	$link = mysqli_connect($db_host,$db_user,$db_pass,$db_database) or die('Unable to establish a DB connection');
	mysqli_query($link,"SET names UTF8");
?>