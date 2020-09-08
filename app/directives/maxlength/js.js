/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    DIRECTIVE - MAX lENGTH
    
    v-maxLength="{ 'max' : 1000 ,'counter' : true | false }"   
*/
Vue.directive(
    'maxLength',
    {
        bind: function(el, binding, vnode) {},

        inserted: function(el, binding, vnode)
        {
            if (Object.entries(binding.value).length === 0)
            {
                return true;
            }

            //  VARS
            //
            var mxLen = binding.value["max"];
            var isCounter = binding.value["counter"];

            //  CREATE VAR ATTACH TO ELEMENT ITSELF
            //
            el.__press__ = false;
            el.__press_cnt__ = 0;

            el.__keys__ = {

                BACKSPACE: 8,
                TAB: 9,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                DELETE: 46
            };

            //  CREATE COUNTER
            //
            if (isCounter === true)
            {
                var newEl = document.createElement('div');
                newEl.setAttribute("data-counter", "C");
                newEl.innerHTML = "<span data-counter-ref='" + el.id + "'>" + (el.value).BLENGTH() + "</span>/" + mxLen + "";

                el.parentNode.insertBefore(newEl, el.nextSibling);

                //  CAPTURE EVENT RESET ON FORM
                //
                // $(el).closest("form").get(0).on("reset.maxlength", binding.def.onResetForm.bind(null, binding, el), false);
            }

            //  KEYDOWN
            el.on("keydown.maxlength", binding.def.onkeydown.bind(null, binding, vnode), false);

            //  KEYPRESS
            el.on("keypress.maxlength", binding.def.onKeypress.bind(null, binding, vnode), false);

            //  KEYUP
            el.on("keyup.maxlength", binding.def.onKeyup.bind(null, binding, vnode), false);

            //  PASTE
            //  el.on("paste.maxlength", binding.def.onPaste.bind(null, binding), false);

            //  RESET COUNTER
            el.on("resetCounter.maxlength", binding.def.onResetCounter.bind(null, binding), false);
        },

        onResetForm: function(arg_bind, el, e)
        {
            el.value = "";
            var event = document.createEvent('Event');
            event.initEvent('keyup', true, true); //can bubble, and is cancellable
            el.dispatchEvent(event);
        },

        onkeydown: function(arg_bind, vnode, e)
        {
            //  VARS
            //
            var mxLen = parseInt(arg_bind.value["max"]);
            var isCounter = arg_bind.value["counter"];
            var mx = e.target;
            var currentLen;

            //	SET KEYPRESS FOR REPEAT
            //
            if (mx.__press__ === false)
            {
                mx.__press__ = true;
                mx.__press_cnt__ = Date.now();
            }

            if (e.ctrlKey === true && e.which === 118)
            {}
            else
            {
                currentLen = (e.target.value + "" + e.key).BLENGTH();
                var is_over_max = false;

                switch (e.which)
                {
                    case mx.__keys__.BACKSPACE:
                    case mx.__keys__.DELETE:
                    case mx.__keys__.UP:
                    case mx.__keys__.DOWN:
                    case mx.__keys__.LEFT:
                    case mx.__keys__.RIGHT:
                    case mx.__keys__.TAB:
                        break;
                    default:
                        if (currentLen > mxLen)
                        {
                            is_over_max = true;
                        }
                        break;
                }

                if (is_over_max === true && arg_bind.value.overlap === false)
                {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
                else
                {
                    if (e.which === 8 && (e.target.value).BLENGTH() - 1 > mxLen && arg_bind.value.overlap === true)
                    {
                        is_over_max = true;
                    }

                    if (is_over_max === true && arg_bind.value.overlap === true)
                    {
                        vnode.context.limit_warning = true;
                    }
                    else if (is_over_max === false && arg_bind.value.overlap === true)
                    {
                        vnode.context.limit_warning = false;
                    }

                    if (e.which === mx.__keys__.BACKSPACE)
                    {
                        if (isCounter === true)
                        {
                            var ref_counter = e.target.id;
                            currentLen = (e.target.value).BLENGTH();
                            // document.querySelector("[data-counter-ref='" + ref_counter + "']").innerHTML = currentLen;
                            _Qs("[data-counter-ref='" + ref_counter + "']").innerHTML = currentLen;
                        }
                    }
                }
            }
        },

        onKeypress: function(arg_bind, vnode, e)
        {
            //  VARS
            //
            var mx = e.target;
            var mxLen = arg_bind.value["max"];
            var isCounter = arg_bind.value["counter"];

            //  TEST
            //                    
            if (mx.__press__ === true && (Date.now() - mx.__press_cnt__ > 10))
            {
                var currentLen = (e.target.value + "" + e.key).BLENGTH();

                if (currentLen > mxLen && arg_bind.value.overlap === false)
                {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
                else
                {
                    if (e.which === 8 && (e.target.value).BLENGTH() > mxLen && arg_bind.value.overlap === true)
                    {
                        is_over_max = true;
                    }

                    if (currentLen > mxLen && arg_bind.value.overlap === true)
                    {
                        vnode.context.limit_warning = true;
                    }
                    else if (currentLen > mxLen && arg_bind.value.overlap === true)
                    {
                        vnode.context.limit_warning = false;
                    }

                    if (isCounter === true)
                    {
                        var ref_counter = e.target.id;
                        currentLen = (e.target.value + "" + e.key).BLENGTH();
                        // document.querySelector("[data-counter-ref='" + ref_counter + "']").innerHTML = currentLen;
                        _Qs("[data-counter-ref='" + ref_counter + "']").innerHTML = currentLen;
                    }
                }
            }
        },

        onKeyup: function(arg_bind, vnode, e)
        {
            //  VARS
            //
            var mx = e.target;
            var mxLen = arg_bind.value["max"];
            var isCounter = arg_bind.value["counter"];

            //	UPDATE COUNTER
            //
            if (isCounter === true)
            {
                var ref_counter = e.target.id;
                var currentLen = (e.target.value).BLENGTH();

                // if (document.querySelector("[data-counter-ref='" + ref_counter + "']") !== null)
                if (_Qs("[data-counter-ref='" + ref_counter + "']") !== null)
                {
                    // document.querySelector("[data-counter-ref='" + ref_counter + "']").innerHTML = currentLen;
                    _Qs("[data-counter-ref='" + ref_counter + "']").innerHTML = currentLen;
                }
            }

            //	SET KEYPRESS OFF
            //
            mx.__press__ = false;
        },
        /*
        onPaste: function(arg_bind, e)
        {
            e.preventDefault();
            e.stopPropagation();
            return false;
        },*/

        onResetCounter: function(arg_bind, e)
        {
            var ref_counter = e.target.id;
            // document.querySelector("[data-counter-ref='" + ref_counter + "']").innerHTML = "0";
            _Qs("[data-counter-ref='" + ref_counter + "']").innerHTML = "0";
        }
    }
);