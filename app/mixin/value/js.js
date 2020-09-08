//	MIXIN VALUE
/*
     this.setDataValue("", true);
*/
var Value_Mixin = {

    methods:
    {
        /*
            Params :
            #1 - value
            #2 - init validation, behaviour
        */
        setDataValue: function(v, initVb)
        {
            if (typeof this.parent_index === "undefined")
            {
                this.$emit('input', v);
            }
            else
            {
                this.$parent.$parent.updateInput(
                {}, v, this.parent_index, this.key2);
            }

            if (initVb === true)
            {
                this.simulateVB();
            }
        },

        typeOf: function(o)
        {
            return typeof o;
        },
        /*
            SET EMPTY VALUE KIND OF ALIAS FOR SET DATA VALUE BUT WITH NOTHING
        */
        setEmptyValue: function()
        {
            this.setDataValue("", true);
        }
    }
};