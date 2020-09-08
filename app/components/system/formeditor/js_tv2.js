/*
    ACTIONS

    1 - FROM CHILD TO PARENT 
    2 - PARENT TO CHILDREN

    WHEN WE RIGHT CLICK ON AN ELEMENT OF THE TREEVIEW DATA TO SEE THE ACTIONS BUTTONS.
    
    DEFINITIONS :

        1 - "FORM-EDITOR"       IN TEMPLATE
                                -> ADD EVENT @callFromChildToParent INTO COMPONENT TAG "TREEVIEW DATA"
                                @callFromChildToParent="childrenCall()"

                                IN TREEVIEW DATA
                                -> ADD EVENT @callFromChildToParent INTO COMPONENT TAG "TREEVIEW DATA" ( FOR: REPEATER, STATIC )
                                    @callFromChildToParent="formEditor.childrenCall()"
        
        2 - "TREEVIEW DATA"     
            
            DEFINITION OF CATCH EVENT "updateContextMenus" CALL FROM "FORM-EDITOR" [this.formEditor] INTO MOUNTED
            "this.formEditor.$on('updateContextMenus', this.actionFromParent);"

    ACTIONS :

        1 - ON RIGHT CLICK ON TREEVIEW NODE WE CALL FUNCTION "showContextMenu"

            A - WE EMIT TO (FORM-EDITOR) "callFromChildToParent"
            
            CALLER      => "this.$emit("callFromChildToParent");"       INTO TREEVIEW DATA
            
            RECIEVER    => @callFromChildToParent="childrenCall()"                  INTO FORM-EDITOR
                        => @callFromChildToParent="formEditor.childrenCall()"       INTO TREEVIEW DATA

                A1 -    INTO "FORM-EDITOR" OR INTO EACH NODE CREATED FOR REPEATER/STATIC (ATTACH TO TREVIEWDATA TAG)
                        EVENT callFromChildToParent CALL FUNCTION "childrenCall" FROM "FORM-EDITOR"

                        THIS FUNCTION EMIT TO ALL CHILD "TREEVIEW DATA" EVENT "updateContextMenus"
                        CALL        =>  this.$emit('updateContextMenus', 7);                                    

                A2 -    
                        RECEIVER    =>  this.formEditor.$on('updateContextMenus', this.actionFromParent);
                        "updateContextMenus" IS CALL TO ALL "TREEVIEW DATA" COMPONENTS AND SET "CONTEXTMENU" VAR TO FALSE
                        WITH FUNCTION "this.actionFromParent"
            
            B - NEXT TICK WE SET THE "CONTEXTMENU" VAR OF CURRENT "TREEVIE DATA" TO "TRUE"
*/
TreeviewData = Vue.component(
    'TreeviewData',
    {
        template: TreeviewData_Template,
        props: ['model', 'level_ndx', 'position'],
        mixins: [TreeviewData_Drag_Mixin, TreeviewData_Context_Mixin, TreeviewData_Static_Array_Mixin, TreeviewData_Action_Remove_Mixin, TreeviewData_Action_Add_Mixin, TreeviewData_Action_Edit_Mixin],
        data: function()
        {
            return {
                formEditor: "",
                /* DRAG ELEMENT */
                celm: "",
                /* FOR REPEATER */
                switchArray: false,
                /* FOR ARRAY  */
                switchStatic: false,
                switchStaticArrayInit: false,
                switchStaticArray: [],
                contextMenu: false
            };
        },
        mounted: function()
        {
            //  ATTACH MAIN ANCESTOR BECAUSE IT'S NOT ALWAYS THE PARENT AS THIS COMPONENT CALL IT SELF TO CREATE MULTI LEVEL TREEVIEW ITEMS
            //
            this.formEditor = this.$root.$refs["FORM-GENERATOR"].$refs.FORMEDITOR;

            //  ATTACH CALL EVENT FROM PARENT - CALL FROM FCT "childrenCall" IN FORM-EDITOR
            //
            this.formEditor.$on('updateContextMenus', this.actionFromParent);
        },
        methods:
        {
            /*
                DEFINE IF IT'S ARRAY OR OBJECT
            */
            "isConstructorArray": function(z)
            {
                return z._isArray();
            },
            "isConstructorObject": function(z)
            {
                return z._isObject();
            },
            /*
                UTILS
            */
            "moveElementSub": function(bb, from, to)
            {
                bb._move(from, to);
            },
            "findNested": function(obj, key, val, memo)
            {
                var i,
                    proto = Object.prototype,
                    ts = proto.toString,
                    hasOwn = proto.hasOwnProperty.bind(obj);

                if ('[object Array]' !== ts.call(memo)) memo = [];

                for (i in obj)
                {
                    if (hasOwn(i))
                    {
                        if (i === key && obj[i] === val)
                        {
                            memo.push(obj);
                        }
                        else if ('[object Array]' === ts.call(obj[i]) || '[object Object]' === ts.call(obj[i]))
                        {
                            this.findNested(obj[i], key, val, memo);
                        }
                    }
                }

                return memo;
            },
            /*
                SWAP OBJECT DATA
            */
            "moveObjectData": function(co, b_ndx, d_ndx, rewrite)
            {
                var k1 = Object.keys(co);
                var k2 = Object.keys(co);
                k2._move(b_ndx, d_ndx);

                var k3 = {};
                for (cnt = 0; cnt < k1.length; cnt++)
                {
                    k3[k2[cnt]] = co[k2[cnt]];
                }

                //  REWRITE OBJECT STRUCTURE
                //
                if (rewrite === true)
                {
                    //  #1 - WE REMOVE OLD STRUCTURE KEY PER KEY
                    //
                    keyNames = Object.keys(co);
                    for (var cnt5 = 0; cnt5 < keyNames.length; cnt5++)
                    {
                        delete co[keyNames[cnt5]];
                    }

                    //  #2 - ASSIGN NEW OBJECT ABND RE-CREATE CO WITH K3
                    //
                    co = Object.assign(
                        co, k3);
                }

                return k3;
            },
            /*
                REMOVE KEY ENTRY IN MODEL
            */
            "removeObjectDataByKey": function(co, key)
            {
                //  REBUILD OBJECT EXCEPT THE ONE WITH NDX
                //
                var k3 = {};
                var k = Object.keys(co);

                for (cnt = 0; cnt < k.length; cnt++)
                {
                    if (k[cnt] !== key)
                    {
                        k3[k[cnt]] = co[k[cnt]];
                    }
                }

                //  #1 - WE REMOVE OLD STRUCTURE KEY PER KEY
                //
                keyNames = Object.keys(co);
                for (var cnt5 = 0; cnt5 < keyNames.length; cnt5++)
                {
                    delete co[keyNames[cnt5]];
                }

                //  #2 - ASSIGN NEW OBJECT ABND RE-CREATE CO WITH K3
                //
                co = Object.assign(
                    co, k3);

                return co;
            },
            /*
                GET INDEX OF ELEMENT INTO THE CURRENT LEVEL
            */
            "get_ndx": function(sourceRef, baseRef)
            {
                var ndx;
                var sourceUid = sourceRef.schemaUid;

                baseRef.forEach(function(o, i)
                {
                    if (sourceUid === o.schemaUid)
                    {
                        ndx = i;
                    }
                });

                return ndx;
            },
            /*
                GET TREEVIEW DATA PATH
            */
            "get_treeview_data_path": function(zz)
            {
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

                return path;
            }
        }
    });