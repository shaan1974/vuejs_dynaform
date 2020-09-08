//	COF

MultiComplete = Vue.component(
    'MultiComplete',
    {
        template: MultiComplete_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Dico_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Clear_Mixin, Config_Mixin, Watchers_Mixin, DynaDic_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'options', 'behaviours', 'defaultValue', 'propStatus', 'behaviours', 'config', 'styles'],
        data: function()
        {
            return {
                "menu_status": false,
                "search_value": "",
                "nothing_found": false,
                "cnt": 0,
                "default_config": "multiComplete"
            };
        },
        mounted: function()
        {
            //  SET LABEL FOR MAX
            this.builded_config.maxLabel = this.getLabel(this.$root, "" + this.builded_config.maxLabel + "");
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
            "keyUp": function(e)
            {
                this.search_value = e.currentTarget.value;

                this.$nextTick(
                    function()
                    {
                        if (this.search_value.length < 3)
                        {
                            this.nothing_found = this.menu_status = false;
                        }
                        else
                        {
                            this.nothing_found = (this.$el.querySelectorAll("a[href]").length === 0) ? true : false;
                            this.menu_status = true;

                            //  TO CLOSE SEARCH BLOCK IF EVENT SCROLL OR RESIZE
                            var that = this;
                            var fct = function(v)
                            {
                                if (v.menu_status === true)
                                {
                                    v.menu_status = false;
                                }
                            };

                            window.once(
                                ["scroll", "resize"],
                                fct.bind(null, that)
                            );
                        }
                    }
                );
            },
            "filterValue": function(t, v)
            {
                if (this.search_value.length < 3)
                {
                    this.fadeIn = "";
                    this.fadeOut = "m-fadeOut";
                    return false;
                }

                this.fadeIn = "m-fadeIn";
                this.fadeOut = "";

                //  IF V IS NOT YET INTO VALUE LIST
                if (this.value.indexOf(v) !== -1)
                {
                    return false;
                }

                //  IF SEARCH VALUE IS INSIDE T
                var r = new RegExp('(' + this.search_value + ')', 'i');

                return (t.match(r) !== null) ? true : false;
            },
            "filterHtml": function(t)
            {
                var r = new RegExp('(' + this.search_value + ')', 'i');
                return t.replace(r, "<span class='autocomplete-found'>$1</span>");
            },
            "setChoice": function(v)
            {
                //  EMPTY SEARCH VALUE
                this.search_value = "";

                var nv = [].concat(this.value);
                nv.push(v);
                nv.sort();

                //  SET VALUE EMPTY
                this.setDataValue(nv, true);

                //  HIDE MENU
                this.$nextTick(
                    function()
                    {
                        //  HIDE MENU
                        this.menu_status = false;
                    }
                );
            },
            "itemPosition": function(v)
            {
                return this.value.indexOf(v);
            },
            "removeItem": function(pI, e)
            {
                if (this.builded_config.animation === false)
                {
                    this.value.splice(pI, 1);
                    this.$el.querySelector("[mode='M_COMPLETE']").focus();
                    this.$el.querySelector("[mode='M_COMPLETE']").blur();
                }
                else
                {
                    var that = this;
                    var endTransition = function(t, p)
                    {
                        t.value.splice(p, 1);
                        that.$el.querySelector("[mode='M_COMPLETE']").focus();
                        that.$el.querySelector("[mode='M_COMPLETE']").blur();
                    };

                    e.target.parentNode.once(["transitionend"], endTransition.bind(null, that, pI));
                    e.target.parentNode.classList.add("m-fadeOut");
                }

                this.disabled = false;
            },
            "isChecked": function(c)
            {
                return (this.value.indexOf(c) != -1) ? true : false;
            },
            "maxReach": function()
            {
                if (this.builded_config.max === false)
                {
                    this.builded_config.max = Number.MAX_SAFE_INTEGER;
                }

                return (this.value.length < this.builded_config.max) ? true : false;
            }
        }
    }
);