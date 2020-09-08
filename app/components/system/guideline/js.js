//	GUIDELINE

Guideline_extra = Vue.component(
    'Guideline_extra',
    {
        template: Guideline_extra_template,
        mixins: [Labels_Mixin],
        props: ['guideline', 'reff', 'col'],
        data: function()
        {
            return {
                waza: false
            };
        },
        mounted: function()
        {
            //  VARIABLES
            var that = this;

            //  ATTACH EVENT TO PARENT
            this.$root.$refs["FORM-GENERATOR"].$on("SHOW_GUIDLINES", this.$root.$refs["FORM-GENERATOR"].showGuidelines.bind(null, that));
            this.$root.$refs["FORM-GENERATOR"].$on("HIDE_GUIDLINES", this.$root.$refs["FORM-GENERATOR"].hideGuidelines.bind(null, that));
        }
    }
);