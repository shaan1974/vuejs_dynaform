//	COMPONENENT - CONTAINER
//
Containerhelper = Vue.component(
    'ContainerHelper',
    {
        template: Container_Template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin],
        data: function()
        {
            return {
                "default_config": "container"
            };
        },
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'config', 'behaviours', 'propStatus', 'styles']
    }
);