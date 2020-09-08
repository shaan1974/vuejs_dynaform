//	PASSWORD

PasswordInput = Vue.component(
    'PasswordInput',
    {
        template: PasswordInput_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Helper_Mixin, Config_Mixin, Clear_Mixin, Value_Mixin, Event_Mixin, Watchers_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'styles', 'config'],
        data: function()
        {
            return {
                "password_status": false,
                "default_config": "PasswordInput"
            };
        },
        computed:
        {
            "progress_class": function()
            {
                if (this.stength >= 0 && this.stength <= 50)
                {
                    return "bg-danger";
                }
                else if (this.stength >= 50 && this.stength <= 65)
                {
                    return "bg-warning";
                }
                else if (this.stength >= 66 && this.stength <= 99)
                {
                    return "bg-info";
                }
                else if (this.stength === 100)
                {
                    return "bg-success";
                }

                return "";
            },
            "stength": function()
            {
                //  GET RULE FORMAT ATTACH
                //
                var r = (this.i_validations.find(function(o)
                {
                    if (o.rule.startsWith("IS_PASSWORD")) return o;
                }).rule.split(",").reverse());
                r.pop();
                r = r.join("").slice(0, -1);

                //  CALCULATE PERCENTAGE FOR THE PROGRESS BAR
                //
                var f = this.value;
                var v = r;

                function isPasswordExpression(key, f, specialChars)
                {
                    var re;

                    switch (key)
                    {
                        case "CHARS":
                            return f.length;
                        case "DIGIT":
                            re = new RegExp("[0-9]", "g");
                            return (f.match(re) !== null) ? f.match(re).length : 0;
                        case "ALPHA":
                            re = new RegExp("[a-zA-Z]", "g");
                            return (f.match(re) !== null) ? f.match(re).length : 0;
                        case "ALPHA_HIGH":
                            re = new RegExp("[a-zA-Z\u00E0-\u00FC]", "g");
                            return (f.match(re) !== null) ? f.match(re).length : 0;
                        case "LOWER":
                            re = new RegExp("[a-z]", "g");
                            return (f.match(re) !== null) ? f.match(re).length : 0;
                        case "UPPER":
                            re = new RegExp("[A-Z]", "g");
                            return (f.match(re) !== null) ? f.match(re).length : 0;
                        case "SPECIAL":
                            re = new RegExp("[" + specialChars + "]", "g");
                            return (f.match(re) !== null) ? f.match(re).length : 0;
                    }

                    return 0;
                }

                function escapeRegExp(text)
                {
                    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
                }

                var rV = [];
                var e, g;
                var currentFormat = this.$root.config.password.formats[v];
                var specialChars = escapeRegExp(this.$root.config.password.specials_chars);

                for (var key in currentFormat)
                {
                    e = currentFormat[key].split(" ")[0];
                    v = parseInt(currentFormat[key].split(" ")[1]);
                    g = isPasswordExpression(key, f, specialChars);

                    switch (e)
                    {
                        case "EQ":
                            rV.push((g === v));
                            break;
                        case "GTE":
                            rV.push((g >= v));
                            break;
                        case "GT":
                            rV.push((g > v));
                            break;
                        case "LTE":
                            rV.push((g <= v));
                            break;
                        case "LT":
                            rV.push((g < v));
                            break;
                    }
                }

                //  RETURN
                //
                return (100 / rV.length) * (rV.filter(function(o)
                {
                    if (o === true) return o;
                }).length);
            }
        },
    }
);