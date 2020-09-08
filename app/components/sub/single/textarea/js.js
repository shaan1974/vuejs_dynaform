//	TEXTAREA

TextArea = Vue.component(
    'TextArea',
    {
        template: TextArea_template,
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'autogrow', 'fieldType', 'maxlength', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'config', 'styles'],
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin],
        data: function()
        {
            return {
                "limit_warning": false,
                "default_config": "textArea"
            };
        },
        watch:
        {
            "limit_warning": function()
            {
                if (this.limit_warning === true)
                {
                    this.setDataValue("", false);
                }
            }
        },
        computed:
        {
            i_autogrow: function()
            {
                return (typeof this.autogrow === "undefined") ?
                {} :
                {
                    'min-height': this.autogrow.min,
                    'max-height': this.autogrow.max
                };
            },
            i_maxlength: function()
            {
                return (typeof this.maxlength === "undefined") ?
                {} :
                {
                    'max': this.maxlength.max,
                    'counter': this.maxlength.counter,
                    'overlap': this.maxlength.overlap
                };
            }
        },
        methods:
        {
            "clear": function(c)
            {
                this.limit_warning = false;
                this.$el.querySelector("textarea").value = "";
                this.setDataValue("", true);
                this.eventTrigger(this.$el.querySelector("textarea"), 'resetCounter');
                this.$el.querySelector("textarea").focus();
            },
            "updateTextArea": function(e)
            {
                if (this.limit_warning === false)
                {
                    this.setDataValue(e.target.value, false);
                }
            },
            "pasteEvent": function(e)
            {
                if (this.builded_config.paste === false)
                {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }
        }
    }
);