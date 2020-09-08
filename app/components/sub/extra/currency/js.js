//	INPUT TEXT CURRENCY

Currency = Vue.component(
    'Currency',
    {
        template: Currency_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Clear_Mixin, Watchers_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'format', 'behaviours', 'defaultValue', 'propStatus', 'config', 'styles'],
        data: function()
        {
            return {
                "formated_visible": true,
                "unformated_visible": false,
                "unformatted": "",
                "default_config": "currencyFormat"
            };
        },
        methods:
        {
            "formatNumber": function()
            {
                var v = parseFloat(this.value);
                return v.format(this.builded_config.decimalLength, 3, this.builded_config.thousandCharater, this.builded_config.decimalCharater);
            },
            "buildUnformatted": function(e)
            {
                //  GET POSITION
                var p = doGetCaretPosition(e.target);

                //  HIDE CURRENT FOCUS ELEMENT
                this.formated_visible = false;

                //  GET VALUE
                var oldValue = e.target.value;
                var beforeV = oldValue.slice(0, p);

                //  GET TOTAL OF . AND , CHAR TO KNOW HOW MANY POS TO REMOVE FROM CARET POSITIION
                var rE = new RegExp("[\\" + this.builded_config.thousandCharater + "\\" + this.builded_config.decimalCharater + "]", "gi");
                var r = (beforeV.match(rE) === null) ? 0 : beforeV.match(rE).length;

                //  IF ELEMENT HAS "," SO WE REMOVE ONE
                if ((beforeV).indexOf("" + this.builded_config.decimalCharater + "") !== -1)
                {
                    r = r - 1;
                }

                //  UNFORMAT
                var nv = e.target.value;
                nv = nv.replace(new RegExp("[\\" + this.builded_config.thousandCharater + "]", "gi"), "");
                nv = nv.replace(new RegExp("[\\" + this.builded_config.decimalCharater + "]", "gi"), ".");

                //  SET UNFORMATED VALUE
                this.unformatted = nv;

                //  SET FOCUS ON ELEMENT AFTER
                this.unformated_visible = true;
                e.target.nextElementSibling.focus();

                //  REPLACE CURSOR
                setTimeout(
                    function()
                    {
                        doSetCaretPosition(e.target.nextElementSibling, p - r);
                    }, 10
                );
            },
            "blurFromUnformated": function(e)
            {
                //  FORMAT
                var x = e.target.value;
                if (e.target.value === "")
                {
                    x = "0";
                }

                this.setDataValue(x, true);
                this.formated_visible = true;
                this.unformated_visible = false;
            },
            "keyDown": function(e)
            {
                //  VARIABLES
                var keyCode = e.which ? e.which : e.keyCode;
                var p = doGetCaretPosition(e.target);
                var aChars = [35, 36, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 37, 39, 110, 8, 46];

                if (this.builded_config.negative === true)
                {
                    aChars.push(109);
                }

                if (keyCode === 9)
                {
                    return true;
                }

                //  CHECK FOR NEGATIVE SIGN
                if (keyCode === 109 && this.builded_config.negative === true)
                {
                    if (e.target.value.indexOf("-") === 0 || p !== 0)
                    {
                        e.stopPropagation();
                        e.preventDefault();
                        e.returnValue = false;
                        e.cancelBubble = true;
                        return false;
                    }
                }

                //  IF ALREADY DOT WHEN UNFORMATED
                if (keyCode === 110 && e.target.value.indexOf(".") !== -1)
                {
                    e.stopPropagation();
                    e.preventDefault();
                    e.returnValue = false;
                    e.cancelBubble = true;
                    return false;
                }

                //  IF KEYCODE IS NO ALLOWED
                if (aChars.indexOf(keyCode) === -1)
                {
                    e.stopPropagation();
                    e.preventDefault();
                    e.returnValue = false;
                    e.cancelBubble = true;
                    return false;
                }

                //  SPECIAL KEYS ARROWS, HOME, END, BACKSPACE
                var bChars = [35, 36, 37, 38, 39, 8];

                if (bChars.indexOf(keyCode) !== -1)
                {

                }
                else
                {
                    //  CHECK IF MORE THAT DECIMAL AUTHORIZED
                    p = doGetCaretPosition(e.target);
                    var c = e.key;
                    var nv = e.target.value.slice(0, p) + "" + c + "" + e.target.value.slice(p);

                    //  CHECK MIN-MAX
                    if (parseFloat(nv) < this.builded_config.min || parseFloat(nv) > this.builded_config.max)
                    {
                        doSetCaretPosition(e.target, p);

                        e.stopPropagation();
                        e.preventDefault();
                        e.returnValue = false;
                        e.cancelBubble = true;
                        return false;
                    }

                    if (nv.indexOf(".") !== -1)
                    {
                        if (nv.split(".")[1].length > this.builded_config.decimalLength)
                        {
                            nv = nv.slice(0, -1);
                            e.target.value = nv;
                            doSetCaretPosition(e.target, p + 1);

                            e.stopPropagation();
                            e.preventDefault();
                            e.returnValue = false;
                            e.cancelBubble = true;
                            return false;
                        }
                    }
                }
            }
        }
    }
);