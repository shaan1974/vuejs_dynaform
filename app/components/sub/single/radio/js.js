//	RADIO

Radio = Vue.component(
    'Radio',
    {
        template: Radio_template,
        props: ['labels', 'name', 'value', 'options', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'linkTo', 'linkFrom', 'config', 'styles'],
        mixins: [DynaForm_Mixin, Labels_Mixin, Dico_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin, Event_Mixin, Value_Mixin, DynaDic_Mixin],
        data: function()
        {
            return {
                "default_config": "radio"
            };
        },
        methods:
        {
            "isChecked": function(c)
            {
                if (typeof this.value === "undefined")
                {
                    return false;
                }

                return (this.value.indexOf(c) != -1) ? true : false;
            }
        }
    }
);