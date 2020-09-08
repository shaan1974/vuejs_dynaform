//	INPUT HIDDEN

hiddenInput = Vue.component(
    'HiddenInput',
    {
        template: HiddenInput_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Helper_Mixin],
        props: ['placeholder', 'label', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus']
    }
);