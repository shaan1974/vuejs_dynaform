var Behaviour_prop_Mixin = {

    methods:
    {
        /*
            SET ABILITY
        */
        "setAbility": function(value)
        {
            this.status_ability = value;

            //  WE CHECK IF WE HAVE A BASE PROPERTY OBJECT
            if (this.notEmptyObject(this.base_properties))
            {
                //  IF BASE PROPERTY OBJECT HAS STATUS ABILITY DEFINED.
                if (typeof this.base_properties.status_ability !== "undefined")
                {
                    this.status_ability = this.base_properties.status_ability;
                }

                //  IF BASE PROPERTY OBJECT HAS STATUS VISIBILITY DEFINED.
                if (typeof this.base_properties.status_visibility !== "undefined")
                {
                    this.status_visibility = this.base_properties.status_visibility;
                }
            }
        },
        /*
            SET VISIBILITY
        */
        "setVisibility": function(value)
        {
            this.status_visibility = value;
        },
        /*
             SET ON OFF ABILITY BUTTONS
         */
        "set_OFF": function()
        {
            this.setAbility(false);
            this.$emit('event_setAbility', false);
        },
        "set_ON": function()
        {
            this.setAbility(true);
            this.$emit('event_setAbility', true);
        },
        /*
            SET PROPERTY
        */
        "set_prop": function(act)
        {
            switch (act)
            {
                case "HIDE":
                    this.prop_name = "status_visibility";
                    this.prop_value = false;
                    this.$emit('event_setVisibility', false);
                    break;
                case "SHOW":
                    this.prop_name = "status_visibility";
                    this.prop_value = true;
                    this.$emit('event_setVisibility', true);
                    break;
                case "ENABLE":
                    this.prop_name = "status_ability";
                    this.prop_value = true;
                    this.$emit('event_setAbility', true);
                    break;
                case "DISABLE":
                    this.prop_name = "status_ability";
                    this.prop_value = false;
                    this.$emit('event_setAbility', false);
                    break;
            }

            //  CALL
            if (typeof this.parent_index === "undefined")
            {
                this.$emit("update_prop", this);
            }
            else
            {
                this.$parent.$parent.updateProp(this);
            }
        }
    }
};

//  MERGE THIS MIXIN WITH THE MAIN ONE
//
Behaviour_Mixin.methods = Object.assign(Behaviour_Mixin.methods, Behaviour_prop_Mixin.methods);