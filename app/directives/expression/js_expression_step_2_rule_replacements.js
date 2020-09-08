var rule_replacements = [
    {
        "exp": /IS_EMPTY\((.*?)\)/gi,
        "aka": "{{THIS}}",
        "rep": "( ({{P1}} == null) || ({{P1}}.hasOwnProperty('length') && {{P1}}.length === 0) || ({{P1}}.constructor === Object && Object.keys({{P1}}).length === 0) )"
    },
    {
        "exp": /OBJECT_LENGTH\((.*?)\)/gi,
        "aka": "{{THIS}}",
        "rep": "Object.keys({{P1}}).length"
    },
    {
        "exp": /VALUE\((.*?)\)/gi,
        "aka": "{{THIS}}",
        "rep": "{{P1}}"
    },
    {
        "exp": /IS_FORMAT\((\w+),(.*?)\)/,
        "aka": "{{THIS}}",
        "rep2": "that.isFormat({{P1}},{{P2}})",
        "rep": "that.ruleReplacementsFct.isFormat({{P1}},{{P2}})"
    },
    {
        "exp": /IS_REG_FORMAT\("(.*?)",(.*?)\)/,
        "aka": "{{THIS}}",
        "rep": "that.isRegFormat({{P1}},{{P2}})",
        "rep2": "that.ruleReplacementsFct.isRegFormat({{P1}},{{P2}})"
    },
    {
        "exp": /IS_PASSWORD\((.*?),(.*?)\)/,
        "aka": "{{THIS}}",
        "rep2": "that.isPassword({{P1}},{{P2}})",
        "rep": "that.ruleReplacementsFct.isPassword({{P1}},{{P2}})"
    },

    {
        "exp": /IS_RANGE_AMOUT\((.*?),'(.*?)',(.*?)\)/,
        "aka": "{{THIS}}",
        "rep2": "that.isRangeAmount({{P1}},{{P2}},{{P3}})",
        "rep": "that.ruleReplacementsFct.isRangeAmount({{P1}},{{P2}},{{P3}})"
    },
    {
        "exp": /IS_BETWEEN\((.*?),(.*?),(.*?)\)/,
        "aka": "{{THIS}}",
        "rep2": "that.isBetween({{P1}},{{P2}},{{P3}})",
        "rep": "that.ruleReplacementsFct.isBetween({{P1}},{{P2}},{{P3}})"
    },
    {
        "exp": /IS_CALCULATION\("(.*?)"\)/,
        "aka": "{{THIS}}",
        "rep2": "that.isCalculation({{P1}})",
        "rep": "that.ruleReplacementsFct.isCalculation({{P1}})"
    }
];