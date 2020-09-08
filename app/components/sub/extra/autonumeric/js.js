/*	
    AUTONUMERIC INPUT
    http://autonumeric.org/examples
    http://autonumeric.org/configurator

    AUTONUMERIC CONFIG IS SET WITH EMPTY BECAUSE THE AUTONUMERIC IN CONFIG PART CONTAIN AN OBJECT WITH DIFFERENTS CONFIG.
*/
AutoNumericInput = Vue.component(
    'AutoNumericInput',
    {
        template: AutoNumericInput_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'config', 'styles'],
        data: function()
        {
            return {
                "an": "",
                "an_value": "",
                "an_config":
                {},
                "d_value": "",
                "default_config": "empty_config",
            };
        },
        mounted: function()
        {
            this.an_value = this.value;

            this.$nextTick(
                function()
                {
                    //  CHECK IF CONFIG IS DEFINED AS OBJECT OR STRING RELATED TO OBJECT
                    this.an_config = (typeof this.config.custom === "string") ? this.$root.config.autonumeric["" + this.config.custom + ""] : this.config.custom;
                    this.an = new AutoNumeric(this.$el.querySelector(".autonumeric"), this.an_config);
                    this.d_value = this.$el.querySelector(".autonumeric").value;
                }
            );
        },
        methods:
        {
            "setAn": function()
            {
                this.setDataValue(this.an.rawValue, true);
                this.an_value = this.an.lastVal;
            },
            "destroy": function()
            {
                this.an.unformat();
                this.an.remove();
            }
        }
    }
);