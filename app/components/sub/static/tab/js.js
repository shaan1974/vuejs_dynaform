//  STATIC TAB

TabStatic = Vue.component(
    'TabStatic',
    {
        template: Tab_Static_template,
        props: ["labels", "fieldsFormat", "name", "fieldMode", "values", "fieldType", "helper", "behaviours", "propStatus", 'styles', 'config'],
        mixins: [Repeater_Mixin, Labels_Mixin, Validation_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, DynaForm_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin],
        data: function()
        {
            return {
                "is_static": true,
                "vtab": 0,
                "default_config": "TabStatic"
            };
        }
    }
);