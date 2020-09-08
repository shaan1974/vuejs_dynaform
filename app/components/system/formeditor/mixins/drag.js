/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN - TREEVIEW DATA - DRAG
// 

var TreeviewData_Drag_Mixin = {

    methods:
    {
        /*  **************************************************************************************************************************************
        DRAG, DROP METHODS
        ************************************************************************************************************************************** */
        /*
            IS DRAG DISABLED
            IF BUTTONS ACTION ARE VISIBLE DRAG AND DROP IS DISABLED
        */
        "isDragDisabled": function()
        {
            return this.formEditor.dragDisabled;
        },
        /*
            INIT VAR TO KNOW WICH ELEMENT INTO THE MODEL IS DROP AND WHICH TARGET INTO THE DOM
        */
        "dragStart": function(item, ev)
        {
            //  IS DRAG DISABLED
            //
            if (this.isDragDisabled())
            {
                return true;
            }

            this.formEditor.baseDragItem = item;
            this.formEditor.baseDragElement = ev.target;
        },
        "dragEnter": function(item, ev)
        {
            //  IS DRAG DISABLED
            //
            if (this.isDragDisabled())
            {
                return true;
            }

            //  SET CACHE ELEMENT FOR STATIC ARRAY
            //
            this.celm = ev.target;

            var tg = ev.target.parentNode.getAttribute("data-level");

            if (tg === null)
            {
                tg = ev.target.parentNode.parentNode.getAttribute("data-level");
            }

            if (tg === null)
            {
                if (ev.target.tagName === "UL")
                {}
                else
                {
                    tg = ev.target.parentNode.getAttribute("data-level");
                }
            }

            //  IF LEVELS ARE THE SAME WE CAN CHANGE THE COLOR OF THE BACKGROUND TO INDICATE THAT THE ELEMENT COULD BE DROP
            //
            if (this.formEditor.baseDragElement.getAttribute("data-level") === tg)
            {
                ev.target.classList.add("sortable-chosen");

                if (ev.target.parentNode._hasClass("li_static"))
                {
                    ev.target.parentNode._addClass("sortable-chosen2");
                }
                this.formEditor.dragOk = true;
            }
            else
            {
                this.formEditor.dragOk = false;
            }
        },
        "dragLeave": function(ev)
        {
            //  IS DRAG DISABLED
            //
            if (this.isDragDisabled())
            {
                return true;
            }

            ev.target.classList.remove("sortable-chosen");

            if (ev.target.parentNode._hasClass("li_static"))
            {
                if (this.celm._hasClass("sortable-chosen"))
                {
                    ev.target.parentNode._addClass("sortable-chosen2");
                }
                else
                {
                    ev.target.parentNode._removeClass("sortable-chosen2");
                }
            }
        },
        "dragEnd": function(ev)
        {
            //  IS DRAG DISABLED
            //
            if (this.isDragDisabled())
            {
                return true;
            }

            ev.target.classList.remove("sortable-chosen");

            if (ev.target.parentNode._hasClass("li_static"))
            {
                // console.log("REMOVE B - LI STATIC");
                ev.target.parentNode._removeClass("sortable-chosen2");
            }
        },
        "dragFinish": function(item, ev)
        {
            //  IS DRAG DISABLED
            //
            if (this.isDragDisabled())
            {
                return true;
            }

            //  IN CASE WE ARE NOT ON THE SAME LEVEL REFERENCE OPERATION IS CANCEL
            //
            if (this.formEditor.dragOk === false)
            {
                return true;
            }

            //  REMOVE BACKGROUND COLOR
            //
            ev.target.classList.remove("sortable-chosen");

            if (ev.target.parentNode._hasClass("li_static"))
            {
                // console.log("REMOVE - LI STATIC");
                ev.target.parentNode._removeClass("sortable-chosen2");
            }

            var b_ndx, d_ndx;

            //  IN CASE OF ROOT POSITION
            //
            //  ELEMENTS COULD BE SWAO WITHOUT TOUCHIN THE MODEL DATA
            //
            if (this.formEditor.baseDragElement.getAttribute("data-level") === "ROOT")
            {
                //  FIND SOURCE ELEMENT INTO SCHEMA
                //
                b_ndx = this.get_ndx(this.formEditor.baseDragItem, this.formEditor.ss);

                //  DESTINATION ELEMENT INTO SCHEMA
                //
                d_ndx = this.get_ndx(item, this.formEditor.ss);

                //  SWAP ELEMENTS
                //
                this.moveElementSub(this.formEditor.ss, b_ndx, d_ndx);
            }
            //  IF NOT ROOT POSITION WE HAVE TO CHECK THE TYPE OF DATA WE HAVE : "REPEATER", "STATIC", "STATIC_ARRAY"
            //  "STATIC" ELEMENT INSIDE "STATIC_ARRAY"
            //  "STATIC_ARRAY" THE CONTAINER OF "STATIC"
            //
            else
            {
                //  FOR SCHEMA
                //                    
                var baseLevel = this.formEditor.baseDragElement.getAttribute("data-level");
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

                    basePosition = parseInt(this.formEditor.baseDragElement.getAttribute("data-position"));
                    targetPosition = parseInt(ev.target.parentNode.getAttribute("data-position"));
                }

                //  IN CASE OF REPEATER OR STATIC WE HAVE TO FOUND THE ELEMENTS INVOLVE
                //
                if (isRepeater || isStatic)
                {
                    //  FIND SOURCE ELEMENT INTO SCHEMA
                    //
                    b_ndx = this.get_ndx(this.formEditor.baseDragItem, rootSearch);

                    //  DESTINATION ELEMENT INTO SCHEMA
                    //
                    d_ndx = this.get_ndx(item, rootSearch);
                }
                //  IF IS'S STATIC ARRAY WE TOOK OTHER VARS
                //
                else if (isStaticArray)
                {
                    b_ndx = basePosition;
                    d_ndx = targetPosition;
                }

                //  MOVE DATA FROM SCHEMA
                //
                this.moveElementSub(rootSearch, b_ndx, d_ndx);

                //  FOR DATA MODEL
                //
                //  GET CORRECT ELEMENT INTO FORM DATA
                //

                //  A - GET PATH FROM TO BE ABLE TO BUILD JSON PATH
                //
                /*var zz = this.parentsUntil(ev.target, "#ex1", "li");
                zz.reverse();*/

                // var zz = ev.target._parentUntil("#ex1", "li");
                var zz = ev.target._parentUntil(".treeview_data_main_root", "li");
                zz.reverse();

                //  IN CASE OF STATIC ARRAY WE REMOVE THE LAST ENTRY
                //
                if (isStaticArray)
                {
                    zz.pop();
                }

                //  B - JSON PATH - REBUILD PATH TO ACCESS TO JSON DATA
                //
                /*var path = this.$root.$refs["FORM-GENERATOR"].formData;

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
                }*/
                var path = this.get_treeview_data_path(zz);

                /*  ******************************************************************
                    IN CASE OF REPEATER 
                */
                if (isRepeater)
                {
                    var o_datas = path;
                    var nnj = [];

                    for (var cnt6 = 0; cnt6 < o_datas.length; cnt6++)
                    {
                        nj = this.moveObjectData(o_datas[cnt6], b_ndx, d_ndx, false);
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
                        this.moveObjectData(rootData.emptyLine, b_ndx, d_ndx, true);
                    }

                    //  TO DO IN CASE OF fieldType="TableRepeater" WE NEED TO SWAP ALSO:
                    //  labels.guidelines , labels.columns , labels.columnsClass , styles.tableHeader
                    //
                    if (typeof rootData.labels.guidelines !== "undefined")
                    {
                        rootData.labels.guidelines._move(b_ndx, d_ndx);
                    }

                    if (typeof rootData.labels.columns !== "undefined")
                    {
                        rootData.labels.columns._move(b_ndx, d_ndx);
                    }

                    if (typeof rootData.labels.columnsClass !== "undefined")
                    {
                        rootData.labels.columnsClass._move(b_ndx, d_ndx);
                    }

                    if (typeof rootData.styles.tableHeader !== "undefined")
                    {
                        rootData.styles.tableHeader._move(b_ndx, d_ndx);
                    }
                }
                /*  ******************************************************************
                    IN CASE OF STATIC 
                */
                else if (isStatic)
                {
                    // console.log("IS STATIC");
                    this.moveObjectData(path, b_ndx, d_ndx, true);
                }
                /*  ******************************************************************
                    IN CASE OF STATIC ARRAY
                */
                else if (isStaticArray)
                {
                    // console.log("IS STATIC ARRAY");
                    path._move(b_ndx, d_ndx);

                    //  TO DO IN CASE OF fieldType="TabStatic" WE NEED TO SWAP ALSO:
                    //  labels.tabs
                    if (typeof rootData.labels.tabs !== "undefined")
                    {
                        rootData.labels.tabs._move(b_ndx, d_ndx);
                    }
                }
            }
        },
    }
};