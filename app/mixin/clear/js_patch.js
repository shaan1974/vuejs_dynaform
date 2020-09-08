var Clear_Patch_Mixin = {

    methods:
    {
        /*  ___         Timepicker                                         */
        "clearContentPatch_Timepicker": function()
        {
            var baseElm = this.$el.querySelector("[mode='TIME']");
            setTimeout
                (
                    function()
                    {
                        clocklet.close(baseElm);
                    }, 10
                );
        }
    }
};

//  MERGE THIS MIXIN WITH THE MAIN ONE
//
Clear_Mixin.methods = Object.assign(Clear_Mixin.methods, Clear_Patch_Mixin.methods);