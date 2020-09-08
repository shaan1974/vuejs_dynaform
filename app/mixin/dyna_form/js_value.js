var DynaForm_Value_Mixin = {

    methods:
    {
        /* SET VALUE */
        setValue: function(pVar, path, context, v)
        {
            var path2 = JSON.parse(JSON.stringify(path));
            var b = context.$root.formData;

            path2 = [].concat(path2.slice(0, -1), [pVar]);

            for (cnt4 = 0, len4 = path2.length - 1; cnt4 < len4; cnt4++)
            {
                if (path2[cnt4].indexOf("z(") !== -1 || path2[cnt4].indexOf("q(") !== -1)
                {
                    var p = path2[cnt4].slice(2, -1);
                    b = b[p];
                }
                else
                {
                    b = b["" + path2[cnt4]];
                }
            }

            // b["" + pVar + ""] = "";
            b["" + pVar + ""] = v;
        },
        /*  GET VALUE */
        getValue: function(pVar, path, context)
        {
            var path2 = JSON.parse(JSON.stringify(path));
            var b = context.$root.formData;

            path2 = [].concat(path2.slice(0, -1), [pVar]);
            for (cnt4 = 0, len4 = path2.length; cnt4 < len4; cnt4++)
            {
                if (path2[cnt4].indexOf("z(") !== -1 || path2[cnt4].indexOf("q(") !== -1)
                {
                    var p = path2[cnt4].slice(2, -1);
                    b = b[p];
                }
                else
                {
                    b = b["" + path2[cnt4]];
                }
            }

            return b;
        }
    }
};

//  MERGE THIS MIXIN WITH THE MAIN ONE
//
DynaForm_Mixin.methods = Object.assign(DynaForm_Mixin.methods, DynaForm_Value_Mixin.methods);