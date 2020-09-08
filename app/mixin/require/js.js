//	MIXIN
// [validation_error , requireClass() ? 'require' : '']

var Require_Mixin = {

    methods:
    {
        requireClass: function()
        {
            //  IF CONFIG SAID NO REQUIRE CLASS WE DON'T DISPLAY IT
            if (this.$root.config.requireClass === false)
            {
                return false;
            }

            return (this.i_validations.length != 0) ? true : false;
        }
    }
};