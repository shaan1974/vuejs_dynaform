//	FormatInput

FormatInput = Vue.component(
    'FormatInput',
    {
        template: FormatInput_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Event_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Clear_Mixin, Watchers_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'config', 'styles'],
        data: function()
        {
            return {
                "div_content": "",
                "mask_formats":
                {
                    "N": "^[0-9]{1}$",
                    "A": "^[a-zA-Z]{1}$",
                    "W": "^[a-zA-Z0-9]{1}$",
                    "B": "^[0]{1}$",
                    "C": "^[4]{1}$",
                    "D": "^[789]{1}$"
                },
                "cwidth": "0px",
                "default_config": "formatInput"
            };
        },
        mounted: function()
        {
            this.div_content = (this.value === "") ? this.builded_config.empty : this.value;

            //  CALCULATE WIDTH
            // document.querySelector("body")._appendHtml("<div id='TMP_CALC' style='position:absolute;left:0px;top:-100px;'>" + this.builded_config.empty + "</div>");
            _Qs("body")._appendHtml("<div id='TMP_CALC' style='position:absolute;left:0px;top:-100px;'>" + this.builded_config.empty + "</div>");
            // var w = document.querySelector("#TMP_CALC").clientWidth;
            var w = _Qs("#TMP_CALC").clientWidth;
            this.cwidth = "" + (w + 40) + "px";
            // document.querySelector("#TMP_CALC")._remove();
            _Qs("#TMP_CALC")._remove();
        },
        methods:
        {
            "functionKeydown": function(e)
            {
                //  IN CASE OF TAB KEY
                if (e.which === 9)
                {
                    return true;
                }

                //	VARS
                var that = e.target;
                var dFormat = this.builded_config.format;
                var max = dFormat.length;
                var sElement = this.builded_config.separator;
                var b_arr = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
                var c_arr = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
                var p, s, c, s2, sw;

                // IN CASE OF ALT-KEY, SHIFT-KEY, CRTL-KEY ALONE
                if ((e.altKey || e.ctrlKey || e.keyCode) && (e.keyCode === 16 || e.keyCode === 17 || e.keyCode === 18))
                {
                    return false;
                }

                //	NO MULTI LINES
                if (e.keyCode === 13)
                {
                    e.preventDefault();
                    return false;
                }

                //	MAX LENGTH REACH
                if ((e.which != 8 && e.which != 37 && e.which != 39) && that.innerText.length >= max)
                {
                    e.preventDefault();
                }

                //	KEYS : INSERT, DELETE, KEY LEFT, RIGHT
                if (e.which == 45 || e.which == 46 || e.which == 37 || e.which == 39)
                {
                    return true;
                }

                //	KEYS : HOME, END
                if (e.which == 36 || e.which == 35)
                {
                    this.setCaretPos(that, (e.which == 36) ? 0 : max);
                    e.preventDefault();
                    return false;
                }

                //	IF BACK KEY
                if (e.which == 8)
                {
                    //	SET THE CORRECT CHAR FROM FORMAT
                    p = this.getCaretPosition(that);
                    s = that.innerHTML;
                    c = "" + dFormat.charAt(p - 1) + "";

                    if (sElement.indexOf(c) === -1)
                    {
                        c = this.builded_config.emptySingle;
                    }

                    s2 = s.split("");
                    s2[p - 1] = "" + c + "";
                    s = s2.join("");

                    that.innerHTML = s;
                    this.setCaretPos(that, p - 1);

                    e.preventDefault();
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    e.cancelBubble = true;
                    return false;
                }

                //	IF NOT BACK
                if (e.which != 8)
                {
                    if (this.getCaretPosition(that) < max)
                    {
                        //	VARS
                        p = this.getCaretPosition(that);
                        s = that.innerHTML;
                        c = e.which || e.keyCode;

                        if (typeof c_arr[b_arr.indexOf(c)] !== "undefined")
                        {
                            c = c_arr[b_arr.indexOf(c)];
                        }

                        //	CHAR TO INSERT
                        c = String.fromCharCode(c);

                        //	TEST SHIFTKEY
                        c = (e.shiftKey == true) ? c.toUpperCase() : c.toLowerCase();

                        //	CHECK KEY JUMP TO NEXT POSITION AND TEST OR NOT
                        sw = 1;
                        while (sw == 1)
                        {
                            if (sElement.indexOf("" + dFormat.charAt(p) + "") !== -1)
                            {
                                p = p + 1;
                            }
                            else
                            {
                                if (p > max)
                                {
                                    return false;
                                }
                                else
                                {
                                    sw = 0;
                                }
                            }
                        }

                        if (typeof this.mask_formats["" + dFormat.charAt(p) + ""] != "undefined")
                        {
                            var reg = new RegExp("" + this.mask_formats["" + dFormat.charAt(p) + ""] + "");
                            if (reg.test(c) == false)
                            {
                                return false;
                            }
                        }

                        //	REPLACE
                        s = s.replaceAt(p, "" + c[0] + "");
                        that.innerHTML = s;

                        this.setCaretPos(that, p + 1);
                        this.setFormatValue(s);
                    }
                }
            },
            "functionBlur": function(e)
            {
                //	VARS
                var that = e.target;
                var dFormat = (this.builded_config.format).split("");
                var t_val = (that.innerHTML).split("");
                var err = false;
                var empty_str = "";
                var reg;

                for (var i = 0; i < dFormat.length; i++)
                {
                    if (this.mask_formats["" + dFormat[i] + ""] != undefined)
                    {
                        empty_str += this.builded_config.emptySingle;
                        reg = new RegExp("" + this.mask_formats["" + dFormat[i] + ""] + "");
                        if (reg.test(t_val[i]) == false)
                        {
                            err = true;
                        }
                    }
                    else
                    {
                        empty_str += "" + t_val[i] + "";
                    }
                }

                if (err === false)
                {
                    this.eventTrigger(that, "change");
                    this.setFormatValue(that.innerHTML);
                }
                else if (err == true)
                {
                    if (this.builded_config.emptyOnBlur === true)
                    {
                        that.innerHTML = "";
                    }

                    this.eventTrigger(that, "change");

                    if (this.builded_config.emptyOnBlur === true)
                    {
                        that.innerHTML = empty_str;
                    }

                    if (this.builded_config.emptyOnBlur === true)
                    {
                        this.setFormatValue("");
                    }
                    else
                    {
                        this.setFormatValue(t_val.join(""));
                    }
                }

                var destInput = this.$el.querySelector("input[mode='FORMAT']");
            },
            /*
                CARET
            */
            "getCaretPosition": function(element)
            {
                var msie = (typeof document.selection != "undefined" && document.selection.type != "Control") && true;
                var w3 = (typeof window.getSelection != "undefined") && true;
                var caretOffset = 0;
                var range;

                if (w3)
                {
                    range = window.getSelection().getRangeAt(0);
                    var preCaretRange = range.cloneRange();
                    preCaretRange.selectNodeContents(element);
                    preCaretRange.setEnd(range.endContainer, range.endOffset);
                    caretOffset = preCaretRange.toString().length;
                }
                else if (msie)
                {
                    var textRange = document.selection.createRange();
                    var preCaretTextRange = document.body.createTextRange();
                    preCaretTextRange.expand(element);
                    preCaretTextRange.setEndPoint("EndToEnd", textRange);
                    caretOffset = preCaretTextRange.text.length;
                }
                return caretOffset;
            },
            "setCaretPos": function(el, sPos)
            {
                var charIndex = 0,
                    range = document.createRange();
                range.setStart(el, 0);
                range.collapse(true);
                var nodeStack = [el],
                    node, foundStart = false,
                    stop = false;

                while (!stop && (node = nodeStack.pop()))
                {
                    if (node.nodeType == 3)
                    {
                        var nextCharIndex = charIndex + node.length;
                        if (!foundStart && sPos >= charIndex && sPos <= nextCharIndex)
                        {
                            range.setStart(node, sPos - charIndex);
                            foundStart = true;
                        }
                        if (foundStart && sPos >= charIndex && sPos <= nextCharIndex)
                        {
                            range.setEnd(node, sPos - charIndex);
                            stop = true;
                        }
                        charIndex = nextCharIndex;
                    }
                    else
                    {
                        var i = node.childNodes.length;
                        while (i--)
                        {
                            nodeStack.push(node.childNodes[i]);
                        }
                    }
                }
                var selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            },
            "setFormatValue": function(v)
            {
                this.setDataValue(v, true);
            },
            "clearFormatInput": function()
            {
                this.$el.querySelector("[contenteditable]").innerHTML = this.$el.querySelector("[contenteditable]").getAttribute("placeholder");
                this.setDataValue("", true);
            }
        }
    }
);