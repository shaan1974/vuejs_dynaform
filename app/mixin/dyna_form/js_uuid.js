var DynaForm_Uuid_Mixin = {

    methods:
    {
        /*  UUIDS */
        "Uuid": function()
        {
            return ("UUID_" + Math.random().toString(36).substring(2) + Date.now().toString(36) + "").toUpperCase();
        },
        "shortUuid": function()
        {
            return "U" + Math.random().toString(36).substring(2).toUpperCase();
        }
    }
};

//  MERGE THIS MIXIN WITH THE MAIN ONE
//
DynaForm_Mixin.methods = Object.assign(DynaForm_Mixin.methods, DynaForm_Uuid_Mixin.methods);