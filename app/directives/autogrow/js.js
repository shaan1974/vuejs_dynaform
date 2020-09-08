/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    DIRECTIVE - AUTOGROW
    
    <textarea v-autogrow></textarea>
    v-autogrow="{ 'min-height' : '100px' , 'max-height' : '300px' }"
*/
Vue.directive(
    'autogrow',
    {
        bind: function(el, binding, vnode)
        {
            if (Object.entries(binding.value).length === 0)
            {
                return true;
            }
            el.style.maxHeight = binding["value"]["max-height"];
            el.style.minHeight = binding["value"]["min-height"];
            el.style.resize = "none";
            el.style.height = binding["value"]["min-height"];

            el.addEventListener("keydown", binding.def.onKeydown.bind(null, binding), false);

            el._binding = binding;
        },

        inserted: function(el, binding, vnode)
        {
            if (Object.entries(binding.value).length === 0)
            {
                return true;
            }
            binding.def.onResetForm(null, binding, el);
        },
        /*
            EXTRA
        */
        onResetForm: function(arg_bind, el, e)
        {
            var event = document.createEvent('Event');
            event.initEvent('keydown', true, true); //can bubble, and is cancellable
            e.dispatchEvent(event);
        },

        onKeydown: function(arg_bind, e)
        {
            // var elem = document.querySelector('.autogrow-textarea-mirror');
            var elem = _Qs('.autogrow-textarea-mirror');
            if (elem !== null)
            {
                elem.parentNode.removeChild(elem);
            }

            var createMirror = function(textarea)
            {
                textarea.insertAdjacentHTML('afterend', '<div class="autogrow-textarea-mirror"></div>');
                return textarea.nextElementSibling;
            };

            var sendContentToMirror = function(textarea)
            {
                mirror.innerHTML = textarea.value.replace(/\n/g, '<br/>') + '.<br/>.';

                function setHeight(el, val)
                {
                    if (typeof val === "function") val = val();
                    if (typeof val === "string") el.style.height = val;
                    else el.style.height = val + "px";
                }

                var textAreaHeight = parseFloat(getComputedStyle(textarea, null).height.replace("px", ""));
                var mirrorHeight = parseFloat(getComputedStyle(mirror, null).height.replace("px", ""));

                if (textAreaHeight != mirrorHeight)
                {
                    setHeight(textarea, mirrorHeight);
                }
            };

            var growTextarea = function()
            {
                sendContentToMirror(this);
            };

            // Create a mirror
            var mirror = createMirror(e.target);

            // Style the mirror
            mirror.style.position = 'absolute';
            mirror.style.top = "-10000px";
            mirror.style.left = "-10000px";
            mirror.style.wordWrap = 'break-word';

            mirror.style.padding = getComputedStyle(e.target)["padding"];
            mirror.style.width = getComputedStyle(e.target)["width"];
            mirror.style.fontFamily = getComputedStyle(e.target)["font-family"];
            mirror.style.fontSize = getComputedStyle(e.target)["font-size"];
            mirror.style.lineHeight = getComputedStyle(e.target)["line-height"];

            // Style the textarea
            e.target.style.overflow = "hidden";
            e.target.style.overflowY = "hidden";

            // Bind the textarea's event
            e.target.onkeyup = growTextarea;

            // Fire the event for text already present
            sendContentToMirror(e.target);
        }
    }
);