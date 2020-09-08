/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN - TREEVIEW DATA - ACTION REMOVE
// 

var TreeviewData_Action_Remove_Mixin = {

    methods:
    {
        "treeviewEntry_remove": function(model, event)
        {
            var b_ndx;

            //  SI L'ELEMENT FAIT PARTIE DU "ROOT"
            //
            if (event.target.closest("li").getAttribute("data-level") === "ROOT")
            {
                //  ON RECHERCHE SA POSITION DANS LE "SCHEMA"
                //
                b_ndx = this.get_ndx(model, this.formEditor.ss);
                this.formEditor.ss.splice(b_ndx, 1);

                //  ON SUPPRIME LA CLEE DU MODEL DE DONNES
                //  
                this.removeObjectDataByKey(this.$root.formData, model.name);
            }
            //  IF NOT ROOT POSITION WE HAVE TO CHECK THE TYPE OF DATA WE HAVE : "REPEATER", "STATIC", "STATIC_ARRAY"
            //  "STATIC" ELEMENT INSIDE "STATIC_ARRAY"
            //  "STATIC_ARRAY" THE CONTAINER OF "STATIC"
            //
            else
            {
                //  FOR SCHEMA
                //                    
                var baseLevel = event.target.closest("li").getAttribute("data-level");
                var isRepeater = baseLevel.endsWith("_REPEATER");
                var isStatic = baseLevel.endsWith("_STATIC");
                var isStaticArray = baseLevel.endsWith("_ARRAY");
                var staticNdx;
                var rootSearch;
                if (isStatic)
                {
                    staticNdx = baseLevel.match(/_(\d+)_/)[1];
                }

                baseLevel = baseLevel.replace(/\_\w+/gi, "");

                console.log(baseLevel);

                //  IS REPEATER
                //               
                var rootFind = this.findNested(this.formEditor.ss, "schemaUid", "" + baseLevel + "");

                if (isRepeater)
                {
                    rootSearch = rootFind[0].fieldsFormat;
                    rootData = rootFind[0];
                }
                //  SO STATIC ONE
                //  WE NEED TO LOOP ON ALL ARRAY TO FIND THE GOOD ONE
                else if (isStatic)
                {
                    rootSearch = rootFind[0].fieldsFormat[staticNdx];
                    rootData = rootFind[0];
                }
                //  IS STATIC ARRAY
                //
                else if (isStaticArray)
                {
                    rootSearch = rootFind[0].fieldsFormat;
                    rootData = rootFind[0];

                    basePosition = event.target.closest("li").getAttribute("data-position");
                }

                //  IN CASE OF REPEATER OR STATIC WE HAVE TO FOUND THE ELEMENTS INVOLVE
                //
                if (isRepeater || isStatic)
                {
                    //  FIND SOURCE ELEMENT INTO SCHEMA
                    //
                    b_ndx = this.get_ndx(model, rootSearch);
                }
                //  IF IS'S STATIC ARRAY WE TOOK OTHER VARS
                //
                else if (isStaticArray)
                {
                    b_ndx = basePosition;
                }

                //  MOVE DATA FROM SCHEMA
                //
                rootSearch.splice(b_ndx, 1);

                //  FOR DATA MODEL
                //
                //  GET CORRECT ELEMENT INTO FORM DATA
                //

                //  A - GET PATH FROM TO BE ABLE TO BUILD JSON PATH
                //
                /*var zz = this.parentsUntil(ev.target, "#ex1", "li");
                zz.reverse();*/

                // var zz = event.target.closest("li")._parentUntil("#ex1", "li");
                var zz = event.target._parentUntil(".treeview_data_main_root", "li");
                zz.reverse();

                //  IN CASE OF STATIC ARRAY WE REMOVE THE LAST ENTRY
                //
                if (isStaticArray)
                {
                    // zz.pop();
                }

                //  B - JSON PATH - REBUILD PATH TO ACCESS TO JSON DATA
                //
                /*
                var path = this.$root.$refs["FORM-GENERATOR"].formData;

                for (var cnt = 0; cnt < zz.length; cnt++)
                {
                    c_elm = zz[cnt];

                    if (c_elm.getAttribute("data-level") === "ROOT")
                    {
                        path = path[c_elm.getAttribute("data-name")];
                    }
                    else if (c_elm.getAttribute("data-array") !== null)
                    {
                        path = path[c_elm.getAttribute("data-array")][0];
                    }
                    else if (c_elm.getAttribute("data-name") !== null)
                    {
                        path = path[c_elm.getAttribute("data-name")];
                    }
                }
                */
                var path = this.get_treeview_data_path(zz);

                /*  ******************************************************************
                    IN CASE OF REPEATER 
                */
                if (isRepeater)
                {
                    var o_datas = path;
                    var nj;
                    var nnj = [];

                    for (var cnt6 = 0; cnt6 < o_datas.length; cnt6++)
                    {
                        nj = Object.assign(
                        {}, o_datas[cnt6]);
                        nj = this.removeObjectDataByKey(nj, Object.keys(nj)[b_ndx]);
                        nnj.push(nj);
                    }

                    //  EMPTY ARRAY WITH SPLICE
                    //
                    path.splice(0, path.length);

                    //  SET ARRAY WITH NNJ
                    //
                    for (var cnt7 = 0; cnt7 < nnj.length; cnt7++)
                    {
                        path.push(nnj[cnt7]);
                    }

                    //  IF EMPTY LINE FOR DUPLICATION WE NEED ALSO TO CHANGE THE KEYS PLACE
                    //
                    if (typeof rootData.emptyLine !== "undefined")
                    {
                        this.removeObjectDataByKey(rootData.emptyLine, Object.keys(nj)[b_ndx]);
                    }

                    //  TO DO IN CASE OF fieldType="TableRepeater" WE NEED TO SWAP ALSO:
                    //  labels.guidelines , labels.columns , labels.columnsClass , styles.tableHeader
                    //
                    if (typeof rootData.labels.guidelines !== "undefined")
                    {
                        rootData.labels.guidelines.splice(b_ndx, 1);
                    }

                    if (typeof rootData.labels.columns !== "undefined")
                    {
                        rootData.labels.columns.splice(b_ndx, 1);
                    }

                    if (typeof rootData.labels.columnsClass !== "undefined")
                    {
                        rootData.labels.columnsClass.splice(b_ndx, 1);
                    }

                    if (typeof rootData.styles.tableHeader !== "undefined")
                    {
                        rootData.styles.tableHeader.splice(b_ndx, 1);
                    }
                }
                /*  ******************************************************************
                    IN CASE OF STATIC 
                */
                else if (isStatic)
                {
                    // console.log("IS STATIC");
                    this.removeObjectDataByKey(path, Object.keys(path)[b_ndx]);
                }
                /*  ******************************************************************
                    IN CASE OF STATIC ARRAY
                */
                else if (isStaticArray)
                {
                    // console.log("IS STATIC ARRAY");
                    path.splice(b_ndx, 1);

                    //  TO DO IN CASE OF fieldType="TabStatic" WE NEED TO SWAP ALSO:
                    //  labels.tabs
                    if (typeof rootData.labels.tabs !== "undefined")
                    {
                        rootData.labels.tabs.splice(b_ndx, 1);
                    }
                }
            }

            //  SET DRAG MODE TO ON
            //
            this.formEditor.dragDisabled = false;
        }
    }
};