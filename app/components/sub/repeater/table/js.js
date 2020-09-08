//	TABLE

TableRepeater = Vue.component(
    'TableRepeater',
    {
        template: TableRepeater_template,
        props: ['labels', 'values', 'fieldsFormat', "name", "fieldMode", "fieldType", "parent_index", "key2", "validations", "behaviours", "defaultValue", "propStatus", "emptyLine", "config", "styles"],
        mixins: [Repeater_Mixin, Labels_Mixin, Validation_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, DynaForm_Mixin, Event_Mixin, Helper_Mixin, Config_Mixin, Value_Mixin, DynamicTable_Mixin, Dico_Mixin, Clear_Mixin, Watchers_Mixin],
        data: function()
        {
            return {
                "is_repeater": true,
                "default_config": "tableRepeater"
            };
        },
        mounted: function()
        {
            //  CHECK IF DYNAMIC OR NOT
            if (typeof this.builded_config.dynamic !== "undefined")
            {
                this.$nextTick(
                    function()
                    {
                        this.loadExternalData(this.builded_config.dynamic.page);
                    });
            }
        },
        computed:
        {
            "colspanFooter": function()
            {
                return this.fieldsFormat.filter(function(o)
                {
                    if (o.fieldType != "nos") return o;
                }).length + 1;
            }
        }
    }
);