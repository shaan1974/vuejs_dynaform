/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN VALIDATION

var Validation_Mixin = {

    computed:
    {
        i_validations: function()
        {
            return (typeof this.validations !== "undefined") ? this.getValidation(this.$root, this.validations) : [];
        }
    },
    data: function()
    {
        return {
            "validation_error": "",
        };
    },
    methods:
    {
        /*
            DISPLAY MODAL VALIDATION
        */
        dispayModalValidation: function()
        {
            this.$root.$refs["FORM-GENERATOR"].$refs["MODAL-VALIDATION"].visible = true;
        },
        /*
            GET VALIDATION
        */
        getValidation: function(root, val)
        {
            return (typeof root.validations_rules["" + val + ""] === "undefined") ? [] : root.validations_rules["" + val + ""];
        },
        /*
            CHANGE ICON VALIDATION
        */
        changeValidationIcon: function(z, that)
        {
            if (z === "RESET_FROM_TOOLBAR")
            {
                that.validationIconStatus = "";
                that.disabledSubmit = true;

            }
            else if (z === "RESET")
            {
                this.$root.$refs["FORM-GENERATOR"].$refs["TOOLBAR"].validationIconStatus = "";
                this.$root.$refs["FORM-GENERATOR"].$refs["TOOLBAR"].disabledSubmit = true;
            }
            else
            {
                var tErrors = this.$root.$refs["FORM-GENERATOR"].$refs["MODAL-VALIDATION"].validateLabelsReport.length;

                this.$root.$refs["FORM-GENERATOR"].$refs["TOOLBAR"].validationIconStatus = (tErrors === 0) ? "validation-status-no-error" : "validation-status-in-error";
                this.$root.$refs["FORM-GENERATOR"].$refs["TOOLBAR"].disabledSubmit = (tErrors === 0) ? false : true;
            }

            //  FORCE IS BUTTON VALIDATON IS NOT IN THE TOOLBAR
            //
            if (this.$root.config.toolbar.buttons.validation === false)
            {
                this.$root.$refs["FORM-GENERATOR"].$refs["TOOLBAR"].disabledSubmit = false;
            }
        },
        /*
            TRIGGER ATTACH ELEMENT(S)
        */
        manageTriggerAttachElements: function(cnt, el, binding, vnode, oVnode)
        {
            //  IF NAMESPACE ATTACH IS DEFINED DO NOTHING TO AVOID INFINITE LOOP
            if (oVnode.namespace === "attach")
            {
                return true;
            }

            var aElm = [].concat(binding.value[cnt].attach);
            var key2 = this.key2;
            var nElm = [];

            //  TAKE IN COUNT ONLY ELEMENT THAT ARE NOT RELATED TO CURRENT ONE "KEY2"
            for (var cnt2 = 0, len2 = aElm.length; cnt2 < len2; cnt2++)
            {
                cElm = aElm[cnt2].split(".");
                if (cElm[cElm.length - 1] !== key2)
                {
                    nElm.push(aElm[cnt2]);
                }
            }

            if (nElm.lenght === 0)
            {
                return;
            }

            //	--DEBUG_[ HAS ATTACH TRIGGER ELEMENTS ]
            if (this.$root.config.debugMode === true)
            {
                console.log("HAS ATTACH TRIGGER ELEMENT(S)...");
                console.log(nElm);
            }
            //	--/DEBUG_[ HAS ATTACH TRIGGER ELEMENTS ]

            for (var cnt3 = 0, len3 = nElm.length; cnt3 < len3; cnt3++)
            {
                // var ce = nElm[cnt3];
                // var ces = ce.match(/[.]{2}\/|\[\d+\].|\w+/gi);
                var ces = nElm[cnt3].match(/[.]{2}\/|\[\d+\].|\w+/gi);

                var be = vnode.context;
                var f;

                for (cnt4 = 0, len4 = ces.length; cnt4 < len4; cnt4++)
                {
                    if (ces[cnt4] === "../")
                    {
                        /*be = be.$parent;
                        if (be.key3 !== undefined)
                        {
                            be = be.$parent;
                        }*/

                        be = (typeof be.$parent.key3 !== "undefined") ? be.$parent.$parent : be.$parent;
                    }
                    else
                    {
                        /*
                        be = be.$children.find(function(o)
                        {
                            return o.key3 === "" + ces[cnt4] + "";
                        }).$children[0].$el.querySelector("[v]");
                        */

                        f = function(cee, o)
                        {
                            return o.key3 === "" + cee + "";
                        };

                        be = be.$children.find(f.bind(null, ces[cnt4])).$children[0].$el.querySelector("[v]");
                    }
                }

                //  TRIGGER ELEMENT WITH EVENT VALIDATE AND NAMESPACE ATTACH
                be.trigger("validate.attach");
            }
        }
    }
};