var Clear_Cc_Mixin = {

    methods:
    {
        /*  ___         TextInput                                           */
        "clearContentCc_TextInput": function()
        {
            this.r = (this.value === "");
        },
        /*  ___         Currency                                            */
        "clearContentCc_Currency": function()
        {
            this.r = (this.value === "");
        },
        /*  ___         Cof                                                 */
        "clearContentCc_Cof": function()
        {
            this.r = (this.value === "");
        },
        /*  ___         NumberInput                                         */
        "clearContentCc_NumberInput": function()
        {
            this.r = (this.value === "");
        },
        /*  ___         PasswordInput                                       */
        "clearContentCc_PasswordInput": function()
        {
            this.r = (this.value === "");
        },
        /*  ___         ColorPicker                                         */
        "clearContentCc_ColorPicker": function()
        {
            this.r = (this.value === "");
        },
        /*  ___         Datepicker                                          */
        "clearContentCc_Datepicker": function()
        {
            this.r = (this.value === "");
        },
        /*  ___         MultiComplete                                       */
        "clearContentCc_MultiComplete": function()
        {
            this.r = (this.search_value === "");
        },
    }
};

//  MERGE THIS MIXIN WITH THE MAIN ONE
//
Clear_Mixin.methods = Object.assign(Clear_Mixin.methods, Clear_Cc_Mixin.methods);