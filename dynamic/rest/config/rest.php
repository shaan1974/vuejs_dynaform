<?php

	//	FAKE COLUMN
	//
    $fakeColumnsNames = array(
        "FCOL1",
        "FCOL2",
        "FCOL3",
        "FCOL4",
        "FCOL5",
    );

    $replaceColumnsNames = array(
        "_users.name",
        "_users.nickname",
        "_users.age",
        "_users.birthdate",
        "_groups.name",        
    );

    $columnsTypes = array(
        "STRING",
        "STRING",
        "NUMBER",
        "DATE",
        "STRING",        
    );    

    $sqlFile = "query/rest.sql";
?>