<?php

		/*
			LOCAL MODE
		*/
			$local_mode="false";				
			$is_local="false";

			if ( $_SERVER['SERVER_NAME']=="localhost" )
			{
				$is_local="true";
				$local_mode="true";
			}
		/*
			BASE REFERRER
		*/		
			if ( $is_local=="true" )
			{
				$config_base_referrer="http://localhost/vuejs_dynaform/";
			}
			else
			{
				$config_base_referrer="https://www.retroplayers.be/";
			}		

			$config_share_url="http://www.retroplayers.be/";
		/*
			VARIOUS
		*/
			if ( $is_local=="true" )
			{
				$config_root_path=$_SERVER['DOCUMENT_ROOT']."/vuejs_dynaform/";
			}
			else
			{
				$config_root_path=$_SERVER['DOCUMENT_ROOT']."/";
			}
?>