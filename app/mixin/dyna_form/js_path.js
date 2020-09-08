var DynaForm_Path_Mixin = {

    methods:
    {
        /* GET PATH */
        getPath: function(context)
        {
            //  VARIABLES
            var loop, path;

            //  GET CURRENT VAR PATH
            // if (typeof context.key2 !== "undefined")
            if (typeof context.key2 !== "undefined" || ["TableRepeater", "TabRepeater", "TabStatic", "Field_Set"].indexOf(context.fieldType) !== -1)
            {
                // context = vnode.context;
                loop = true;

                // path = [context.key2];
                if (typeof context.key2 !== "undefined")
                {
                    path = [context.key2];
                }
                else
                {
                    path = [context.name];
                }

                while (loop === true)
                {
                    //  DEFINE CURRENT CONTEXT
                    context = context.$parent;

                    if (typeof context.formData === "undefined")
                    {
                        if (context.fieldsFormat.constructor.toString().indexOf('Array') !== -1 && typeof context.key3 !== "undefined")
                        {
                            if (context.$parent.fieldType === "TabStatic" || context.$parent.fieldType === "Field_Set")
                            {
                                path.push("q(0)");
                            }
                            path.push("z(" + context.parent_index + ")");
                        }
                        else if (["TableRepeater", "TabRepeater", "TabStatic", "Field_Set"].indexOf(context.fieldType) !== -1)
                        {
                            path.push(context.name);
                        }
                    }
                    else
                    {
                        loop = false;
                    }
                }
                path = path.reverse();
            }
            else
            {
                path = [context.name];
            }

            return path;
        },
        /*  BUILD PATH */
        buildPath: function(pVar, path, context)
        {
            var path2 = JSON.parse(JSON.stringify(path));
            var b = context.$root.formData;

            // path2 = [].concat(path2.slice(0, -1), [pVar]);

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
DynaForm_Mixin.methods = Object.assign(DynaForm_Mixin.methods, DynaForm_Path_Mixin.methods);