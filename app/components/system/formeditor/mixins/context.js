/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN - TREEVIEW DATA - CONTEXT
// 

var TreeviewData_Context_Mixin = {

    methods:
    {
        /*
            SET CONTEXTMENU VAR TO FALSE TO HIDE ALL CONTAINER WITH ACTIONS BUTTONS
        */
        "actionFromParent": function(v)
        {
            console.log("PARENT CALL CHILD...", v);
            this.contextMenu = false;
        },
        /*
            SHOW CONTEXT MENU
        */
        "showContextMenu": function(e)
        {
            //  EMIT TO PARENT ANCESTOR - CALL EVENT "callFromChildToParent" ATTACH TO COMPONENT TREEVIEW_DATA IN TEMPLATE FORM-EDITOR, OR TO TREEVIEW DATA ITEM CREATED THROUGHT TREEVIEW DATA FOR REPEATER AND STATIC
            //
            this.$emit("callFromChildToParent");

            //  ON NEXT TICK SHOW CURRENT ACTIONS BUTTONS
            //
            this.$nextTick(
                function()
                {
                    this.contextMenu = true;
                    this.formEditor.dragDisabled = true;
                });
        },
        /*
            IN CASE IF CLICK ON HIDE BUTTON INTO ACTIONS BUTTONS
        */
        "hideContextMenu": function(e)
        {
            this.contextMenu = false;
            this.formEditor.dragDisabled = false;
        }
    }
};