//	DROPDOWN

Dropdown = Vue.component(
    'Dropdown',
    {
        template: Dropdown_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Dico_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin, DynaDic_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'options', 'behaviours', 'defaultValue', 'propStatus', 'styles', 'config'],
        data: function()
        {
            return {
                "show": false,
                "default_config": "Dropdown"
            };
        },
        computed:
        {
            textValue: function()
            {
                var cV = this.value;

                v = this.getDico(this.$root, this.options).filter(function(o)
                {
                    if (o.v === cV)
                    {
                        return o;
                    }
                }).map(function(o)
                {
                    return o.t;
                });
                return v[0];
            }
        },
        methods:
        {
            "set": function(v)
            {
                this.setDataValue(v, true);
                this.$el.querySelector("[mode='DROPDOWN']").focus();
                this.show = false;
            }
        }
    }
);