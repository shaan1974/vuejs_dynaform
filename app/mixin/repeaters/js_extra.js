var Repeater_Extra_Mixin = {

    methods:
    {
        "shortUuid": function()
        {
            return "U" + Math.random().toString(36).substring(2).toUpperCase();
        },
        "displayAddbtn": function()
        {
            var mx = (typeof this.builded_config.maxRecords === "undefined") ? 999999999 : this.builded_config.maxRecords;

            return (this.values.length < mx) ? true : false;
        }
    }
};

//  MERGE THIS MIXIN WITH THE MAIN ONE
//
Repeater_Mixin.methods = Object.assign(Repeater_Mixin.methods, Repeater_Extra_Mixin.methods);