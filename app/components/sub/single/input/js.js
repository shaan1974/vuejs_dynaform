//	INPUT TEXT

TextInput = Vue.component(
    'TextInput',
    {
        template: TextInput_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Helper_Mixin, Event_Mixin, Value_Mixin, Clear_Mixin, Config_Mixin, Watchers_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'config', 'styles'],
        data: function()
        {
            return {
                "default_config": "inputText"
            };
        }
    }
);