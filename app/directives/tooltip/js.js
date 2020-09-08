/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    DIRECTIVE - TOOLTIP
    
    v-tooltip="{ 'label' : 'toto' : 'flow' : 'up,down,left,right'}"

    Available only for :

    Component - Extra - Container

    Toolbar
*/
Vue.directive(
    'tooltip',
    {
        bind: function(el, binding, vnode)
        {
            if (typeof binding.value === "undefined" || Object.entries(binding.value).length === 0)
            {
                return true;
            }
        },

        inserted: function(el, binding, vnode)
        {
            if (typeof binding.value === "undefined" || Object.entries(binding.value).length === 0)
            {
                return true;
            }
        },

        componentUpdated: function(el, binding, vnode)
        {
            if (typeof binding.value === "undefined" || Object.entries(binding.value).length === 0)
            {
                return true;
            }

            var v = "" + vnode.context.getLabel(vnode.context, binding.value.label);

            v = vnode.context.labelForAttribute(v);
            /*            
            v = encodeURIComponent(v);
            //  REPLACE BREAKLINES
            v = v.replace(/%3Cbr%2F%3E/gi, "%0A");
            //  REPLACE WHITESPACE WITH NON BREAK WHITE SPACE
            v = v.replace(/%20/gi, "%C2%A0"); // encodeURIComponent("\u00A0")
            v = decodeURIComponent(v);
            */

            el.setAttribute("tooltip", v);
            if (binding.value.flow !== "up")
            {
                el.setAttribute("flow", binding.value.flow);
            }
        }
    }
);