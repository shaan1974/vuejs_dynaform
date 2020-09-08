/*
    SIMPLE ORDER    - CLICK ON COLUMM
    MULTI ORDER     - CLICK ON COLUMN AND AFTER USE SHIFT CLICK TO ADD
*/
var DynamicTable_Order_Mixin = {

    methods:
    {
        /*
            CHANGE ORDER
        */
        "changeOrder": function(e, p)
        {
            var s, f, cnt, len, filters;

            //  RESET OTHERS ICON IN CASE OF SHIFT KEY IS NOT PRESS
            if (e.shiftKey === false)
            {
                for (cnt = 0, len = this.builded_config.dynamic.order.css.length; cnt < len; cnt++)
                {
                    if (cnt != p)
                    {
                        this.builded_config.dynamic.order.css[cnt] = "sort_icon_none";
                    }
                }
            }

            //  SET CORRECT ICON
            switch (this.builded_config.dynamic.order.css[p])
            {
                case "sort_icon_none":
                    this.builded_config.dynamic.order.css[p] = "sort_icon_down";
                    s = "asc";
                    break;
                case "sort_icon_down":
                    this.builded_config.dynamic.order.css[p] = "sort_icon_up";
                    s = "desc";
                    break;
                case "sort_icon_up":
                    this.builded_config.dynamic.order.css[p] = "sort_icon_down";
                    s = "asc";
                    break;
            }

            //  ONLY SIMPLE ORDER IN CASE OF SHIFT KEY IS NOT PRESS
            if (e.shiftKey === false)
            {
                f = "sort=" + this.builded_config.dynamic.order.column[p] + "|" + s;
            }
            else
            {
                filters = [];
                for (cnt = 0, len = this.builded_config.dynamic.order.css.length; cnt < len; cnt++)
                {
                    if (this.builded_config.dynamic.order.css[cnt] != "sort_icon_none")
                    {
                        filters.push("" + this.builded_config.dynamic.order.column[cnt] + "|" + ((this.builded_config.dynamic.order.css[cnt] === "sort_icon_down") ? "asc" : "desc"));
                    }
                }

                f = "sort=" + filters.join(",");
            }

            //  SET BUILD PARM INTO DEDICTE VARIABLE
            this.builded_config.dynamic.parm_order = f;

            //  RELOAD DATA
            this.loadExternalData(1);
        }
    }
};

//  MERGE THIS MIXIN WITH THE MAIN ONE
//
DynamicTable_Mixin.methods = Object.assign(DynamicTable_Mixin.methods, DynamicTable_Order_Mixin.methods);