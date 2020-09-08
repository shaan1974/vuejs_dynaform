var Prop_Status_Display_Mixin = {

    methods:
    {
        /*
            isDisplayMode
        */
        isDisplayMode: function()
        {
            /*  CHECK IF ELEMENT ITSELF IS IN DISPLAY MODE */
            if (typeof this.config !== "undefined")
            {
                if (this.config.displayMode === true)
                {
                    return true;
                }
            }
            /*  IF NOT WE TAKE IN COUNT THE GLOBAL CONFIG */
            return (this.$root.config.displayMode === true) ? true : false;
        },
        isNotDisplayMode: function()
        {
            /*  CHECK IF ELEMENT ITSELF IS IN DISPLAY MODE */
            if (typeof this.config !== "undefined")
            {
                if (this.config.displayMode === true)
                {
                    return false;
                }
            }
            /*  IF NOT WE TAKE IN COUNT THE GLOBAL CONFIG */
            return (this.$root.config.displayMode === false) ? true : false;
        }
    }
};

//  MERGE THIS MIXIN WITH THE MAIN ONE
//
Prop_Status_Mixin.methods = Object.assign(Prop_Status_Mixin.methods, Prop_Status_Display_Mixin.methods);