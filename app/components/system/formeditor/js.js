/*
    http://jsfiddle.net/xhinking/nno4u9gw/
*/
//	FORM EDITOR
//
//  document.querySelector("#app").__vue__.$refs["FORM-GENERATOR"].formData
//  document.querySelector("#app").__vue__.$refs["FORM-GENERATOR"].schema
// 
Formeditor = Vue.component(
    'Formeditor',
    {
        template: Formeditor_Template,
        mixins: [DynaForm_Mixin, Labels_Mixin],
        props: ['ss'],
        data: function()
        {
            return {
                baseDragItem: null,
                baseDragElement: null,
                dragOk: null,
                dragDisabled: false
            };
        },
        mounted: function() {},
        methods:
        {
            /*
                THIS FUNCTION IS CALL FROM ONES OF THE CHILD TREEVIEW_DATA
                AND IT'S EMIT EVENT "updateContextMenus" TO ALL CHILDREN
            */
            "childrenCall": function()
            {
                console.log("BROADCAST FROM CHILD");
                console.log("EMIT ALL CHILDREN");
                this.$emit('updateContextMenus', 7);
            },
            /*
             */
            "wazaTest": function()
            {
                var root = this.$root;

                root.$refs["FORM-GENERATOR"].formData.wazaTest = "07-02-2020";
                root.$refs["FORM-GENERATOR"].formDataBackup.wazaTest = "07-02-2020";

                var o = {
                    schemaUid: "E8E6074D-BC58-408C-BB24-FE2E6EA9E66A",
                    fieldMode: "full",
                    fieldType: "Datepicker",
                    labels:
                    {
                        placeholder: "BDAY_PH",
                        label: "BDAY",
                        helper: "BDAY_HELPER",
                        guideline: "GL_BIRTHDATE",
                        label_sd_empty: "BDAY_EMPTY"
                    },
                    name: "wazaTest",
                    defaultValue: "",
                    propStatus: "BASE",
                    config:
                    {
                        dateFormat: "DD-MM-YYYY",
                        unselect:
                        {
                            before: "07-01-2020",
                            after: "21-07-2020"
                        },
                        displayInline: "true"
                    },
                    styles:
                    {
                        "formGroup": "",
                        "label": ""
                    }
                };

                /*
                root.$refs["FORM-GENERATOR"].formData.wazaTest = "#ff00ff";
                root.$refs["FORM-GENERATOR"].formDataBackup.wazaTest = "#ff00ff";

                var o = {
                    fieldMode: "full",
                    fieldType: "ColorPicker",
                    labels:
                    {
                        placeholder: "CP_PH",
                        label: "CP",
                        helper: "CP_HELPER",
                        guideline: "GL_CP",
                        label_sd_empty: "CP_EMPTY"
                    },
                    name: "wazaTest",
                    defaultValue: "",
                    propStatus: "BASE",
                    styles:
                    {
                        "formGroup": "",
                        "label": ""
                    },
                    config:
                    {
                        displayInline: "true"
                    }
                };
                */

                root.schema.push(o);

                document.querySelector("#app > .row").style.marginBottom = "300px";
            },
            "wazaUpdate": function()
            {
                // document.querySelector("#app").__vue__.$refs["FORM-GENERATOR"].schema.splice(77, 1);

                /*
                document.querySelector("#app").__vue__.$refs["FORM-GENERATOR"].schema.find(function(o)
                {
                    if (o.name === "wazaTest") return o;
                }).styles.label = "text-danger";

                document.querySelector("#app").__vue__.$refs["FORM-GENERATOR"].schema.find(function(o)
                {
                    if (o.name === "wazaTest") return o;
                }).config.unselect.before = "20-01-2020";
                */

                var root = this.$root;

                root.$refs["FORM-GENERATOR"].schema.find(function(o)
                {
                    if (o.name === "wazaTest") return o;
                }).styles.label = "text-danger";

                root.$refs["FORM-GENERATOR"].schema.find(function(o)
                {
                    if (o.name === "wazaTest") return o;
                }).config.unselect.before = "20-01-2020";
            }
        }
    }
);
/*
    SELECT MULTI COMPLETE

                document.querySelector("#app").__vue__.$refs["FORM-GENERATOR"].schema.find(function(o)
                {
                    if (o.schemaUid === "4FDBD9CE-E343-41DA-AD36-76FD3E352B36") return o;
                }).config.max=10

*/