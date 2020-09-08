//	CHECKBOW SINGLE

CheckboxSingle = Vue.component(
    'CheckboxSingle',
    {
        template: CheckboxSingle_template,
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'config', 'styles'],
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin],
        data: function()
        {
            return {
                "Ichecked": false,
                "default_config": "checkboxSimple"
            };
        },
        mounted: function()
        {
            //  SET PROPERTY CHECK DEPENDING OF CURRENT VALUE RELATED TO TRUE OR FALSE VALUE
            this.Ichecked = (this.value === this.builded_config.trueValue) ? true : false;
        },
        methods:
        {
            "updateCheckboxValue": function(event, val)
            {
                this.Ichecked = !this.Ichecked;

                var v = (this.Ichecked) ? this.builded_config.trueValue : this.builded_config.falseValue;
                this.setDataValue(v, false);
            }
        }
    }
);