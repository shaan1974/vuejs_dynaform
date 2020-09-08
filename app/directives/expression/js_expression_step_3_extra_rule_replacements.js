var extra_rule_replacements = [
    {
        "exp": /TO_NUMBER\(['"]{1}([\w\.\-]+)['"]{1}\)/gi,
        "fct": function()
        {
            return " new Number('" + arguments[2] + "').valueOf() ";
        }
    },
    /*  REPLACEMENT FOR STRING */
    {
        "exp": /LENGTH\('(.*?)'\)/gi,
        "fct": function()
        {
            return " ('" + arguments[2] + "').length ";
        }
    },
    /*  REPLACEMENT FOR ARRAY */
    {
        "exp": /LENGTH\((.*?)\)/gi,
        "fct": function()
        {
            return " " + arguments[2] + ".length ";
        }
    }
];