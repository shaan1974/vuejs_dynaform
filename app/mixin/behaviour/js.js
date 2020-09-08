/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN BEHAVIOUR

var Behaviour_Mixin = {

    computed:
    {
        i_behaviours: function()
        {
            return (typeof this.behaviours !== "undefined") ? this.getBehaviours(this.$root, this.behaviours) : [];
        }
    },
    data: function()
    {
        return {

            "x": false,
        };
    },
    created: function()
    {
        if (typeof this.$parent.formData === "undefined")
        {
            this.$parent.$parent.$on('event_setAbility', this.setAbility);
            this.$parent.$parent.$on('event_setVisibility', this.setVisibility);
        }
    },
    methods:
    {
        "notEmptyObject": function(someObject)
        {
            return Object.keys(someObject).length;
        },
        /*
            GET BEHAVIOUR
        */
        "getBehaviours": function(root, val)
        {
            return (typeof root.behaviours_rules["" + val + ""] === "undefined") ? [] : root.behaviours_rules["" + val + ""];
        },
        /*
            MANAGE BEHAVIOUR
        */
        "manageBehave": function(rev, current_error_if_true, current_error_if_false, current_error_execute, ex_init, binding, vnode, path)
        {
            var behave_action = (rev === true) ? current_error_if_true : current_error_if_false;
            var ex = true;

            //	--DEBUG_[ MANAGE BEHAVIOUR ]
            if (vnode.context.$root.config.debugMode === true)
            {
                console.log("Behave...");
                console.log(behave_action);
            }
            //	--/DEBUG_[ MANAGE BEHAVIOUR ]            

            for (var cnt4 = 0, len4 = behave_action.length; cnt4 < len4; cnt4++)
            {
                //  ON INIT OR NOT 
                ex = true;
                if (current_error_execute[cnt4] === false && ex_init === true)
                {
                    //  IF ON INIT AND EXECUTED ACTION IS FALSE SO DON'T EXECUTE BEHAVIOUR
                    ex = false;
                }

                if (ex === true)
                {
                    for (var cnt2 = 0, len2 = binding.def.ruleStateReplacements.length; cnt2 < len2; cnt2++)
                    {
                        //  CURRENT REPLACEMENT IS INSIDE THE CURRENT RULE
                        b_d_rr = binding.def.ruleStateReplacements[cnt2];

                        if (behave_action[cnt4].match(b_d_rr.exp) !== null)
                        {
                            //  REPLACE FIND OCCURENE INTO BASE EXP       

                            //	--DEBUG_[ MANAGE BEHAVIOUR RULE STATE BEFORE ]
                            if (vnode.context.$root.config.debugMode === true)
                            {
                                console.log("Rule State before");
                                console.log(behave_action[cnt4]);
                            }
                            //	--/DEBUG_[ MANAGE BEHAVIOUR RULE STATE BEFORE ]

                            mm = "ELEMENT";
                            behave_action[cnt4].replace(b_d_rr.exp, binding.def.onUpdateReplace.bind(null, b_d_rr, behave_action[cnt4], binding, vnode, path, mm));
                        }
                    }
                }
            }
        }
    }
};