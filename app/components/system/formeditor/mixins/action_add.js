/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN - TREEVIEW DATA - ACTION ADD
// 

var TreeviewData_Action_Add_Mixin = {

    methods:
    {
        "treeviewEntry_add": function(model, event)
        {
            alert("ADD");
            console.log(arguments);
        }
    }
};