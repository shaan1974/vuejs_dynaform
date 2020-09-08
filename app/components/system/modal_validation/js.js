//	MODAL
/*
$0.__vue__.$refs["FORM-GENERATOR"].$refs["MODAL-VALIDATION"].visible=true
*/

Modal_Validation_template_extra = Vue.component(
    'Modal_Validation_template_extra',
    {
        template: Modal_Validation_template,
        mixins: [Labels_Mixin],
        data: function()
        {
            return {
                visible: false,
                validateLabelsReport: []
            };
        },
        computed:
        {
            errorMessages: function()
            {
                // return this.$root.$refs["FORM-GENERATOR"].$refs["MODAL-VALIDATION"].validateLabelsReport;

                //  SORT ERROR MESSAGE AND REMOVE THE ONE WHO HAVE SAME PARENT ELEMENT AND RULE NAME
                var z = this.$root.$refs["FORM-GENERATOR"].$refs["MODAL-VALIDATION"].validateLabelsReport;
                var ex = [];
                var gm = [];
                for (cnt = 0, len = z.length; cnt < len; cnt++)
                {
                    m = z[cnt].split("|")[1];
                    k = z[cnt].split("|")[0].split("^");

                    if (k.length === 3)
                    {
                        q = k[0] + "-" + k[1]; // + "-" + k[2];

                        if (gm.indexOf(q) === -1)
                        {
                            gm.push(q);
                            ex.push(m);
                        }
                    }
                    else
                    {
                        ex.push(m);
                    }
                }

                return ex;
            },
            customLabels: function(x)
            {
                return [
                    this.getLabel(this.$root, "MODAL_VALIDATION_TITLE"),
                    this.getLabel(this.$root, "MODAL_VALIDATION_CLOSE_BTN"),
                    this.getLabel(this.$root, "MODAL_VALIDATION_NO_ERRRORS"),
                    this.getLabel(this.$root, "MODAL_VALIDATION_ERRRORS"),
                    this.getLabel(this.$root, "MODAL_VALIDATION_ERRROR")
                ];
            }
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