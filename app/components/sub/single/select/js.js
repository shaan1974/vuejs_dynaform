//	SELECT
// 
/*event.preventDefault();
event.stopImmediatePropagation();
event.stopPropagation();
event.cancelBubble = true;*/

SelectList = Vue.component(
    'SelectList',
    {
        template: Select_template,
        props: ['labels', 'multi', 'options', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'size', 'behaviours', 'defaultValue', 'propStatus', 'linkTo', 'linkFrom', 'styles', 'config'],
        mixins: [DynaForm_Mixin, Labels_Mixin, Dico_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin, DynaDic_Mixin],
        data: function()
        {
            return {
                "tsize": this.size,
                "default_config": "SelectList"
            };
        },
        watch:
        {
            value: function(event)
            {
                if (typeof this.linkFrom !== "undefined")
                {
                    //  VARIABLES                    
                    var that = this;
                    var destType;
                    var path;

                    if (typeof this.key2 === "undefined")
                    {
                        destType = this.$parent.$children.filter(function(o)
                        {
                            if (o.name === "" + that.linkFrom + "") return o;
                        })[0];
                        path = this.getPath(this);
                    }
                    else
                    {
                        destType = this.$parent.$parent.$children.filter(function(o)
                        {
                            if (o.key3 === "" + that.linkFrom + "") return o;
                        })[0];
                        path = this.getPath(this);
                    }

                    //  CHECK TYPE TO KNOW HOW TO SET THE VALUE OF LINK ELEMENT
                    switch (destType.fieldType)
                    {
                        case "CheckboxMulti":
                        case "Radio":

                            if (destType.fieldType === "CheckboxMulti")
                            {
                                this.setValue(this.linkFrom, path, this, []);
                            }
                            else if (destType.fieldType === "Radio")
                            {
                                this.setValue(this.linkFrom, path, this, "");
                            }

                            //  IF VALUE IS MINUS 1, SO LINK ELEMENT IS HIDDEN
                            if (this.value === "-1")
                            {
                                destType.set_prop("HIDE");
                            }
                            else
                            {
                                destType.set_prop("SHOW");
                            }
                            break;
                        default:
                            this.setValue(this.linkFrom, path, this, '');
                    }
                }
            }
        },
        mounted: function()
        {
            if (this.multi === true)
            {
                if (this.size === "auto")
                {
                    this.tsize = this.i_options.length;
                }
            }
        },
        methods:
        {
            "isSelected": function(c)
            {
                return (this.value.indexOf(c) != -1) ? true : false;
            },
            /*
                UPDATE FOR SELECT MULTI
            */
            "updateSelectValues": function(event, val)
            {
                var vals = Array.prototype.slice.call(event.target.querySelectorAll("option")).filter(function(o)
                {
                    if (o.selected) return o;
                }).map(function(o)
                {
                    return o.value;
                });

                this.setDataValue(vals, true);
            }
        }
    }
);