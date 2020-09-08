/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN HELPER
var Helper_Mixin = {

    methods:
    {
        isHelper: function()
        {
            if (typeof this.labels === "undefined")
            {
                return false;
            }
            return (typeof this.labels.helper === "undefined") ? false : true;
        }
    }
};