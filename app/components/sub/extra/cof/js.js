//	COF

Cof = Vue.component(
    'Cof',
    {
        template: Cof_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Dico_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Clear_Mixin, Watchers_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'options', 'behaviours', 'defaultValue', 'propStatus', 'behaviours', 'styles', 'config'],
        data: function()
        {
            return {
                "menu_status": false,
                "default_config": "Cof"
            };
        },
        methods:
        {
            "cofEvents": function()
            {
                var that = this;

                if (this.menu_status === true)
                {
                    var onScroll = function(that, e)
                    {
                        that.menu_status = false;
                        window.off(["scroll.cof", "resize.cof"]);
                    };

                    window.on(["scroll.cof", "resize.cof"], onScroll.bind(null, that));
                }
                else
                {
                    window.off(["scroll.cof", "resize.cof"]);
                }
            },
            "set": function(v)
            {
                this.$el.querySelector("[mode='COF']").focus();
                this.setDataValue(v, true);
            }
        }
    }
);