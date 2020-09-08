//	MIXIN DICO
/*
    _Qs("#app").__vue__.labels.FN="ok1..";
    _Qs("#app").__vue__.labels.AGE="ok2.."
*/
var Dico_Mixin = {

    mounted: function()
    {
        //  CHECK IF ELEMENT HAS CORRECT VALUE OR NOT
        //
        if (typeof this.options === "string")
        {
            //  ALL ELEMENTS WITH OPTIONS SHOULD NOT BE TAKEN IN COUNT SO WE CHECK WITH "optionsNoMountCheck" VARIABLE
            //
            if (this.$root.config.optionsNoMountCheck.indexOf("" + this.fieldType + "") !== -1)
            {
                return true;
            }

            //  VARIABLES
            //
            var v = [];
            var n = [];

            if (typeof this.value === "string")
            {
                v[0] = this.value;
            }

            if (typeof this.value === "object")
            {
                v = [].concat(this.value);
            }

            //  COMPARE CURRENT VALUE WITH THE ONE INTO DIC
            //
            for (var cnt = 0, len = v.length; cnt < len; cnt++)
            {
                for (var cnt2 = 0, len2 = this.i_options.length; cnt2 < len2; cnt2++)
                {
                    if (v[cnt] === this.i_options[cnt2].v)
                    {
                        n.push(v[cnt]);
                    }
                }
            }

            //  RESET VALUE
            //
            if (typeof this.value === "string")
            {
                this.setDataValue(n[0], true);
            }

            if (typeof this.value === "object")
            {
                this.setDataValue(n, true);
            }
        }
    },
    computed:
    {
        i_options: function()
        {
            if (this.options.constructor.toString().indexOf('String') !== -1)
            {
                // return this.getDico(this.$root, this.options);
                var tmp_dico;

                if (typeof this.z_options !== "undefined")
                {
                    tmp_dico = this.getDico(this.$root, this.z_options);
                }
                else
                {
                    tmp_dico = this.getDico(this.$root, this.options);
                }

                //  IN CASE OF DICO WITH ONLY ARRAY WE REBUILD THE STRUCTURE
                //
                //  THIS PART IS USE BY EX FOR LINK DROPDOWNS, DROPDOWN->CHECKBOXES, DROPDOWN->RADIOS
                //  ATTIRBUTES : linkTo , linkFrom. ( DRINK_TYPE -> DRINK_TYPE_CHOOOSE )
                //
                if (tmp_dico.constructor.toString().indexOf('Array') !== -1)
                {
                    if (tmp_dico.length === 0) return tmp_dico;

                    if (tmp_dico[0].constructor.toString().indexOf('String') !== -1)
                    {
                        return tmp_dico.map(function(o)
                        {
                            return {
                                "t": "" + o + "",
                                "v": "" + o + ""
                            };
                        });
                    }
                }

                return tmp_dico;
            }
            return this.options;
        }
    },
    methods:
    {
        getDico: function(root, val)
        {
            //  CHECK IF DYNAMIC DICTIONNARY
            //  FUNCTIONS ARE LOCATED INTO MIXIN_DYNAMIC/DIC/JS.JS
            //
            if (typeof this["DYNAMIC_" + val + ""] === "function")
            {
                //	--DEBUG_[ call dynamic dictionnary ]
                if (this.$root.config.debugMode === true)
                {
                    console.log("CALL DYNAMIC DICTIONARY");
                }
                //	--/DEBUG_[ call dynamic dictionnary ]                   
                return this["DYNAMIC_" + val + ""]();
            }

            //  IF LINK_TO
            //
            if (typeof this.linkTo !== "undefined")
            {
                var linkDic;

                //  IF ON FIRST LEVEL
                if (typeof this.$parent.formData === "undefined")
                {
                    var path = this.getPath(this);
                    linkDic = this.getValue(this.linkTo, path, this);
                }
                //  IF INSIDE DATA MODEL
                else
                {
                    linkDic = this.$parent.formData["" + this.linkTo + ""];
                }

                return (typeof root.$root.dictionnaries["" + val + ""][linkDic] === "undefined") ? [] : root.$root.dictionnaries["" + val + ""][linkDic];
            }
            else
            {
                return (typeof root.$root.dictionnaries["" + val + ""] === "undefined") ? [] : root.$root.dictionnaries["" + val + ""];
            }
        }
    }
};