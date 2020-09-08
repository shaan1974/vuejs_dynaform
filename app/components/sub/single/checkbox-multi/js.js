//	CHECKBOX MULTI

CheckboxMulti = Vue.component(
    'CheckboxMulti',
    {
        template: CheckboxMulti_template,
        props: ['labels', 'name', 'value', 'options', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'linkTo', 'config', 'styles', 'config'],
        mixins: [DynaForm_Mixin, Labels_Mixin, Dico_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin, DynaDic_Mixin],
        data: function()
        {
            return {
                "default_config": "checkboxMulti"
            };
        },
        methods:
        {
            "isChecked": function(c)
            {
                return (this.value.indexOf(c) != -1) ? true : false;
            },
            "updateChecboxValues": function(event, val)
            {
                var cV = this.value;

                if (event.target.checked === true)
                {
                    cV.push(val);
                }
                else
                {
                    var pI = cV.indexOf(val);
                    cV.splice(pI, 1);
                }

                this.setDataValue(cV, true);
            },
            /*
                CLICK ON BUTTON SELECT/UNSELECT ALL
            */
            "selectUnSelectAll": function($event)
            {
                if (this.value.length === this.i_options.length)
                {
                    this.setDataValue([], true);
                }
                else
                {
                    var v = this.i_options.map(function(o)
                    {
                        return o.v;
                    });
                    this.setDataValue(v, true);
                }
            }
        }
    }
);