//  NUMBER

NumberInput = Vue.component(
    'NumberInput',
    {
        template: Number_template,
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'config', 'styles'],
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Helper_Mixin, Value_Mixin, Event_Mixin, Config_Mixin, Clear_Mixin, Watchers_Mixin],
        data: function()
        {
            return {
                "default_config": "inputTypeNumber"
            };
        },
        methods:
        {
            "checkNumber": function(e)
            {
                var elm = e.target;

                if (elm.value != "")
                {
                    if (parseInt(elm.value) < parseInt(elm.min))
                    {
                        elm.value = elm.min;
                    }
                    else if (parseInt(elm.value) > parseInt(elm.max))
                    {
                        elm.value = elm.max;
                    }

                    this.setDataValue(elm.value, true);
                }
            },
            "btnClick": function(a)
            {
                var cv = parseFloat(this.$el.querySelector("[type='number']").value) + ((a === "UP") ? 1 : -1);

                this.setDataValue(cv, true);

                this.$nextTick(
                    function()
                    {
                        this.$el.querySelector("[type='number']").trigger("change");
                    });
            },
            "rollNumber": function(e)
            {
                if (e.deltaY > 0)
                {
                    this.btnClick("DN");
                }
                else
                {
                    this.btnClick("UP");
                }
                event.preventDefault();
            }
        }
    }
);