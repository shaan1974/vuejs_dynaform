//	LABEL

Labelhelper = Vue.component(
    'Labelhelper',
    {
        template: Label_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Helper_Mixin, Watchers_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'propStatus', 'styles']
    }
);