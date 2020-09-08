/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN - DYNAMIC DIC
// 
var DynaDic_Mixin = {

    methods:
    {
        "DYNAMIC_AUTO_GENERATED_A": function(o)
        {
            var dynaDic;
            var v = "users";

            //  IF ON FIRST LEVEL
            if (typeof this.$parent.formData === "undefined")
            {
                var path2 = this.getPath(this);
                dynaDic = this.getValue(v, path2, this);
            }
            //  IF INSIDE DATA MODEL
            else
            {
                dynaDic = this.$parent.formData["" + v + ""];
            }

            //  VARIABLES
            //
            var v_VAL = dynaDic.map(function(o)
            {
                return o.UID;
            });

            var v_TXT = dynaDic.map(function(o)
            {
                return o.name + " - " + o.grade;
            });

            var no = [
            {
                "v": "",
                "t": ""
            }];

            //  LOOP TO BUILD DICTIONNARY OBJECT
            //
            for (var cnt = 0, len = v_VAL.length; cnt < len; cnt++)
            {
                no.push(
                {
                    "v": "" + v_VAL[cnt] + "",
                    "t": "" + v_TXT[cnt] + ""
                });
            }

            //  RETURN OBJECT FOR DICTIONNARY
            //
            return no;
        },
        "DYNAMIC_AUTO_GENERATED_B": function(o)
        {
            var dynaDic;
            var v = "users";

            //  IF ON FIRST LEVEL
            if (typeof this.$parent.formData === "undefined")
            {
                var path2 = this.getPath(this);
                dynaDic = this.getValue(v, path2, this);
            }
            //  IF INSIDE DATA MODEL
            else
            {
                dynaDic = this.$parent.formData["" + v + ""];
            }

            //  VARIABLES
            //
            var v_VAL = dynaDic.map(function(o)
            {
                return o.UID;
            });

            var v_TXT = dynaDic.map(function(o)
            {
                return o.name + " - " + o.grade;
            });

            var no = [];

            //  LOOP TO BUILD DICTIONNARY OBJECT
            //
            for (var cnt = 0, len = v_VAL.length; cnt < len; cnt++)
            {
                no.push(
                {
                    "v": "" + v_VAL[cnt] + "",
                    "t": "" + v_TXT[cnt] + ""
                });
            }

            //  RETURN OBJECT FOR DICTIONNARY
            //
            var tmp = [];
            for (var cnt2 = 0, len2 = this.value.length; cnt2 < len2; cnt2++)
            {
                if (v_VAL.indexOf(this.value[cnt2]) !== -1)
                {
                    tmp.push(this.value[cnt2]);
                }
            }

            return no;
        }
    }
};