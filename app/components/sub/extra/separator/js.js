//	SEPARATOR

Separator = Vue.component(
    'Separator',
    {
        mixins: [Prop_Status_Mixin],
        props: ['propStatus', 'styles'],
        template: Separator_template
    }
);