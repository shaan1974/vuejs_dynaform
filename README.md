# VueJS Dynaform

Still on developpement the purpose it to generate form on the fly.

To start the exemple correctly you have to (see below)

**Database Config :**

dynamic/php/config.php
dynamic/php/db.php

**Database Sql Schema :**

dynamic/rest/__data/rest.sql

**Form Data structure :**

Folder : app/data/full/

- app_behaviour.js ( to define behaviours )
- app_config.js ( base config and config for each component )
- app_data.js ( model )
- app_dictionnaries.js ( dictionnaries related to component like select, radio or checkbox )
- app_label_fr.js ( french labels )
- app_label_en.js ( english labels )
- app_label_nl.js ( english labels )
- app_prop_status.js ( component status )
- app_schema.js ( schema of the form )
- app_validation.js ( validation rules )

There is a second example. To configure it go into file index.html and update app/data/full with app/data/small

**Components :**

- "COF", free input with a dedicate button to do a choice in a list.
- "LABEL", simple label
- "CONTAINER", text or html container.
- "INPUT", simple input or input with icon on the left
- "DROPDOWN", classic dropdown.
- "MULTI-DROPDOWN", classic dropdown with attribute multiple.
- "INPUT-NUMBER", classic input number, or 2 buttons on the right, or one button on left and one on right.
- "PRC", precalulated field.
- "REPEATER-TABLE", repeater presented with a table.
- "TEXTAREA"
- "CHECKBOX", one checkbox.
- "CHECKBOXES".
- "RADIOS".
- "UPLOAD".
- "RANGE"
- "REPEATER-TABS", repeater presented with tabs (horizontal or vertical ).
- "STATIC-TABS", tabs with custom labels for each.
- "FIELDSET".
- "RANGE-START-END".
- "PASSWORD".
- "INPUT-FORMAT"
- "BS-DROPDOWN". Dropdown with boostrap button dropdown.
- "STATIC-TABLE".
- "SINGLE-COMPLETE".
- "MONEY". Formatted as money on blur.
- "LOCATION", using leaflet js to display/edit(add/update/remove) Markers/polygons/lines. Could be in popup or inline.
- "DATE PICKER".
- "RICH TEXT EDITOR", With SunEditor.
- "LINK-FIELD". Dropdown-Dropdown, Dropdown-Checkboxes, Dropdown-radios.
- "DATE RANGE PICKER", Start and end dates.
- "COLOR PICKER".
- "AUTONUMERIC".
- "DROP UPLOAD".
- "SIMPLE RANGE", custom.
- "PICTURE EDIT".
- "CAPTCHA".
- "STARS".
- "MULTI-DROPDOWN".
- "TIME PICKER".
- "MULTI-COMPLTE.
- "DYNAMIC TABLE" ( with filters )
- "MENU".
- "CHECKBOXES-ATTACH". Checkboxes build on an element of a repeater.
- "CHARTS".
