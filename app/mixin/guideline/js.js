//	MIXIN
// 
/*
    <template v-if="isGuideLine()">
        <Guideline_extra v-if="guideline" :guideline="i_guideline" :reff="name+'_'+fieldUid"></Guideline_extra>
    </template>
            
    guideline
*/
var Guideline_Mixin = {

    methods:
    {
        /*
            SHOW / HIDE GUIDELINES
        */
        showGuidelines: function(gl)
        {
            //	--DEBUG_[ display guideline ]
            if (gl.$root.config.debugMode === true)
            {
                console.log("SHOW GUIDELINES");
                console.log(gl);
                console.log("---------------------");
            }
            //	--/DEBUG_[ display guideline ]            

            this.overlay = true;

            this.$nextTick(
                function()
                {
                    //  VARIABLES
                    var m, ndx;

                    //  GET REF ELEMENT
                    //  var refElement = document.querySelector("[name='" + gl.$el.getAttribute("guideline") + "']");
                    var refElement = _Qs("[name='" + gl.$el.getAttribute("guideline") + "']");

                    if (refElement === null) return true;
                    refElement.classList.add("related-element");

                    //  CHECK IF ELEMENT IS VISIBLE OR NOT
                    var refE = refElement.getBoundingClientRect();

                    if ((refE.x + refE.y + refE.width + refE.height + refE.top + refE.right + refE.bottom + refE.left) === 0)
                    {
                        // ("ELEMENT NOT VISIBLE.");
                    }
                    else
                    {
                        // ("ELEMENT VISIBLE.");
                        //  POSITION OF RELATED ELEMENT
                        var position = {
                            top: refElement.getBoundingClientRect().top + document.body.scrollTop,
                            left: refElement.getBoundingClientRect().left + document.body.scrollLeft
                        };

                        //  IF GL IS COMING FROM CLASSIC TABLE COMPONENT WE PUT ONE UP AND AFTER ONE DOWN
                        if (gl.$el.querySelector(".popover").getAttribute("ndx") !== null)
                        {
                            ndx = gl.$el.querySelector(".popover").getAttribute("ndx");
                            m = (parseInt(ndx / 2) === ndx / 2) ? ["bottom", "top", "left", "right"] : ["top", "bottom", "left", "right"];
                        }
                        else
                        {
                            m = ["right", "bottom", "left", "top"];
                        }

                        var mc = 0;

                        //  GET CONTENT AND INSERT IT INTO BODY
                        var popupTemplate = gl.$el.querySelector(".popover").outerHTML;
                        // document.querySelector("body").insertAdjacentHTML("beforeend", "" + popupTemplate + "");
                        _Qs("body").insertAdjacentHTML("beforeend", "" + popupTemplate + "");

                        //  REPOSITION
                        // var guidelineElement = document.querySelectorAll("[reff='" + gl.$el.getAttribute("guideline") + "']")[1];
                        var guidelineElement = _Qsa("[reff='" + gl.$el.getAttribute("guideline") + "']")[1];
                        guidelineElement.classList.add("clonedPopover");
                        guidelineElement.classList.add("bs-popover-" + m[mc]);

                        this.setPositionGuideline(guidelineElement, m, mc, position, refElement);

                        //  CHECK IF ELEMENT IS OUTSIDE THE DOCUMENT
                        if (this.isOutsideDocument(guidelineElement))
                        {
                            mc = mc + 1;
                            guidelineElement.classList.remove("bs-popover-" + m[mc - 1]);
                            guidelineElement.classList.add("bs-popover-" + m[mc]);

                            this.setPositionGuideline(guidelineElement, m, mc, position, refElement);
                        }

                        //  CHECK IF OVERLAP OR NOT
                        //  ---- GET ALL CLONE POPOVER
                        // var clonedPopover = Array.prototype.slice.call(document.querySelectorAll(".clonedPopover"));
                        var clonedPopover = Array.prototype.slice.call(_Qsa(".clonedPopover"));
                        //  ---- ADD THE SWITCH
                        // clonedPopover = [document.querySelector(".switch")].concat(clonedPopover);
                        clonedPopover = [_Qs(".switch")].concat(clonedPopover);
                        //  ---- REMOVE LAST ONE ( THE CURRENT ONE FOUND IN QUERYSELECTOR ALL )
                        clonedPopover.pop();

                        for (var c = 0, len = clonedPopover.length; c < len; c++)
                        {
                            var isCollide = this.collide(clonedPopover[c], guidelineElement);

                            if (isCollide === true)
                            {
                                mc = mc + 1;
                                if (mc === 3)
                                {
                                    break;
                                }
                                else
                                {
                                    guidelineElement.classList.remove("bs-popover-" + m[mc - 1]);
                                    guidelineElement.classList.add("bs-popover-" + m[mc]);

                                    this.setPositionGuideline(guidelineElement, m, mc, position, refElement);
                                    c = c - 1;
                                }
                            }
                        }
                    }
                });
        },
        /*
            HIDE
        */
        hideGuidelines: function(gl)
        {
            //	--DEBUG_[ hide guideline ]
            if (gl.$root.config.debugMode === true)
            {
                console.log("HIDE GUIDELINES");
                console.log(gl);
                console.log("---------------------");
            }
            //	--/DEBUG_[ hide guideline ]     

            this.overlay = false;

            //  Remove class related-element
            // Array.prototype.slice.call(document.querySelectorAll(".related-element")).forEach(function(o, ndx)
            Array.prototype.slice.call(_Qsa(".related-element")).forEach(function(o, ndx)
            {
                o.classList.remove("related-element");
            });

            //  Remove clonedPopover
            // Array.prototype.slice.call(document.querySelectorAll(".clonedPopover")).forEach(function(o, ndx)
            Array.prototype.slice.call(_Qsa(".clonedPopover")).forEach(function(o, ndx)
            {
                o.parentNode.removeChild(o);
            });
        },
        /*
            SWITCH GUIDELINES
        */
        switchGuidelines: function(e)
        {
            var v;

            if (e.target.checked)
            {
                this.$root.$refs["FORM-GENERATOR"].$emit("SHOW_GUIDLINES");

                //  SET OFF LABEL
                //
                v = "" + this.getLabel(this, _Qs(".switch").getAttribute("data-tt-off"));
                /*
                v = encodeURIComponent(v);
                //  REPLACE BREAKLINES
                v = v.replace(/%3Cbr%2F%3E/gi, "%0A");
                //  REPLACE WHITESPACE WITH NON BREAK WHITE SPACE
                v = v.replace(/%20/gi, "%C2%A0"); // encodeURIComponent("\u00A0")
                v = decodeURIComponent(v);
                */
                v = this.labelForAttribute(v);
                _Qs(".switch").setAttribute("tooltip", v);

                //  DEFINE EVENT RESIZE ONCE
                var that = this;
                var fct = function(v)
                {
                    // if (document.querySelector(".guideline_txt + input").checked === true)
                    if (_Qs(".guideline_txt + input").checked === true)
                    {
                        // document.querySelector(".guideline_txt + input").checked = false;
                        _Qs(".guideline_txt + input").checked = false;

                        var event = document.createEvent('Event');
                        event.initEvent('click', true, true);
                        // document.querySelector(".guideline_txt + input").dispatchEvent(event);
                        _Qs(".guideline_txt + input").dispatchEvent(event);
                    }
                };

                window.once(
                    "resize",
                    fct.bind(null, that)
                );

                _Qs("body")._addClass("guidelines");
            }
            else
            {
                this.$root.$refs["FORM-GENERATOR"].$emit("HIDE_GUIDLINES");
                _Qs("body")._removeClass("guidelines");

                //  REVERT BACK ON LABEL
                //
                v = "" + this.getLabel(this, _Qs(".switch").getAttribute("data-tt-on"));
                /*
                v = encodeURIComponent(v);
                //  REPLACE BREAKLINES
                v = v.replace(/%3Cbr%2F%3E/gi, "%0A");
                //  REPLACE WHITESPACE WITH NON BREAK WHITE SPACE
                v = v.replace(/%20/gi, "%C2%A0"); // encodeURIComponent("\u00A0")
                v = decodeURIComponent(v);
                */
                v = this.labelForAttribute(v);
                _Qs(".switch").setAttribute("tooltip", v);
            }
        }
    }
};