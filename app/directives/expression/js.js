/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    DIRECTIVE - EXPRESSION
*/
Vue.directive(
    'expression',
    {
        bind: function(el, binding, vnode)
        {
            //  IF EXPRESSION HAS NOT BEEN DEFINED WE DO NOTHING
            if (typeof binding.value === "undefined" || binding.value.length === 0)
            {
                return true;
            }

            //	--DEBUG_[ BIND EXPRESSION MODIFIERS ]
            if (vnode.context.$root.$root.config.debugMode === true)
            {
                console.log("EXPRESSION MODIFIERS");
                console.log(binding.modifiers);

                //  **************************************************************************************************************************************
                //  IN CASE OF VALIDATION
                if (binding.modifiers.validation === true)
                {
                    console.log("VALIDATE-BIND");
                }

                //  **************************************************************************************************************************************
                //  IN CASE OF BEHAVIOUR
                if (binding.modifiers.behaviour === true)
                {
                    console.log("BEHAVIOUR-BIND");
                }
            }
            //	--/DEBUG_[ BIND EXPRESSION MODIFIERS ]
        },

        inserted: function(el, binding, vnode)
        {
            //  IF EXPRESSION HAS NOT BEEN DEFINED WE DO NOTHING
            if (typeof binding.value === "undefined" || binding.value.length === 0)
            {
                return true;
            }

            var cElmName;
            var ev;

            //  **************************************************************************************************************************************
            //  IN CASE OF VALIDATION
            if (binding.modifiers.validation === true)
            {
                //  VARIABLE
                cElmName = binding.def.getElementType(el);

                //  ATTACH EVENTS ON ELEMENT
                ev = Object.keys(binding.def.eventsList).filter(function(o)
                {
                    if (binding.def.eventsList[o].indexOf("" + cElmName + "") != -1) return o;
                });

                //	--DEBUG_[ INSERT VALIDATE EXPRESSION MODIFIERS ]
                if (vnode.context.$root.$root.config.debugMode === true)
                {
                    console.log("VALIDATE-INSERTED");
                    console.log("VALIDATE-INSERTED-ELEMENT-TYPE : [" + cElmName + "]");
                    console.log(binding.def.eventsList);
                    console.log(cElmName);
                    console.log(ev);
                }
                //	--/DEBUG_[ INSERT VALIDATE EXPRESSION MODIFIERS ]

                // el.on("" + binding.def.events[cElmName] + "", binding.def.onUpdate.bind(null, el, binding, vnode), false);
                el.on("" + ev + "", binding.def.onUpdate.bind(null, el, binding, vnode), false);
                el.on("validate", binding.def.onUpdate.bind(null, el, binding, vnode), false);

                //  TRIGGER EVENT VALIDATE
                el.trigger("validate");

                //  SET ATTRIBUTE TO DEFINE THAT THE ELEMENT SHOULD BE PART OF THE VALIDATION
                el.setAttribute("v", "v");
            }

            //  **************************************************************************************************************************************
            //  IN CASE OF BEHAVIOUR
            if (binding.modifiers.behaviour === true)
            {
                //  VARIABLE
                cElmName = binding.def.getElementType(el);

                //  ATTACH EVENTS ON ELEMENT
                ev = Object.keys(binding.def.eventsList).filter(function(o)
                {
                    if (binding.def.eventsList[o].indexOf("" + cElmName + "") != -1) return o;
                });

                //	--DEBUG_[ INSERT BEHAVIOUR EXPRESSION MODIFIERS ]
                if (vnode.context.$root.$root.config.debugMode === true)
                {
                    console.log("BEHAVIOUR-INSERTED");
                    console.log("VALIDATE-INSERTED-ELEMENT-TYPE : [" + cElmName + "]");
                    console.log(binding.def.eventsList);
                    console.log(cElmName);
                    console.log(ev);
                }
                //	--/DEBUG_[ INSERT BEHAVIOUR EXPRESSION MODIFIERS ]

                // el.on("" + binding.def.events[cElmName] + "", binding.def.onUpdate.bind(null, el, binding, vnode), false);
                el.on("" + ev + "", binding.def.onUpdate.bind(null, el, binding, vnode), false);
                el.on("behave", binding.def.onUpdate.bind(null, el, binding, vnode), false);

                //  TRIGGER EVENT BEHAVE WITH NAMESPACE "ON_INIT" IN THIS CASE WE CAN KNOW IF UPDATE FUNCTION IS RUNNING DURING INIT OR NOT.
                if (binding.value[0].on_init === true)
                {
                    el.trigger("behave.on_init");
                }

                //  SET ATTRIBUTE TO DEFINE THAT THE ELEMENT SHOULD BE PART OF THE BEHAVIOUR
                el.setAttribute("b", "b");
            }
        },

        /*componentUpdated: function(el, binding, vnode, oVnode)
        {
        },*/

        unbind: function(el, binding, vnode)
        {
            //  IF VALIDATION HAS NOT BEEN DEFINED WE DO NOTHING
            if (typeof binding.value === "undefined" || binding.value.length === 0)
            {
                return true;
            }

            //	--DEBUG_[ UNBIND EXPRESSION MODIFIERS ]
            if (vnode.context.$root.$root.config.debugMode === true)
            {
                //  **************************************************************************************************************************************
                //  IN CASE OF VALIDATION
                if (binding.modifiers.validation === true)
                {
                    console.log("VALIDATE-UNBIND");
                }

                //  **************************************************************************************************************************************
                //  IN CASE OF BEHAVIOUR
                if (binding.modifiers.behaviour === true)
                {
                    console.log("BEHAVIOUR-UNBIND");
                }
            }
            //	--/DEBUG_[ UNBIND EXPRESSION MODIFIERS ]
        },

        update: function(el, binding, vnode)
        {
            /*
            if (binding.def.triggerElements.length !== 0)
            {
                binding.def.triggerElements = [];
            }
            */
        },

        /*
            CUSTOMS
        */

        triggerElements: [],

        /*
            GET PATH
        */
        getPathElement: function(vnode)
        {
            //  VARIABLES
            var context, loop, path;

            //  GET CURRENT VAR PATH
            if (typeof vnode.context.key2 !== "undefined")
            {
                context = vnode.context;
                loop = true;
                path = [context.key2];

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
                path = [vnode.context.name];
            }

            return path;
        },
        /*
            WHEN INPUT, SELECT, TEXTAREA TAG ARE UPDATED
        */
        onUpdateReplace: function(b_d_rr, current_value, binding, vnode, path, mm)
        {
            //  IF ARGUMENTS LENGHT IS CHANGE CHECK THE SLICE ALSO !!!
            var validArguments = Array.prototype.slice.call(arguments).slice(7, -2);
            var validArgument, cnt8, len8, cnt5, len5, cnt4, len4, pVar, path2, b, parentsLen, c;
            var r = b_d_rr.rep;

            if (mm === "STATE")
            {
                current_value = {
                    "ABILITY": "" + vnode.context.status_ability + "",
                    "VISIBILITY": "" + vnode.context.status_visibility + ""
                };
                current_value = JSON.stringify(current_value);
            }

            if (mm === "ELEMENT")
            {
                current_value = vnode.context;
            }

            //  LOOP ON VALID ARGUMENT(S)
            for (cnt8 = 0, len8 = validArguments.length; cnt8 < len8; cnt8++)
            {
                validArgument = validArguments[cnt8];

                //  AKA
                if (validArgument === "")
                {
                    validArgument = b_d_rr.aka.split(",")[cnt8];
                }

                //  REPLACEMENT FOR SPECIAL VAR
                //
                if (validArgument === "{{THIS}}")
                {
                    validArgument = current_value;
                }
                else if (validArguments[cnt8].match(binding.def.regExp["IS_STARTING_WITH_DOUBLE_BACKET"]) !== null)
                {
                    //  REMOVE STARTING END ENDING BRACKET
                    pVar = validArgument.slice(2, -2);
                    path2 = JSON.parse(JSON.stringify(path));
                    b = vnode.context.$root.formData;

                    // IF SAME LEVEL                                    
                    if (pVar.match(binding.def.regExp["IS_SAME_LEVEL"]) !== null)
                    {
                        path2 = [].concat(path2.slice(0, -1), [pVar]);
                        for (cnt4 = 0, len4 = path2.length; cnt4 < len4; cnt4++)
                        {
                            if (mm === "VALUE")
                            {
                                b = b["" + path2[cnt4]];
                            }
                            else if (mm === "STATE")
                            {
                                c = vnode.context.$parent.$children.filter(binding.def.getPvar0.bind(null, path2[cnt4]));
                                b = {
                                    "ABILITY": "" + c[0].status_ability + "",
                                    "VISIBILITY": "" + c[0].status_visibility + ""
                                };
                                b = JSON.stringify(b);
                            }
                            else if (mm === "ELEMENT")
                            {
                                c = vnode.context.$parent.$children.filter(binding.def.getPvar0.bind(null, path2[cnt4]));
                                b = c[0];
                            }
                        }

                        validArgument = b;
                    }
                    // IF ROOT
                    else if (pVar.match(binding.def.regExp["IS_ROOT"]) !== null)
                    {
                        if (mm === "VALUE")
                        {
                            validArgument = b["" + pVar.slice(2)];
                        }

                        if (mm === "STATE")
                        {
                            c = vnode.context.$root.$refs["FORM-GENERATOR"].$children.filter(binding.def.getPvar1.bind(null, pVar));
                            b = {
                                "ABILITY": "" + c[0].status_ability + "",
                                "VISIBILITY": "" + c[0].status_visibility + ""
                            };
                            b = JSON.stringify(b);
                            validArgument = b;
                        }

                        if (mm === "ELEMENT")
                        {
                            c = vnode.context.$root.$refs["FORM-GENERATOR"].$children.filter(binding.def.getPvar1.bind(null, pVar));
                            b = c[0];
                            validArgument = b;
                        }
                    }
                    // IF PARENT(S)    
                    else if (pVar.match(binding.def.regExp["IS_PARENTS"]) !== null)
                    {
                        parentsLen = pVar.match(binding.def.regExp["GET_PARENTS"])[0].length / 3;

                        if (mm === "VALUE")
                        {
                            for (cnt5 = 0, len5 = parentsLen; cnt5 < len5; cnt5++)
                            {
                                path2.pop();
                                if (path2.length !== 0 && path2[path2.length - 1].indexOf("z(") === 0)
                                {
                                    path2.pop();
                                }
                            }

                            path2.push(pVar.slice(3 * parentsLen));

                            for (cnt4 = 0, len4 = path2.length; cnt4 < len4; cnt4++)
                            {
                                b = b["" + path2[cnt4]];
                            }
                        }

                        /* *********** STILL EXPERIMENTAL **************************** */
                        if (mm === "STATE")
                        {
                            // c = vnode.context.$parent;
                            c = vnode.context;

                            for (cnt5 = 0, len5 = parentsLen; cnt5 < len5; cnt5++)
                            {
                                c = c.$parent;

                                //  IF WE REACH THE TOP WE STOP
                                if (typeof c.formData !== "undefined")
                                {
                                    break;
                                }

                                //  IF ELEMENT HAS NOT STATUS_ABILITY NOT A REAL ELEMENT
                                if (typeof c.status_ability === "undefined")
                                {
                                    cnt5 = cnt5 - 1;
                                }
                            }

                            pVar = pVar.match(binding.def.regExp["GET_ELM_IN_PARENT"])[0];
                            c = c.$children.filter(binding.def.getPvar2.bind(null, pVar));
                            b = {
                                "ABILITY": "" + c[0].status_ability + "",
                                "VISIBILITY": "" + c[0].status_visibility + ""
                            };

                            b = JSON.stringify(b);
                        }

                        if (mm === "ELEMENT")
                        {
                            // c = vnode.context.$parent;
                            c = vnode.context;

                            for (cnt5 = 0, len5 = parentsLen; cnt5 < len5; cnt5++)
                            {
                                c = c.$parent;

                                //  IF WE REACH THE TOP WE STOP
                                if (typeof c.formData !== "undefined")
                                {
                                    break;
                                }

                                //  IF ELEMENT HAS NOT STATUS_ABILITY NOT A REAL ELEMENT
                                if (typeof c.status_ability === "undefined")
                                {
                                    cnt5 = cnt5 - 1;
                                }
                            }

                            pVar = pVar.match(binding.def.regExp["GET_ELM_IN_PARENT"])[0];
                            c = c.$children.filter(binding.def.getPvar2.bind(null, pVar));
                            b = c[0];
                        }

                        validArgument = b;
                    }
                }

                if (mm == "VALUE")
                {
                    //  IF TYPE OF VALUE IS STRING WE SUROUNDED
                    validArgument = binding.def.parseArgumentBeforeEvaluation(validArgument, current_value);

                    //  REPLACE PARAMS
                    r = r.replaceAll("{{P" + (cnt8 + 1) + "}}", validArgument);
                }

                if (mm == "STATE")
                {
                    //  REPLACE PARAMS
                    r = r.replaceAll("{{P" + (cnt8 + 1) + "}}", validArgument);
                }

                if (mm == "ELEMENT")
                {
                    //  REPLACE PARAMS
                    if (cnt8 === 0)
                    {
                        var tempObj = validArgument;
                        r = r.replaceAll("{{P" + (cnt8 + 1) + "}}", "tempObj");
                    }
                    else
                    {
                        r = r.replaceAll("{{P" + (cnt8 + 1) + "}}", validArgument);
                    }
                }
            }

            if (mm == "ELEMENT")
            {
                eval(r);
                return "";
            }
            else
            {
                return r;
            }
        },
        onUpdate: function(el, binding, vnode, oVnode)
        {
            //  VARIABLES
            var path = binding.def.getPathElement(vnode);
            var ndx = path.filter(function(o, i)
            {
                if (o.indexOf("z(") != -1)
                {
                    if (path[i + 1].indexOf("q(") === -1)
                    {
                        return o;
                    }
                }
            }).map(
                function(o)
                {
                    return parseInt((o).slice(2, -1)) + 1;
                }
            ).join(".");

            //	--DEBUG_[ EXPRESSION ONUPDATE ]
            if (vnode.context.$root.$root.config.debugMode === true)
            {
                console.log('%c PATH! ', 'background: orange; color: #000');
                console.log(path);
                console.log("NDX : [" + ndx + "]");
            }
            //	--/DEBUG_[ EXPRESSION ONUPDATE ]

            // var rules = JSON.parse(JSON.stringify(binding.value));
            var rules = binding.value;
            var current_rule, current_error_if, current_error_label, current_error_class;
            var cnt, len;
            var cnt2, len2;
            var b_d_rr;
            var rev;

            //  ELEMENT VALUE DEPEDING OF TYPE OF THE ELEMENT
            //  WE HAVE TO TOOK THE ELEMENT ON SCREEN TO BE SURE TO GET THE CORRECT VALUE

            vnode.context.$nextTick(
                function()
                {
                    // ----
                    // var current_value = this.value;
                    var current_value = (typeof this.value !== "undefined") ? this.value : this.values;

                    //	--DEBUG_[ EXPRESSION CURRENT VALUE ]
                    if (vnode.context.$root.$root.config.debugMode === true)
                    {
                        console.log("CV [" + current_value + "]");
                    }
                    //	--/DEBUG_[ EXPRESSION CURRENT VALUE ]

                    if (typeof current_value === "number" || typeof current_value === "boolean")
                    {
                        current_value = "" + current_value + "";
                    }
                    // else if (current_value.constructor.toString().indexOf("Array") !== -1)
                    else if (current_value._isArray())
                    {
                        current_value = JSON.parse(JSON.stringify(current_value));
                    }
                    // else if (current_value.constructor.toString().indexOf("Object") !== -1)
                    else if (current_value._isObject())
                    {
                        if (Object.keys(current_value).length === 0)
                        {
                            current_value = {};
                        }
                        else
                        {
                            current_value = {
                                "x": "x"
                            };
                        }
                    }
                    // ----

                    var current_error_if_true, current_error_if_false, mm, n_current_error_label;

                    //  LOOP ON RULE ATTACH TO THE ELEMENT              
                    for (cnt = 0, len = rules.length; cnt < len; cnt++)
                    {
                        current_rule = rules[cnt].rule;
                        //  FOR VALIDATION
                        if (binding.modifiers.validation === true)
                        {
                            current_error_if = rules[cnt].error_if;
                            // current_error_label = rules[cnt].error_label;
                            current_error_label = this.getLabel(this.$root, rules[cnt].error_label);
                            current_error_class = rules[cnt].error_class;
                        }

                        //  FOR BEHAVIOUR
                        if (binding.modifiers.behaviour === true)
                        {
                            current_error_if_true = rules[cnt].return_if_true;
                            current_error_if_false = rules[cnt].return_if_false;
                            current_error_execute = rules[cnt].execute_on_init;
                        }

                        //  LOOP ON AVAILABLE RULES REPLACEMENT

                        //  #1 - REPLACEMENTS - "ruleStateReplacements"
                        //                           
                        // ----- RELATED TO STATE
                        for (cnt2 = 0, len2 = binding.def.ruleStateReplacements.length; cnt2 < len2; cnt2++)
                        {
                            //  CURRENT REPLACEMENT IS INSIDE THE CURRENT RULE
                            b_d_rr = binding.def.ruleStateReplacements[cnt2];

                            if (current_rule.match(b_d_rr.exp) !== null)
                            {
                                //  REPLACE FIND OCCURENE INTO BASE EXP 

                                //	--DEBUG_[ RULE STATE BEFORE ]
                                if (vnode.context.$root.$root.config.debugMode === true)
                                {
                                    console.log("Rule State before");
                                    console.log(current_rule);
                                }
                                //	--/DEBUG_[ RULE STATE BEFORE ]

                                mm = "STATE";
                                current_rule = current_rule.replace(b_d_rr.exp, binding.def.onUpdateReplace.bind(null, b_d_rr, current_value, binding, vnode, path, mm));
                            }
                        }

                        //  #2 - REPLACEMENTS - "ruleReplacements"
                        //                           
                        // ----- RELATED TO VALUE
                        for (cnt2 = 0, len2 = binding.def.ruleReplacements.length; cnt2 < len2; cnt2++)
                        {
                            //  CURRENT REPLACEMENT IS INSIDE THE CURRENT RULE
                            b_d_rr = binding.def.ruleReplacements[cnt2];

                            if (current_rule.match(b_d_rr.exp) !== null)
                            {
                                //  REPLACE FIND OCCURENE INTO BASE EXP       

                                //	--DEBUG_[ RULE STATE BEFORE ]
                                if (vnode.context.$root.$root.config.debugMode === true)
                                {
                                    console.log("Rule before");
                                    console.log(current_rule);
                                }
                                //	--/DEBUG_[ RULE STATE BEFORE ]

                                mm = "VALUE";
                                current_rule = current_rule.replace(b_d_rr.exp, binding.def.onUpdateReplace.bind(null, b_d_rr, current_value, binding, vnode, path, mm));
                            }
                        }

                        //  COMPILE RULE

                        //	--DEBUG_[ COMPILE RULE ]
                        if (vnode.context.$root.$root.config.debugMode === true)
                        {
                            console.log("COMPILED RULE [" + cnt + "]");
                            console.log(current_rule);
                            console.log(binding.def.extraRuleReplacements);
                        }
                        //	--/DEBUG_[ COMPILE RULE ]

                        //  #3 - REPLACEMENTS - "extraRuleReplacements"
                        //   
                        //  TO_NUMBER, LENGTH

                        //  REPLACE OTHER FUNCTIONS                    
                        for (cnt2 = 0, len2 = binding.def.extraRuleReplacements.length; cnt2 < len2; cnt2++)
                        {
                            current_rule = current_rule.replace(binding.def.extraRuleReplacements[cnt2].exp, binding.def.extraRuleReplacements[cnt2].fct.bind(null, binding));
                        }

                        //  EVALUATE RULES
                        rev = binding.def.evaluate(current_rule, vnode);

                        //	--DEBUG_[ EVALUATE RULES]
                        if (vnode.context.$root.$root.config.debugMode === true)
                        {
                            console.log("RESULT");
                            console.log(rev);
                        }
                        //	--/DEBUG_[ EVALUATE RULES ]                        


                        // ******************************************************************************************************************
                        // FOR VALIDATION
                        if (binding.modifiers.validation === true)
                        {
                            //  IF EVALUATE VALUE IS EQ TO ERROR_IF VALUE WE STOP THE PROCESS
                            // var r = binding.def.manageError(current_error_if, current_error_class, rev, vnode.context, current_error_label);
                            var r = this.manageError(current_error_if, current_error_class, rev, vnode.context, current_error_label);

                            if (this.$root.$refs["FORM-GENERATOR"].fullyLoaded)
                            {
                                //  IF RULE AS ATTACH ELEMENT(S)
                                if (typeof binding.value[cnt].attach !== "undefined")
                                {
                                    if (binding.value[cnt].attach.length !== 0)
                                    {
                                        this.manageTriggerAttachElements(cnt, el, binding, vnode, oVnode);
                                    }
                                }
                            }

                            //  CHECK IF ATTACH
                            if (r === "stop")
                            {
                                n_current_error_label = (ndx === "") ? current_error_label : current_error_label.replace("[X]", ndx);

                                //  APPEND MESSAGE TO GLOBAL ERROR MESSAGE CATCHER
                                //  WE SET ALSO THE UID OF THE ELEMENT, BECAUSE IN CASE OF CHECKBOX MULTI WE SHOULD HAVE MULTIPLE ERROR AND NOT ONE ERROR
                                //  FCT PUSH FILTER AFTER TO REMOVE DUPLICATE

                                if (typeof vnode.context.$parent.key3 !== "undefined")
                                {
                                    pe = vnode.context.validations + "^" + vnode.context.$parent.$parent.fieldUid + "^" + vnode.context.fieldUid;
                                }
                                else
                                {
                                    pe = vnode.context.fieldUid;
                                }

                                this.pushError(pe + "|" + n_current_error_label);

                                break;
                            }
                        }

                        // ******************************************************************************************************************
                        // FOR BEHAVIOUR
                        if (binding.modifiers.behaviour === true)
                        {
                            var ex_init = false;
                            //  IN CASE OF INIT BECAUSE NAMESPACE CONTENT VALUE "ON_INIT" WE KNOW THAT WE DON'T HAVE TO TAKE CARE OF PROPERTY "execute_on_init"
                            //  TO KNOW IF BEHAVIOUR SHOULD BE EXECTUED OR NOT
                            if (oVnode.namespace === "on_init")
                            {
                                ex_init = true;
                            }
                            this.manageBehave(rev, current_error_if_true, current_error_if_false, current_error_execute, ex_init, binding, vnode, path);

                        }
                    }
                }
            );

        },

        getPvar0: function(pVar, that, ndx, o)
        {
            if (o[ndx].name === pVar) return true;
        },
        getPvar1: function(pVar, that, ndx, o)
        {
            if (o[ndx].name === pVar.slice(2)) return true;
        },

        getPvar2: function(pVar, that, ndx, o)
        {
            if (o[ndx].name === pVar) return true;
        },
        /*
            GET ELEMENT TYPE
        */
        getElementType: function(el)
        {
            //  VARIABLES
            var v = [
                "type",
                "multiple",
                "mode"
            ].filter(function(o)
            {
                if (el.getAttribute(o) !== null) return el.getAttribute(o);
            }).map(function(o)
            {
                return el.getAttribute(o).toUpperCase();
            });
            return ([].concat([el.tagName], v)).join("-");
        },
        /*
            DEPENDING THE TYPE THE ARGUMENT WE TRANSFORM IT TO SUIT TO THE PARAMETER
        */
        parseArgumentBeforeEvaluation: function(vA, cV)
        {
            if (typeof vA === "string")
            {
                return JSON.stringify(vA);
            } //  IF TYPE OF VALUE IS ARRAY
            // else if (cV.constructor.toString().indexOf("Array") !== -1)
            else if (cV._isArray())
            {
                return JSON.stringify(vA);
            }
            // else if (cV.constructor.toString().indexOf("Object") !== -1)
            else if (cV.constructor._isObjec())
            {
                return JSON.stringify(vA);
            }

            return vA;
        },

        evaluate: function(str, vnode)
        {
            //  VAR
            window["that"] = this;
            window["vvnode"] = vnode;

            //  EXECUTE
            return new Function('return ' + str + '')();
        },

        /*
            FUNCTION RELATED TO : "ruleReplacements"
        */

        "ruleReplacementsFct": rule_replacements_fct,

        /*
            DATA

            (JSON.parse(JSON.parse('{"ABILITY":"true","VISIBILITY":"true"}').ABILITY) === false)
        */
        "ruleStateReplacements": rule_state_rplacements,
        "ruleReplacements": rule_replacements,
        "extraRuleReplacements": extra_rule_replacements,
        "regExp":
        {
            "IS_STARTING_WITH_DOUBLE_BACKET": /^{{/,
            "IS_SAME_LEVEL": /^\w+$/,
            "IS_ROOT": /^\.\/\w+$/,
            "IS_PARENTS": /^((?:\.\.\/)+)\w+$/,
            "GET_PARENTS": /(?:\.\.\/)*/gi,
            "GET_ELM_IN_PARENT": /[\w\-]+/gi
        },
        "eventsList":
        {
            "blur": ["INPUT-TEXT", "INPUT-NUMBER", "TEXTAREA", "INPUT-PASSWORD", "INPUT-HIDDEN", "INPUT-TEXT-DROPDOWN", "INPUT-TEXT-AUTOCOMPLETE", "INPUT-TEXT-CURRENCY", "INPUT-TEXT-MAP", "INPUT-TEXT-DATE", "INPUT-TEXT-DS", "INPUT-TEXT-CP", "INPUT-TEXT-AN", "INPUT-TEXT-PRC", "INPUT-TEXT-TIME", 'INPUT-TEXT-M_COMPLETE'],
            "change": ["SELECT", "SELECT-MULTIPLE", "INPUT-FILE"],
            "click": ["INPUT-CHECKBOX-SINGLE", "INPUT-CHECKBOX-MULTI", "INPUT-RADIO"],
            "input": ["INPUT-RANGE", "INPUT-TEXT-FORMAT", "INPUT-TEXT-COF"],
            "custom-repeater-table": ["TABLE-TABLE"],
            "custom-repeater-tab": ["UL-TABS"]
        }
    }
);