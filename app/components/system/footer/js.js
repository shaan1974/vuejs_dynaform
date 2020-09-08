//	TOOLBAR

Footer = Vue.component(
    'Footer',
    {
        template: Footer_Template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Guideline_Mixin],
        computed:
        {
            year: function()
            {
                return moment().year();
            },
            display: function()
            {
                return this.$root.config.footer;
            },
            customLabels: function(x)
            {
                return {
                    "FOOTER_TEXT": this.getLabel(this.$root, "FOOTER_TEXT")
                };
            }
        }
    }
);