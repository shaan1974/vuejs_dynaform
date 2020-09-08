//	HELPER
Helper_extra = Vue.component(
    'Helper_extra',
    {
        template: Helper_template,
        mixins: [Labels_Mixin],
        props: ['helper', 'hclass'],
        data: function()
        {
            return {
                "base_css": ""
            };
        },
        mounted: function()
        {
            this.base_css = this.$root.config.helperCss;
        }
    }
);