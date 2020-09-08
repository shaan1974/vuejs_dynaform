/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN - WATCHERS
// 
var Watchers_Mixin = {

    methods:
    {
        /*
            O VARIABLE :
            - "A" - Attribute to keep an eye on it
            - "F" - Function to call
        */
        "init_watcher": function(o)
        {
            //	--DEBUG_[ init watcher ]
            if (this.$root.config.debugMode === true)
            {
                console.log("INIT WATCHERS");
                console.log(o);
            }
            //	--/DEBUG_[ init watcher ]            

            //  LOOP ON WATCHERS THAT SHOULD BE ATTACH
            //
            //  PARAMETER IMMEDIATE AND DEEP ARE SET TO HANDLE CHANGE IN CHILDREN AND ALSO RUN IT WHEN THE WATCHER IS DECLARE
            //
            for (var cnt = 0, len = o.length; cnt < len; cnt++)
            {
                this.$watch("" + o[cnt].a + "", this["" + o[cnt].f + ""],
                {
                    immediate: true,
                    deep: true
                });
            }
        },
        /*
            WATCHERS
        */
        /*
            IN THE CASE wHEN SOMETHING IS UPDATED INTO THE USERS TABLE ADD,REMOVE, OR UPDATE ELEMENTTS INSIDE, THIS FUNCTION IS CALL TO
        */
        "repeaterUsersChange": function()
        {
            console.log("repeaterUsersChange");
        }
    }
};