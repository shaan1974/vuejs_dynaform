//	TOOLBAR

ToolBar = Vue.component(
    'ToolBar',
    {
        template: Toolbar_Template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Guideline_Mixin],
        data: function()
        {
            return {
                disabledSubmit: (this.$root.config.toolbar.buttons.validation === true) ? true : false,
                validationIconStatus: "",
                modalReset: false,
                topFixed: false,
                be: 0,
                isVisible: true,
                switchButtonVisible: true,
                showLg: false
            };
        },
        mounted: function()
        {
            if (this.$root.config.displayMode === true)
            {
                this.isVisible = false;
                return true;
            }

            this.switchButtonVisible = this.$root.config.toolbar.showGuidelinesSwitch;

            if (this.$root.config.toolbar.sticky)
            {
                //  GET HEIGHT OF TOOLBAR
                var elm = this.$el.querySelector(".card-body").getBoundingClientRect();
                this.be = elm.y + elm.height;
                window.on("scroll.sf", this.switchFixed);
            }

            //  GLOBAL CONFIG TO DEFINE IF TOOLBAR HAS TO BE VISIBLE OR NOT
            //
            if (this.$root.config.toolbar.included === false)
            {
                this.isVisible = false;
            }

            this.switchButtonVisible = !this.switchButtonVisible;
            this.switchButtonVisible = !this.switchButtonVisible;
        },
        computed:
        {
            customLabels: function(x)
            {
                return {
                    "BTN_RESET": this.getLabel(this.$root, "TB_RESET_BTN"),
                    "BTN_VALIDATE": this.getLabel(this.$root, "TB_VALIDATE_BTN"),
                    "BTN_SUBMIT": this.getLabel(this.$root, "TB_SUBMIT_BTN"),
                    "MODAL_RESET_TITLE": this.getLabel(this.$root, "TB_MODAL_RESET_TITLE"),
                    "MODAL_RESET_CONTENT": this.getLabel(this.$root, "TB_MODAL_RESET_CONTENT"),
                    "MODAL_RESET_BTN_ACTION": this.getLabel(this.$root, "TB_MODAL_RESET_BTN_ACTION"),
                    "MODAL_RESET_BTN_CANCEL": this.getLabel(this.$root, "TB_MODAL_RESET_BTN_CANCEL")
                };
            }
        },
        methods:
        {
            "switchFixed": function()
            {
                if (this.be < 0)
                {
                    var elm = this.$el.querySelector(".card-body").getBoundingClientRect();
                    this.be = elm.y + elm.height;
                }
                this.topFixed = (window.scrollY > this.be) ? true : false;
            },
            "actionReset": function()
            {
                this.$root.$refs["FORM-GENERATOR"].formData = JSON.parse(JSON.stringify(this.$root.$refs["FORM-GENERATOR"].formDataBackup));
                this.$root.$refs["FORM-GENERATOR"].status = false;

                this.$nextTick(
                    function()
                    {
                        this.$root.$refs["FORM-GENERATOR"].status = true;
                        this.changeValidationIcon("RESET_FROM_TOOLBAR", this);
                        _Qs("body").classList.remove("html-modal");
                    });
            },
            "resetForm": function()
            {
                _Qs("body").classList.add("html-modal");
                this.modalReset = true;
            },
            "validate": function()
            {
                //  RESET ERROR LABEL REPORT CONTAINER ARRAY
                this.resetErrorMessages();

                //  GEL ALL ELEMENTS THAT HAVE VALIDATION
                var vElms = Array.prototype.slice.call(this.$root.$el.querySelectorAll("[v='v']"));

                //  LOOP AND TRIGGER VALIDATE EVENT
                for (var cnt = 0, len = vElms.length; cnt < len; cnt++)
                {
                    vElms[cnt].trigger("validate");
                }

                //  NEXT TICK SHOW MODAL AND CHANGE ICON VALIDATIONS STATUS
                this.$nextTick(
                    function()
                    {
                        //  DISPLAY MODAL WITH VALIDATION STATUS 
                        this.dispayModalValidation();

                        //  ICON VALIDATIONS STATUS
                        this.changeValidationIcon();
                    });
            },
            "submit": function()
            {
                var data = JSON.stringify(this.$root.$refs["FORM-GENERATOR"].formData, undefined, 4);

                //	--DEBUG_[ display final json ]
                if (this.$root.config.debugMode === true)
                {
                    console.log(data);
                }
                //	--/DEBUG_[ display final json ]                                
                alert("submit...");
            },
            "changeLg": function(o)
            {
                //  VAR
                //
                var that = this;

                //  DISPLAY LOADER
                //
                that.$root.$refs["FORM-GENERATOR"].$refs["MODAL-LOAD"].visible = true;

                //  SET MODEL
                //
                this.showLg = false;
                this.$root.config.lg.short = o.lg;
                this.$root.config.lg.short_lbl = o.lbl;
                this.$root.config.lg.short_icon = o.icon;

                //  LOAD RELATED LABELS ( DEDICATE + SYSTEM )

                var one = o.file;
                var two = "app/_data/_system/labels_" + this.$root.config.lg.short.toLowerCase() + ".js";
                var requestDedicate = axios.get(one);
                var requestSystem = axios.get(two);

                axios.all([requestDedicate, requestSystem]).then(axios.spread(function()
                {
                    var responseOne = arguments.length <= 0 ? undefined : arguments[0];
                    var responseTwo = arguments.length <= 1 ? undefined : arguments[1];

                    //	--DEBUG_[ langue response ]
                    if (that.$root.config.debugMode === true)
                    {
                        console.log(responseOne, responseTwo);
                    }
                    //	--/DEBUG_[ langue response ]

                    var r1 = responseOne.data.replace("var app_labels = ", "").slice(0, -1);
                    r1 = r1.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
                    r1 = JSON.parse(r1);

                    var r2 = responseTwo.data.replace("var app_system_labels = ", "").slice(0, -1);
                    r2 = r2.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
                    r2 = JSON.parse(r2);

                    app_labels = Object.assign(r1, r2);

                    that.$root.labels = app_labels;

                    setTimeout(
                        function(a)
                        {
                            a.$root.$refs["FORM-GENERATOR"].$refs["MODAL-LOAD"].visible = false;
                        }, 1500, that
                    );

                })).catch(function(errors)
                {
                    // react on errors.
                    console.error(errors);
                });

            }
        }
    }
);