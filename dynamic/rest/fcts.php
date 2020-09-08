<?php

function get_filters($q,$d)
{
    global $fakeColumnsNames,$columnsTypes;

    if ( $d !== "" )
    {
        $filters = explode(",",$d);
        for($cnt=0;$cnt<count($filters);$cnt++)
        {
            $sb = explode("|", $filters[$cnt] );					

            if ( count($sb)===2 )
            {
                $filters[$cnt] = " ".$sb[0] . " like '%".urldecode($sb[1])."%'";
            }
            else
            {
                if (  $sb[1] !== "L")
                {
                    if ( $sb[1]==="EQ")     { $op="="; }
                    if ( $sb[1]==="NEQ")     { $op="!="; }
                    if ( $sb[1]==="GT")     { $op=">"; }
                    if ( $sb[1]==="GTE")    { $op=">="; }
                    if ( $sb[1]==="LT")     { $op="<"; }
                    if ( $sb[1]==="LTE")    { $op="<="; }

                    $key = array_search($sb[0], $fakeColumnsNames);
                    
                    $sq="";
                    if ( $columnsTypes[$key] === "DATE" ||  $columnsTypes[$key] === "STRING")
                    {
                        $sq="'";
                    }

                    if ( $sb[1] !== "BW" )
                    {
                        $filters[$cnt] = " ".$sb[0] . " ".$op." ".$sq."".urldecode($sb[2])."".$sq." ";
                    }
                    else
                    {
                        $d1=explode("^",urldecode($sb[2]))[0];
                        $d2=explode("^",urldecode($sb[2]))[1];
                        $filters[$cnt] = " ( ".$sb[0] . " between '".$d1."' and '".$d2."')";
                    }
                }
                else
                {
                    $filters[$cnt] = " ".$sb[0] . " like '%".urldecode($sb[2])."%'";
                }
            }
        }

        $f = implode(" and " , $filters);
        $q  = str_replace("WHERE %FILTERS%", "WHERE ".$f , $q);
    }
    else
    {
        $q  = str_replace("WHERE %FILTERS%", " ",$q);
    }	

    return $q;
}
?>