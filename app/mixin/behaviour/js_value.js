var Behaviour_Value_Mixin = {

    methods:
    {
        /*
            EMPTY VALUE
        */
        "set_empty_value": function()
        {
            if (typeof this.parent_index === "undefined")
            {
                this.$emit('input', '');
            }
            else
            {
                this.$parent.$parent.updateInput(
                {}, '', this.parent_index, this.key2);
            }
        },
        /*
            SET DEFINE VALUE
        */
        "set_define_value": function(v)
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
        },
        /*
            SET DEFAULT VALUE
        */
        "set_default_value": function()
        {
            v = this.defaultValue;

            if (typeof this.parent_index === "undefined")
            {
                this.$emit('input', v);
            }
            else
            {
                this.$parent.$parent.updateInput(
                {}, v, this.parent_index, this.key2);
            }
        }
    }
};

//  MERGE THIS MIXIN WITH THE MAIN ONE
//
Behaviour_Mixin.methods = Object.assign(Behaviour_Mixin.methods, Behaviour_Value_Mixin.methods);