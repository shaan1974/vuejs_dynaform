<?php

	//	INCLUDES
	//
		//	FCT
		include("fcts.php");
		//	CONFIG
		include("config/rest.php");
		//	DATABASE
		include("../php/config.php");					
		include("../php/db.php");					

	//	OUTPUT
	//	
		header("Content-Type: application/json");

	/*
		dynamic/rest/rest.php?sort=age|desc,name|asc&per_page=5&page=1
		dynamic/rest/rest.php?sort=name|asc,age|desc&per_page=5&page=1&filter=name|Ad%C3%A9ll,age|33
		dynamic/rest/rest.php?page=1&per_page=5&filter=FCOL1|elli,FCOL2|n
		dynamic/rest/rest.php?page=1&per_page=5&filter=FCOL1|a,FCOL3|NEQ|4
		dynamic/rest/rest.php?page=1&per_page=5&filter=FCOL1|L|a,FCOL5|EQ|view
		dynamic/rest/rest.php?page=1&per_page=5&filter=FCOL1|L|a,FCOL5|EQ|view
		dynamic/rest/rest.php?page=1&per_page=5&filter=FCOL4|BW|1970-01-01%5E1980-01-01
	*/

	//	BASE VARIABLES
	//
		$per_page = $_GET["per_page"];

		if ( isset( $_GET["page"] ) )
		{
			$current_page = $_GET["page"];
		}
		else
		{
			$current_page = 1;
		}
		
	//	QUERIES
	//
		$query_A = file_get_contents("".$sqlFile."");

	//	GRAND TOTAL QUERY
	//
		//	COUNT
		//
		$queryA 	= $query_A;

		//	PARM - FILTERS ( IN THIS CASE NO FILTERS )
		//
			$queryA = get_filters($queryA,"");
		
		//	GET
		//
			$resultA 	= mysqli_query($link,$queryA);
			$grandTotal	= mysqli_num_rows($resultA);
							
	//	COUNT QUERY
	//
		//	COUNT
		//
			$queryA 	= $query_A;

		//	PARM - FILTERS
		//
			$f="";
			if ( isset( $_GET["filter"] ) )
			{
				$f = $_GET["filter"];
			}
			$queryA = get_filters($queryA,$f);

		//	REPLACE FAKE COLUMNS
			$queryA = str_replace($fakeColumnsNames, $replaceColumnsNames, $queryA);

			/*print($queryA);
			die();*/
			
		//	GET
		//
			$resultA 	= mysqli_query($link,$queryA);
			$total 		= mysqli_num_rows($resultA);
			$last_page 	= ceil( $total / $per_page );

	//	MAIN QUERY
	//
		$queryA = $query_A;

		//	PARM - ORDER
		//
			$order = "";
			if ( isset( $_GET["sort"] ) )
			{
				$order = " ORDER BY " . str_replace("|" , " " , $_GET["sort"] );	
			}			
			$queryA = $queryA." ".$order." ";
		
		//	PARM - LIMIT
		//
			$limit 		= "LIMIT ".( ($current_page-1)*$per_page )." , $per_page";
			$queryA 	= $queryA." ".$limit." ";

		//	PARM - FILTERS
		//
			$queryA = get_filters($queryA,$f);

		//	REPLACE FAKE COLUMNS
			$queryA = str_replace($fakeColumnsNames, $replaceColumnsNames, $queryA);

		//	GET DATA
		//			
			$resultA 	= mysqli_query($link,$queryA);
			$json 		= array();

		//	LOOP
		//			
			while( $rowA = mysqli_fetch_assoc($resultA) )
			{
				//	MAIN OBJECT
				//
					$json[] = $rowA;
			}

		// MAIN OBJECT
		//
			$m = array();

				$m["total"] 		= $total;			
				$m["grand_total"]	= $grandTotal;
				$m["per_page"] 		= intVal($per_page);
				$m["current_page"] 	= intVal($current_page);
				$m["last_page"] 	= $last_page;
				$m["data"] 			= $json;

		// OUTPUT
		//
			print( json_encode( $m ) );
			die();
?>