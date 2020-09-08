//	CAPTCHA

Captcha = Vue.component(
    'Captcha',
    {
        template: Captcha_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Dico_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'options', 'behaviours', 'defaultValue', 'propStatus', 'behaviours', 'config', 'styles'],
        data: function()
        {
            return {
                code: "",
                builded_config:
                {},
                css_config:
                {},
                default_config: "captcha",
            };
        },
        mounted: function()
        {
            //  CREATE CAPTCHA IF NOT IN DISPLAY MODE
            if (this.isNotDisplayMode())
            {
                this.createCaptcha(false);
            }
        },
        methods:
        {
            "createCaptcha": function(r)
            {
                if (r === true)
                {
                    this.$el.querySelector("input").value = "";
                    this.$el.querySelector("input").focus();
                }

                var cId = this.name + '_' + this.fieldUid;
                var charsArray = this.builded_config.chars;
                var lengthOtp = this.builded_config.length;
                var captcha = [];
                for (var i = 0; i < lengthOtp; i++)
                {
                    //below code will not allow Repetition of Characters
                    var index = Math.floor(Math.random() * charsArray.length + 1);
                    if (captcha.indexOf(charsArray[index]) == -1)
                    {
                        captcha.push(charsArray[index]);
                    }
                    else
                    {
                        i--;
                    }
                }
                captcha = captcha.join("");

                var canv = this.$el.querySelector("#" + cId + "");
                canv.width = 18 * lengthOtp;
                canv.height = 40;
                var ctx = canv.getContext("2d");

                //  BG
                for (i = 0; i < canv.width; i += 10)
                {
                    ctx.beginPath();
                    ctx.moveTo(0, i);
                    ctx.lineTo(canv.width, i);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "" + this.builded_config.strokeColor + "";
                    ctx.stroke();
                    ctx.closePath();
                }

                //  TEXT
                ctx.strokeStyle = "" + this.builded_config.textcolor + "";
                ctx.font = "25px Georgia";
                ctx.strokeText(captcha, 12, 30);

                this.code = captcha;
            },
            "checkCaseSensitive": function(y)
            {
                return (this.builded_config.caseSensitive) ? y : y.toUpperCase();
            },
            "checkCode": function(e)
            {
                if (this.checkCaseSensitive(e.target.value) === this.checkCaseSensitive(this.code))
                {
                    this.setDataValue(this.code, true);
                }
                else
                {
                    this.setDataValue('', true);
                }
            }
        }
    }
);