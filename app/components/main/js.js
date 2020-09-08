/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	FORM GENERATOR
/*
    VARIABLES :

        - fullyLoaded : true/false
        IT'S USE TO KNOW IF APPLICATION IF FULLY LOAD OR NOT.        
        TO GRAD IT : this.$root.$refs["FORM-GENERATOR"].fullyLoaded
*/
FormGenerator = Vue.component(
    'FormGenerator',
    {
        template: FormGenerator_template,
        props: ["schema", "value"],
        mixins: [Validation_Mixin, Guideline_Mixin, Event_Mixin],
        data: function()
        {
            return {
                formData: this.value ||
                {},
                status: true,
                formDataBackup:
                {},
                overlay: false,
                fullyLoaded: false
            };
        },
        mounted: function()
        {
            //  COPY THE STARTING JSON INTO A BACKUP VAR. IN THIS CASE WE CAN REVERT THE ENTITRE FROM WITH THE BUTTON RESET FROM TOOLBAR
            //
            this.formDataBackup = JSON.parse(JSON.stringify(this.formData));

            //  SET DEBUG ON MAIN CONTAINER
            //
            if (this.$root.config.debugMode === true)
            {
                this.$el.parentNode._addClass("debug");
            }

            //  SET FLAG TO KNOW IF INSTANCE IS FULLY LOADED OR NOT
            //
            var that = this;
            var fctVueLoad = function(that)
            {
                //	--DEBUG_[ loaded ]
                if (that.$root.config.debugMode === true)
                {
                    console.log("loaded");
                }
                //	--/DEBUG_[ loaded ]
                that.fullyLoaded = true;

                //  REMOVE FOCUS ON ANY INPUT AND SET IT TO WINDOW
                //
                if (document.activeElement)
                {
                    document.activeElement.blur();
                }
                window.focus();

                //  SCROLL ON PAGE TOP
                //
                setTimeout(
                    function()
                    {
                        // console.log("scroll");
                        window.scrollTo(0, 0);
                    }, 10
                );
            };
            window.on("load.vue", fctVueLoad.bind(null, that));
        },
        methods:
        {
            /*
                TO CHECK IF TYPE IS IN OPTION ARRAY "group"
                USE IN MAIN TEMPLATE AND REPEATER TEMPLATE
            */
            isInlist: function(e, l)
            {
                return (l.indexOf(e) !== -1) ? true : false;
            },
            /*
                MAIN PLACE TO UPDATE DATA INTO JSON
                - DATA COULD BE ON THE SAME LEVEL SO R IS UNDEFINED AND WE ARE ON ROOT LEVEL
                - DATA IS NOT ON THE SAME LEVEL SO R IS OS DEFINED AND WE USE THIS POINT AS ROOT
            */
            updateForm: function(fieldName, value, r)
            {
                //  RESET ICON VALIDATION IN TOOLBAR
                // this.changeValidationIcon("RESET");

                //	--DEBUG_[ display value ]
                if (this.$root.config.debugMode === true)
                {
                    console.log('%c MAIN-UDPATE-VALUE! ', 'background: #222; color: #bada55');
                    console.log(arguments);
                }
                //	--/DEBUG_[ display value ]

                if (typeof r === "undefined")
                {
                    //  IF CURRENT VALUE INSIDE DATA IS A NUMBER
                    /*if (this.formData["" + fieldName + ""].constructor.toString().indexOf("Number()") != -1)
                    {
                        value = new Number(value).valueOf();
                    }*/
                    this.$set(this.formData, fieldName, value);
                }
                else
                {
                    //  IF CURRENT VALUE INSIDE DATA IS A NUMBER
                    /*if (r["" + fieldName + ""].constructor.toString().indexOf("Number()") != -1)
                    {
                        value = new Number(value).valueOf();
                    }*/
                    this.$set(r, fieldName, value);
                }

                this.$emit("input", this.formData);

                //  RESET ICON VALIDATION IN TOOLBAR
                this.changeValidationIcon("RESET");
            },
            /*
                WHEN INTERNALS
            */
            updateProp: function(t)
            {
                //	--DEBUG_[ udpate prop ]
                if (this.$root.config.debugMode === true)
                {
                    console.log('%c MAIN-UDPATE-PROP! ', 'background: #222; color: #bada55');
                    console.log("THIS");
                    console.log(this);
                    console.log("ARGUMENTS");
                    console.log(arguments);
                    console.log("**************************");
                }
                //	--/DEBUG_[ udpate prop ]
                // this.$set(t, "options", "ALPHA_LIST");
                // this.$set(t, "status_ability", false);
                // this.$set(t, "menu_status", false);
                // this.$set(t, "z_options", t.x);
                this.$set(t, t.prop_name, t.prop_value);
            }
        }
    }
);