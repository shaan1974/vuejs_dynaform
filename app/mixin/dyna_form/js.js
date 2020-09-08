//	MIXIN

var DynaForm_Mixin = {

    created: function()
    {
        this.fieldUid = this.shortUuid();
    },
    methods:
    {
        /*  UPDATE ELEMENT */
        "updateElement": function(event)
            {
                var val = event.target.value;

                //  IF NOT COMING FROM REPEATER
                //
                if (typeof this.parent_index === "undefined")
                {
                    this.$emit('input', val);
                }
                else
                {
                    this.$parent.$parent.updateInput(event, val, this.parent_index, this.key2);
                }
            }
            /*,
                    toLower: function(v)
                    {
                        return v.toLowerCase();
                    }*/
    }
};