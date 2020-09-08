var rule_state_rplacements = [
    {
        "exp": /IS_ENABLE\((.*?)\)/gi,
        "aka": "{{THIS}}",
        "rep": "(JSON.parse(JSON.parse('{{P1}}').ABILITY) === true)",

    },
    {
        "exp": /IS_DISABLED\((.*?)\)/gi,
        "aka": "{{THIS}}",
        "rep": "(JSON.parse(JSON.parse('{{P1}}').ABILITY) === false)",

    },
    {
        "exp": /IS_VISIBLE\((.*?)\)/gi,
        "aka": "{{THIS}}",
        "rep": "(JSON.parse(JSON.parse('{{P1}}').VISIBILITY) === true)",

    },
    {
        "exp": /IS_HIDDEN\((.*?)\)/gi,
        "aka": "{{THIS}}",
        "rep": "(JSON.parse(JSON.parse('{{P1}}').VISIBILITY) === false)",

    },
    /* DEDICATE TO BEHAVIOURS */
    {
        "exp": /SHOW_ELEMENT\((.*?)\)/gi,
        "aka": "{{THIS}}",
        "rep": "{{P1}}.set_prop('SHOW')",

    },
    {
        "exp": /HIDE_ELEMENT\((.*?)\)/gi,
        "aka": "{{THIS}}",
        "rep": "{{P1}}.set_prop('HIDE')",

    },
    {
        "exp": /ENABLE_ELEMENT\((.*?)\)/gi,
        "aka": "{{THIS}}",
        "rep": "{{P1}}.set_prop('ENABLE')",

    },
    {
        "exp": /DISABLE_ELEMENT\((.*?)\)/gi,
        "aka": "{{THIS}}",
        "rep": "{{P1}}.set_prop('DISABLE')",

    },
    {
        "exp": /SET_EMPTY\((.*?)\)/gi,
        "aka": "{{THIS}}",
        "rep": "{{P1}}.set_empty_value()",

    },
    {
        "exp": /SET_VALUE\((.*?),'(.*?)'\)/gi,
        "aka": "{{THIS}}",
        "rep": "{{P1}}.set_define_value('{{P2}}')",

    },
    {
        "exp": /SET_DEFAULT_VALUE\((.*?)\)/gi,
        "aka": "{{THIS}}",
        "rep": "{{P1}}.set_default_value()",
    },
    {
        "exp": /REPEATER_ADD\((.*?)\)/gi,
        "aka": "{{THIS}}",
        "rep": "{{P1}}.repeater_add()",
    },
    {
        "exp": /REPEATER_REMOVE_LAST\((.*?)\)/gi,
        "aka": "{{THIS}}",
        "rep": "{{P1}}.repeater_remove_last()",
    },
    {
        "exp": /REPEATER_REMOVE_NDX\((.*?),'(.*?)'\)/gi,
        "aka": "{{THIS}}",
        "rep": "{{P1}}.repeater_remove_ndx('{{P2}}')",

    },
    {
        "exp": /REPEATER_REMOVE_ALL\((.*?)\)/gi,
        "aka": "{{THIS}}",
        "rep": "{{P1}}.repeater_remove_all()",
    }
];