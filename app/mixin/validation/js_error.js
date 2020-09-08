var Validation_Errors_Mixin = {

    methods:
    {
        /*
            PUSH ERROR INTO GLOBAL ERROR ARRAY
        */
        pushError: function(e)
        {
            // this.$root.$refs["FORM-GENERATOR"].$refs["MODAL-VALIDATION"].validateLabelsReport.push(n_current_error_label);

            if (this.$root.$refs["FORM-GENERATOR"].$refs["MODAL-VALIDATION"].validateLabelsReport.indexOf("" + e + "") === -1)
            {
                this.$root.$refs["FORM-GENERATOR"].$refs["MODAL-VALIDATION"].validateLabelsReport.push(e);
            }
        },
        /*
            RESET GLOBAL ERROR ARRAY
        */
        resetErrorMessages: function()
        {
            this.$root.$refs["FORM-GENERATOR"].$refs["MODAL-VALIDATION"].validateLabelsReport = [];
        },
        /*
            MANAGE ERROR
        */
        manageError: function(error_if, error_class, rev, context, error_label)
        {
            if (error_if === rev)
            {
                //	--DEBUG_[ ERROR ]
                if (this.$root.config.debugMode === true)
                {
                    console.log("__ERROR");
                }
                //	--/DEBUG_[ ERROR ]

                context.validation_error = error_class;
                // context.is_in_error = true;
                context.error_label = error_label;
                return "stop";
            }
            else
            {
                //	--DEBUG_[ ERROR ]
                if (this.$root.config.debugMode === true)
                {
                    console.log("__NO-ERROR");
                }
                //	--/DEBUG_[ ERROR ]

                context.validation_error = "";
                // context.is_in_error = false;
                context.error_label = "";
                return "continue";
            }
        }
    }
};

//  MERGE THIS MIXIN WITH THE MAIN ONE
//
Validation_Mixin.methods = Object.assign(Validation_Mixin.methods, Validation_Errors_Mixin.methods);