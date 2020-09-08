/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	PRECALCULATED

PrecalculatedInput = Vue.component(
    'PrecalculatedInput',
    {
        template: PrecalculatedInput_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Dico_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin, Precalculated_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'formula', 'config', 'styles'],
        data: function()
        {
            return {
                "autonumericConfig": "",
                "default_config": "precalculated",
                "currenTime": Date.now()
            };
        },
        mounted: function()
        {
            this.autonumericConfig = this.$root.config.autonumeric["" + this.builded_config.autonumeric + ""];
        },
        computed:
        {
            /*
                AS IT'S BETTER TO USE PRECAULATED FUNCTION FORMULA
            */
            "precalculated": function()
            {
                // var c, cs, css, e, resultExpression, fs;
                var resultExpression;
                var wFormulat = this.formula;

                //  CHECK IF FORMULA IS A FUNCTION OR A STRING FORMULA
                //
                if (typeof this["" + wFormulat + ""] === "function")
                {
                    resultExpression = this["" + wFormulat + ""]();
                }
                /*
                else
                {
                    //  REPLACEMENTS - VARIABLES
                    var v = this.formula.match(/{{(.*?)}}/gi);

                    for (var cnt = 0, len = v.length; cnt < len; cnt++)
                    {
                        c = v[cnt].slice(2, -2);

                        //  REPLACEMENT TO HAVE A CORRECT EXPRESSION
                        //  SET 1 REPLACE FOR LOOP
                        c = c.replace(/(\[\*\]).(\w+)/, ".$1_$2");

                        //  SET 2 REPLACE FOR ELEMENT INSIDE ELEMENT
                        c = c.replace(/(\w+\[\d+])/, "$1[0]");

                        //  SET 3 REPLACE "../"
                        c = c.replace(/\.\.\//gi, "__parentLevel.");

                        //  SPLIT DOT
                        cs = c.split(".");

                        //  LOOP TO GET VAR
                        for (var cnt2 = 0, len2 = cs.length; cnt2 < len2; cnt2++)
                        {
                            css = cs[cnt2];

                            //  AT START "ROOT OR "PARENT"
                            if (cnt2 === 0)
                            {
                                if (css === "root")
                                {
                                    fs = this.$root.formData;
                                }
                                else if (css === "__parentLevel")
                                {
                                    fs = this.getPath(this);
                                    fs.pop();

                                    if (fs[0].startsWith("z("))
                                    {
                                        fs.pop();
                                        fs.push(this.name);
                                    }
                                    fs = this.buildPath('', fs, this);
                                }
                            }
                            //  SUB RELATED TO ARRAY INDEX
                            else if (css.startsWith("[*]"))
                            {
                                e = css.split("_")[1];
                                fs = fs.map(this.map.bind(null, e));
                            }
                            else
                            {
                                //  IN CASE OF OBJECT WITH ARRAY INSIDE
                                if (cs[cnt2].startsWith("["))
                                {
                                    fs = fs[cs[cnt2].slice(1, -1)][0];
                                }
                                //  DIRECT OBJECT
                                else
                                {
                                    fs = fs[cs[cnt2]];
                                }
                            }
                        }

                        // IF ARRAY STRINGIFY IT
                        if (fs.constructor.toString().indexOf("Array") !== -1)
                        {
                            fs = JSON.stringify(fs);
                        }

                        //  PATCH IF ELEMENT VALUE IS EMPTY WE SET IT TO ZERO
                        if (fs === "")
                        {
                            fs = "0";
                        }

                        wFormulat = wFormulat.replace(v[cnt], fs);
                    }

                    //  REPLACEMENTS - FUNCTIONS
                    wFormulat = wFormulat.replace("SUM(", "that.arrSum(");

                    //  FULL EXPRESSION

                    //	--DEBUG_[ precalculated full expression ]
                    if (this.$root.config.debugMode === true)
                    {
                        console.log("precalculated full expression");
                        console.log(wFormulat);
                    }
                    //	--/DEBUG_[ precalculated full expression ]                 

                    resultExpression = this.evaluate(wFormulat);
                }
                */

                //  NEXT TICK REPLACE VALUE
                //
                this.$nextTick(
                    function()
                    {
                        this.setDataValue(resultExpression, true);

                        if (this.$el.querySelector("[v]") !== null)
                        {
                            this.eventTrigger(this.$el.querySelector("[v]"), 'validate');
                        }
                    });

                //  CONFIG
                return AutoNumeric.format("" + resultExpression + "", this.$root.config.autonumeric["" + this.config.autonumeric + ""]);
            }
        },
        methods:
        {
            /*"map": function(e, o)
            {
                var r = Number(o[e]).valueOf();
                return r;
            },*/
            "evaluate": function(str)
            {
                //  VAR
                window["that"] = this;

                //  EXECUTE
                return new Function('return ' + str + '')();
            },
            /*,
                        "arrSum": function(arr)
                        {
                            return arr.reduce(function(a, b)
                            {
                                return a + b;
                            }, 0);
                        }*/
        }
    }
);