//	DROPDOWN

Dropdown_Clist = Vue.component(
    'Dropdown_Clist',
    {
        template: Dropdown_Clist_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Dico_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin, DynaDic_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'options', 'behaviours', 'defaultValue', 'propStatus', 'styles', 'config'],
        data: function()
        {
            return {
                "show": false,
                "default_config": "Dropdown_Clist"
            };
        },
        computed:
        {
            textValue: function()
            {
                var cV = this.value;

                var v = this.getDico(this.$root, this.options).filter(function(o)
                {
                    if (cV.indexOf((o.v)) !== -1)
                    {
                        return o;
                    }
                }).map(function(o)
                {
                    return o.t;
                });

                return v.join(", ");
            }
        },
        methods:
        {
            "ddclEvents": function()
            {
                var that = this;

                if (this.show === true)
                {
                    var onScroll = function(that, e)
                    {
                        that.show = false;
                        window.off(["scroll.cof", "resize.cof"]);
                    };

                    window.on(["scroll.cof", "resize.cof"], onScroll.bind(null, that));
                }
                else
                {
                    window.off(["scroll.cof", "resize.cof"]);
                }
            },
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
            }
        }
    }
);