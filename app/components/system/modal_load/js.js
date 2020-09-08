//	MODAL - LOAD
/*
    _Qs("#app").__vue__.$refs["FORM-GENERATOR"].$refs["MODAL-LOAD"].visible=true;
    _Qs("#app").__vue__.$refs["FORM-GENERATOR"].$refs["MODAL-LOAD"].visible=false;
*/

Modal_Load_template_extra = Vue.component(
    'Modal_Load_template_extra',
    {
        template: Modal_Load_template,
        mixins: [Labels_Mixin],
        data: function()
        {
            return {
                visible: false,
                mode: "classic" // classic,ripple,fb,fountain,cube,atom,spin-box,catching-up
            };
        },
        watch:
        {
            visible: function()
            {
                var action = ((this.visible === true) ? "add" : "remove");
                document.body.classList[action]("modal-open");
                document.body.classList[action]("html-modal");
            }
        }
    }
);