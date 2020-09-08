var DynamicTable_Filter_Mixin = {

    methods:
    {
        /*
            FILTER CHANGE
        */
        "filterChange": function()
        {
            var vals = [];
            var header = this.builded_config.dynamic.headerFiltering;

            for (var cnt = 0, len = header.values.length; cnt < len; cnt++)
            {
                if (header.actif[cnt] === true)
                {
                    if (header.visible === false)
                    {
                        vals.push("" + header.column[cnt] + "|" + header.operators[cnt] + "|" + encodeURIComponent(header.values[cnt]));
                    }
                    else
                    {
                        if (header.values[cnt].length >= header.minChars[cnt])
                        {
                            vals.push("" + header.column[cnt] + "|" + header.operators[cnt] + "|" + encodeURIComponent(header.values[cnt]));
                        }
                    }
                }
            }

            if (vals.length === 0)
            {
                this.builded_config.dynamic.parm_filter = "";
                this.loadExternalData(1);
                return true;
            }

            this.builded_config.dynamic.parm_filter = "filter=" + vals.join(",");
            this.loadExternalData(1);
        },
        /*
            GET DICTIONNARY FOR DROPDOWN FILTER
        */
        "_getDico": function(v)
        {
            return this.getDico(this, v);
        },
        /*
            RESET HEADER FILTER
        */
        "_resetFilter": function(e, r, er)
        {
            e.target.previousElementSibling.value = "";
            this.builded_config.dynamic.headerFiltering.values[r] = "";
            e.target.previousElementSibling.trigger("" + er + "");
        },
        /*
            CHECK IF VALUE HAS HIGHTLIGHT TAG
        */
        "_foundHighlightTag": function(v)
        {
            if (typeof v === "undefined" || typeof v === "object" || typeof v === "function") return false;
            if (typeof v === "number" || typeof v === "boolean")
            {
                v = "" + v + "";
            }

            return (v.indexOf("[f]") !== -1) ? true : false;
        },
        /*
            REPLACE HIGHLIGHT  
        */
        "_highLight": function(v)
        {
            v = v.replace(/\[f\]/gi, "<b>");
            v = v.replace(/\[\/f\]/gi, "</b>");
            return v;
        }
    }
};

//  MERGE THIS MIXIN WITH THE MAIN ONE
//
DynamicTable_Mixin.methods = Object.assign(DynamicTable_Mixin.methods, DynamicTable_Filter_Mixin.methods);