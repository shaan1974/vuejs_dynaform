//	MIXIN - CLEAR
//
var Clear_Mixin = {

    mounted: function()
    {
        this.clearClass();
    },
    data: function()
    {
        return {
            fadeIn: "",
            fadeOut: "m-fadeOut",
            v: "",
            s: "",
            r: ""
        };
    },
    watch:
    {
        "value": function()
        {
            this.clearClass();
        }
    },
    methods:
    {
        /*
            MAIN
        */
        "clearContent": function()
        {
            //  GET CONTENT
            //
            if (this["clearContentGet_" + this.fieldType] !== undefined)
            {
                this["clearContentGet_" + this.fieldType]();
            }

            //  SET CONTENT
            //
            if (this["clearContentSet_" + this.fieldType] !== undefined)
            {
                this["clearContentSet_" + this.fieldType]();
            }

            this.s.focus();

            //  SET PATCH
            //
            if (this["clearContentPatch_" + this.fieldType] !== undefined)
            {
                this["clearContentPatch_" + this.fieldType]();
            }

            this.clearClass();
        },
        "clearClass": function()
        {
            if (this["clearContentCc_" + this.fieldType] !== undefined)
            {
                this["clearContentCc_" + this.fieldType]();
            }

            if (this.r)
            {
                this.fadeIn = "";
                this.fadeOut = "m-fadeOut";
            }
            else
            {
                this.fadeIn = "m-fadeIn";
                this.fadeOut = "";
            }
        }
    }
};