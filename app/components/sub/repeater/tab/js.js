//	TAB

TabRepeater = Vue.component(
    'TabRepeater',
    {
        template: TabRepeater_template,
        props: ['labels', 'values', 'fieldsFormat', "name", "fieldMode", "maxRecords", "fieldType", "parent_index", "key2", "validations", "behaviours", "defaultValue", "propStatus", "emptyLine", "config", "styles"],
        mixins: [Repeater_Mixin, Labels_Mixin, Validation_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, DynaForm_Mixin, Event_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin],
        data: function()
        {
            return {
                "vtab": 0,
                "is_repeater": true,
                "default_config": "tabRepeater"
            };
        },
        computed:
        {
            "i_verticalTab": function()
            {
                return (typeof this.builded_config.verticalTab === "undefined") ? false : this.builded_config.verticalTab;
            }
        }
    }
);