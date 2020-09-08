var rule_replacements_fct = {

    /* **************************************************************************************************************************************************************
        IS FORMAT
    */
    "isFormat": function(f, v)
    {
        // https://www.rapidtables.com/code/text/unicode-characters.html

        var regExp = {

            "IP": "^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))*$",
            "URL": "^http\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,12}(/\S*)?$",
            "EMAIL": "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$",
            "HEXCOLOR": "^#([0-9a-f]{6}$",
            "MAC_ADRESS": "^[a-fA-F0-9:]{17}|[a-fA-F0-9]{12}$",
            "INTEGER": "^\d+$",
            "SIGN_INTEGER": "^-\d+$",
            "ALPHA": "^[a-zA-Z\_\u00C0-\u017F\s]*$",
            "ALPHA_NUM": "^[a-zA-Z\_\u00C0-\u017F\s\d]*$",
            "VISA_CARD": "^4[0-9]{12}(?:[0-9]{3})?$",
            "MASTER_CARD": "^5[1-5][0-9]{14}$"
        };

        return ("" + v + "").isReg(regExp["" + f + ""]);
    },

    /*  **************************************************************************************************************************************************************
        IS REG FORMAT
    */
    "isRegFormat": function(f, v)
    {
        return ("" + v + "").isReg(f);
    },

    /*  **************************************************************************************************************************************************************
        IS_PASSWORD
        
            VVNODE,THAT VARS ARE WINDOW VARS DEFINED INTO "evaluate"
    */
    "isPassword": function(f, v)
    {
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
        var currentFormat = vvnode.context.$root.config.password.formats[v];
        var specialChars = escapeRegExp(vvnode.context.$root.config.password.specials_chars);

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

        return (rV.indexOf(false) === -1) ? true : false;
    },

    /*  **************************************************************************************************************************************************************
        IS RANGE AMOUNT
    */
    "isRangeAmount": function(v, m, c)
    {
        var s = parseInt(v.split(",")[0]);
        var e = parseInt(v.split(",")[1]);
        var r = e - s;

        switch (m)
        {
            case "MIN":
                return (r < parseInt(c)) ? true : false;
            case "MAX":
                return (r > parseInt(c)) ? true : false;
            case "EQ":
                return (r === parseInt(c)) ? true : false;
        }

        return false;
    },

    /*  **************************************************************************************************************************************************************
        IS BETWEEN
    */
    "isBetween": function(v, min, max)
    {
        v = Number(v);
        min = Number(min);
        max = Number(max);

        return (v >= min && v <= max);
    },

    /*  **************************************************************************************************************************************************************
        IS CALCULATION
    */
    "isCalculation": function(exp)
    {
        //	--DEBUG_[ ISCALCULATION ]
        // if (window["vvnode"].context.$root.config.debugMode === true)
        if (window.vvnode.context.$root.config.debugMode === true)
        {
            console.log("____________________________________");
            console.log(this);
            // console.log(window["vvnode"].context);
            console.log(window.vvnode.context);
            console.log("EXP", exp);
            console.log("____________________________________");
        }
        //	--/DEBUG_[ ISCALCULATION ]            

        //  VAR
        var wFormulat = exp;
        // var that = window["vvnode"].context;
        var that = window.vvnode.context;

        //  REPLACEMENTS - VARIABLES
        var v = exp.match(/{{(.*?)}}/gi);

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
                        // fs = this.$root.formData;
                        fs = that.$root.formData;
                    }
                    else if (css === "__parentLevel")
                    {
                        //fs = this.getPath(this);
                        fs = that.getPath(that);
                        fs.pop();

                        if (fs[0].startsWith("z("))
                        {
                            fs.pop();
                            // fs.push(this.name);
                            fs.push(that.name);
                        }
                        // fs = this.buildPath('', fs, this);
                        fs = that.buildPath('', fs, that);
                    }
                }
                //  SUB RELATED TO ARRAY INDEX
                else if (css.startsWith("[*]"))
                {
                    e = css.split("_")[1];
                    // fs = fs.map(this.map.bind(null, e));
                    fs = fs.map(that.map.bind(null, e));
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
            // if (fs.constructor.toString().indexOf("Array") !== -1)
            if (fs._isArray())
            {
                fs = JSON.stringify(fs);
            }

            //  PATCH IF ELEMENT VALUE IS EMPTY WE SET IT TO ZERO5Q
            if (fs === "")
            {
                fs = "0";
            }

            wFormulat = wFormulat.replace(v[cnt], fs);
        }

        resultExpression = that.evaluate(wFormulat);

        return resultExpression;
        // return true;
    }
};