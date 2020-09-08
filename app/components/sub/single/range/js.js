//  RANGE
//  https://www.w3schools.com/howto/howto_js_rangeslider.asp

RangeInput = Vue.component(
    'RangeInput',
    {
        template: Range_template,
        props: ['labels', 'name', 'value', 'fieldMode', 'minValue', 'maxValue', 'parent_index', 'key2', 'fieldType', 'stepValue', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'config', 'styles'],
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin],
        data: function()
        {
            return {
                "default_config": "rangeInput"
            };
        }
    }
);