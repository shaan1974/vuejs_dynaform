/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN LABELS
/*
    _Qs("#app").__vue__.labels.FN="ok1..";
    _Qs("#app").__vue__.labels.AGE="ok2.."

    $0.__vue__.labels.TB_RESET_BTN="ok"

    _Qs("#app").__vue__.labels["CHOICE_OR_FREE"]="Waza."

    {{i_labels["LABEL"]}}
    i_labels['PLACEHOLDER']
    i_labels['GUIDELINE']
*/
var Labels_Mixin = {

    mounted: function() {},
    computed:
    {
        i_labels: function()
        {
            if (typeof this.labels === "undefined") return "";

            var that = this;

            return {
                "LABEL": ((typeof this.labels["label"] !== "undefined") ? this.getLabel(this.$root, this.labels["label"]) : "(M1)"),
                "HELPER": ((typeof this.labels["helper"] !== "undefined") ? this.getLabel(this.$root, this.labels["helper"]) : "(M2)"),
                "PLACEHOLDER": ((typeof this.labels["placeholder"] !== "undefined") ? this.getLabel(this.$root, this.labels["placeholder"]) : "(M2)"),
                "GUIDELINE": ((typeof this.labels["guideline"] !== "undefined") ? this.getLabel(this.$root, this.labels["guideline"]) : "(M3)"),
                "COLUMNS": ((typeof this.labels["columns"] !== "undefined") ? this.labels["columns"].map(function(o)
                {
                    return that.getLabel(that.$root, o);
                }) : "(M4)"),
                "GUIDELINES": ((typeof this.labels["guidelines"] !== "undefined") ? this.labels["guidelines"].map(function(o)
                {
                    return that.getLabel(that.$root, o);
                }) : "(M5)"),
                "DROPZONE": ((typeof this.labels["labelsDropZone"] !== "undefined") ? this.labels["labelsDropZone"].map(function(o)
                {
                    return that.getLabel(that.$root, o);
                }) : "(M6)"),
                "NO_ENTRIES": ((typeof this.labels["labelNoEntries"] !== "undefined") ? this.getLabel(this.$root, this.labels["labelNoEntries"]) : "(M7)"),
                "BTN_ADD": ((typeof this.labels["labelBtnAdd"] !== "undefined") ? this.getLabel(this.$root, this.labels["labelBtnAdd"]) : "(M8)"),
                "BTN_REMOVE": ((typeof this.labels["labelBtnRemove"] !== "undefined") ? this.getLabel(this.$root, this.labels["labelBtnRemove"]) : "(M9)"),
                "LABEL_INSIDE": ((typeof this.labels["label_inside"] !== "undefined") ? this.getLabel(this.$root, this.labels["label_inside"]) : "(M10)"),
                "LABEL_SD_EMPTY": ((typeof this.labels["label_sd_empty"] !== "undefined") ? this.getLabel(this.$root, this.labels["label_sd_empty"]) : "(M11)"),
                "TABS": ((typeof this.labels["tabs"] !== "undefined") ? this.labels["tabs"].map(function(o)
                {
                    return that.getLabel(that.$root, o);
                }) : "(M12)"),
                "PREFIXS": ((typeof this.labels["prefixes"] !== "undefined") ? this.labels["prefixes"].map(function(o)
                {
                    return that.getLabel(that.$root, o);
                }) : "(M13)"),
                "START": ((typeof this.labels["start"] !== "undefined") ? this.getLabel(this.$root, this.labels["start"]) : "(M14)"),
                "NOTHING": ((typeof this.labels["nothing"] !== "undefined") ? this.getLabel(this.$root, this.labels["nothing"]) : "(M15)"),
                "LABEL_TRUE": ((typeof this.labels["label_true"] !== "undefined") ? this.getLabel(this.$root, this.labels["label_true"]) : "(M16)"),
                "LABEL_FALSE": ((typeof this.labels["label_false"] !== "undefined") ? this.getLabel(this.$root, this.labels["label_false"]) : "(M17)"),
                "LABEL_MD_EMPTY": ((typeof this.labels["label_md_empty"] !== "undefined") ? this.getLabel(this.$root, this.labels["label_md_empty"]) : "(M18)")
            };
        }
    },
    methods:
    {
        /*
            USE FOR PLACEHOLDER ATTRIBUTE
            VAR LABEL_INSIDE
        */
        getLabel: function(root, val)
        {
            return (typeof root.$root.labels["" + val + ""] === "undefined") ? "(M)" : root.$root.labels["" + val + ""];
        },
        /*
            HTML TO TEXT
        */
        htmlToText: function(html)
        {
            var txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        },
        /*
            TRANSFORM LABEL TO BE ABLE TO DISPLAY IT WITH BREAKLINES AND SPACES INTO CSS CONTENT THROUGH ATTRIBUTE
        */
        labelForAttribute: function(v)
        {
            v = encodeURIComponent(v);
            //  REPLACE BREAKLINES
            v = v.replace(/%3Cbr%2F%3E/gi, "%0A");
            //  REPLACE WHITESPACE WITH NON BREAK WHITE SPACE
            v = v.replace(/%20/gi, "%C2%A0"); // encodeURIComponent("\u00A0")
            v = decodeURIComponent(v);

            return v;
        }
    }
};