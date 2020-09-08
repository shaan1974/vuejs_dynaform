/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */

new Vue(
{
    el: '#app',
    components:
    {
        'FormGenerator': FormGenerator
    },
    data:
    {
        formData: app_formData,
        schema: app_schema,
        labels: app_labels,
        dictionnaries: app_dictionnaries,
        validations_rules: app_validations,
        config: app_config,
        propStatus: app_prop_status,
        behaviours_rules: app_behaviour
    },

    mounted: function()
    {
        //	--DEBUG_[ index mounted ]
        if (this.$root.config.debugMode === true)
        {
            console.log("INDEX - MOUNTED");
        }
        //	--/DEBUG_[ index mounted ]

        if (__isMsie)
        {
            setTimeout(
                function()
                {
                    window.cssVars();
                }, 1000
            );
        }
    }
});