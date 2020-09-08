var Clear_Set_Mixin = {

    methods:
    {
        /*  ___         TextInput                                           */
        "clearContentSet_TextInput": function()
        {
            this.setDataValue(this.v, true);
        },
        /*  ___         Currency                                            */
        "clearContentSet_Currency": function()
        {
            this.setDataValue(this.v, true);
        },
        /*  ___         Cof                                                 */
        "clearContentSet_Cof": function()
        {
            this.setDataValue(this.v, true);
        },
        /*  ___         NumberInput                                         */
        "clearContentSet_NumberInput": function()
        {
            this.setDataValue(this.v, true);
        },
        /*  ___         PasswordInput                                       */
        "clearContentSet_PasswordInput": function()
        {
            this.setDataValue(this.v, true);
        },
        /*  ___         Timepicker                                          */
        "clearContentSet_Timepicker": function()
        {
            this.setDataValue(this.v, true);
        },
        /*  ___         MultiComplete                                       */
        "clearContentSet_MultiComplete": function()
        {
            this.search_value = "";
            this.menu_status = false;
        },
        /*  ___         Datepicker                                          */
        "clearContentSet_Datepicker": function()
        {
            // this.setDateValue("");
            this.setDateValue(this.v);
        },
        /*  ___         ColorPicker                                          */
        "clearContentSet_ColorPicker": function()
        {
            this.d_color = "";
            // this.setDataValue("", true);
            this.setDataValue(this.v, true);
        },
    }
};

//  MERGE THIS MIXIN WITH THE MAIN ONE
//
Clear_Mixin.methods = Object.assign(Clear_Mixin.methods, Clear_Set_Mixin.methods);