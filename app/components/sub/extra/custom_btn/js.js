//	CUSTOM BUTTON
/*
    ALL REFERENCE CODE ARE LOCATED INTO MIXINS/BUTTONS
*/

CustomBtn = Vue.component(
    'CustomBtn',
    {
        template: CustomBtn_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Helper_Mixin, Config_Mixin, Buttons_Mixin, Watchers_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'propStatus', 'styles', 'config'],
        data: function()
        {
            return {
                "default_config": "CustomBtn",
            };
        },
        methods:
        {
            "btnDo": function()
            {
                this['' + this.builded_config.action + '']();
            }
        }
    }
);