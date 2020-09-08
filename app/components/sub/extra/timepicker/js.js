//	TIMEPICKER
//  https://github.com/luncheon/clocklet

Timepicker = Vue.component(
    'Timepicker',
    {
        template: Timepicker_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Dico_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Clear_Mixin, Watchers_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'config', 'styles'],
        data: function()
        {
            return {
                builded_config:
                {},
                css_config:
                {},
                default_config: "timePicker"
            };
        },
        methods:
        {
            "focus": function(e)
            {
                var baseElm = this.$el.querySelector("[mode='TIME']");

                if (_Qsa(".clocklet--shown").length === 0)
                {
                    clocklet.open(baseElm);
                }
                else
                {
                    clocklet.close(baseElm);
                }
            },
            "tpFocus": function()
            {
                var that = this;

                window.off(["scroll.tp", "resize.tp"]);

                var onScroll = function(that, e)
                {
                    that.$el.querySelector("[mode='TIME']").blur();
                    window.off(["scroll.tp", "resize.tp"]);
                };

                window.on(["scroll.tp", "resize.tp"], onScroll.bind(null, that));
            },
            "tpBlur": function()
            {
                window.off(["scroll.tp", "resize.tp"]);
            },
            "emptyTime": function(e)
            {
                this.$el.querySelector("[mode='TIME']").value = "";
                this.setDateValue("");
            },
            "setDateValue": function(v)
            {
                this.setDataValue(v, true);
            }
        }
    }
);