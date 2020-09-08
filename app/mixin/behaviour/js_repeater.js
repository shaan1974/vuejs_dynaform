var Behaviour_Repeater_Mixin = {

    methods:
    {
        "repeater_add": function()
        {
            this.addLine();
        },
        "repeater_remove_last": function()
        {
            var l = this.values.length - 1;
            var t = (this.fieldType === "TabRepeater") ? "tab" : "";
            this.removeLine(l, t);
        },
        "repeater_remove_ndx": function(ndx)
        {
            var t = (this.fieldType === "TabRepeater") ? "tab" : "";
            this.removeLine(ndx, t);
        },
        "repeater_remove_all": function()
        {
            var l = this.values.length;
            var t = (this.fieldType === "TabRepeater") ? "tab" : "";

            for (var i = 0; i < l; i++)
            {
                this.removeLine(0, t);
            }
        }
    }
};

//  MERGE THIS MIXIN WITH THE MAIN ONE
//
Behaviour_Mixin.methods = Object.assign(Behaviour_Mixin.methods, Behaviour_Repeater_Mixin.methods);