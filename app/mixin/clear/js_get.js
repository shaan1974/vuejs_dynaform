var Clear_Get_Mixin = {

    methods:
    {
        /*  ___         TextInput                                           */
        "clearContentGet_TextInput": function()
        {
            this.v = "";
            this.s = this.$el.querySelector("input");
        },
        /*  ___         MultiComplete                                       */
        "clearContentGet_MultiComplete": function()
        {
            this.v = "";
            this.s = this.$el.querySelector("input");
        },
        /*  ___         Cof                                                  */
        "clearContentGet_Cof": function()
        {
            this.v = "";
            this.s = this.$el.querySelector("input");
        },
        /*  ___         PasswordInput                                        */
        "clearContentGet_PasswordInput": function()
        {
            this.v = "";
            this.s = this.$el.querySelector("input");
        },
        /*  ___         Timepicker                                           */
        "clearContentGet_Timepicker": function()
        {
            this.v = "";
            this.s = this.$el.querySelector("input");
        },
        /*  ___         Currency                                             */
        "clearContentGet_Currency": function()
        {
            this.v = "0";
            this.s = this.$el.querySelector("input");
        },
        /*  ___         NumberInput                                          */
        "clearContentGet_NumberInput": function()
        {
            this.v = this.n_config.minValue;
            this.s = this.$el.querySelector("input");
        },
        /*  ___         Datepicker                                           */
        "clearContentGet_Datepicker": function()
        {
            this.v = "";
            this.activeDay = "";
            this.$el.querySelector("input[mode = 'DATE']").value = "";
            this.s = this.$el.querySelector("input[mode = 'DATE']");
            this.active = false;
        },
        /*  ___         ColorPicker                                          */
        "clearContentGet_ColorPicker": function()
        {
            this.v = "";
            this.s = this.$el.querySelector("input.color-input-value");
        }
    }
};

//  MERGE THIS MIXIN WITH THE MAIN ONE
//
Clear_Mixin.methods = Object.assign(Clear_Mixin.methods, Clear_Get_Mixin.methods);