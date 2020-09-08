//	AUTOCOMPLETE

Autocomplete = Vue.component(
    'Autocomplete',
    {
        template: Autocomplete_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Dico_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin, DynaDic_Mixin],
        props: ['labels', 'placeholder', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'options', 'behaviours', 'defaultValue', 'propStatus', 'styles', 'config'],
        data: function()
        {
            return {
                "menu_status": false,
                "nothing_found": false,
                "switch_input": "OFF",
                "search_value": "",
                "temp_value": "",
                "dirty": false,
                "default_config": "Autocomplete",
            };
        },
        computed:
        {
            "textualValue": function()
            {
                var that = this;

                if (this.value === "") return "";

                return this.i_options.filter(function(o)
                {
                    if (o.v === that.value) return o;
                })[0].t;
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
                        if (this.search_value.length < this.builded_config.minChar)
                        {
                            this.nothing_found = this.menu_status = false;
                        }
                        else
                        {
                            this.nothing_found = (this.$el.querySelectorAll("a[href]").length === 0) ? true : false;
                            this.menu_status = true;
                        }
                    }
                );
            },
            "initAutocomplete": function()
            {
                this.temp_value = this.value;
                this.dirty = false;

                //  SET VALUE EMPTY
                this.setDataValue("", true);

                //  SET SWITCH ON
                this.switch_input = "ON";

                //  SHOW MENU
                this.menu_status = true;

                //  SEARCH SEARCH VALUE TO EMPTY
                this.search_value = "";

                //  INIT EVENT FOR WINDOW SCROLL TO REMOVE CHOICE LIST ON SCREEN
                this.closeChoiceListOnScroll();

                this.$nextTick(
                    function()
                    {
                        var e = this.name + '_' + this.fieldUid + '_container_edit';
                        this.$el.querySelector("[name='" + e + "']").focus();
                    });
            },
            "setChoice": function(v)
            {
                //  SET VALUE EMPTY
                this.setDataValue(v, true);

                this.$nextTick(
                    function()
                    {
                        //  HIDE MENU
                        this.menu_status = false;

                        //  SET SWITCH OFF
                        this.switch_input = "OFF";
                    }
                );
            },
            "filterValue": function(t)
            {
                if (this.search_value.length < this.builded_config.minChar)
                {
                    return false;
                }

                var r = new RegExp('(' + this.search_value + ')', 'i');

                return (t.match(r) !== null) ? true : false;
            },
            "filterHtml": function(t)
            {
                var r = new RegExp('(' + this.search_value + ')', 'i');
                return t.replace(r, "<span class='autocomplete-found'>$1</span>");
            },
            "reset": function()
            {
                //  SET VALUE 
                this.setDataValue(this.temp_value, true);

                //  SET SWITCH ON
                this.switch_input = "OFF";

                //  HIDE MENU
                this.menu_status = false;
            },
            "closeChoiceListOnScroll": function()
            {
                var that = this;
                var fct = function(v)
                {
                    if (v.menu_status === true)
                    {
                        v.reset();
                    }
                };

                window.once(
                    ["scroll", "myScroll"],
                    fct.bind(null, that)
                );
            },
            "mouseLeaveComponent": function(e)
            {
                window.trigger("myScroll");
                this.nothing_found = false;
            }
        }
    }
);