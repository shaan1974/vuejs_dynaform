/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN - TREEVIEW DATA - ACTION EDIT
// 

var TreeviewData_Action_Edit_Mixin = {

    methods:
    {
        "treeviewEntry_edit": function(model, event)
        {
            alert("EDIT");
            console.log(arguments);
        }
    }
};