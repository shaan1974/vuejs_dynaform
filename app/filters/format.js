Vue.filter(
    'formatNumber',
    function(value)
    {
        value = parseFloat(value);
        return value.format(2, 3, '.', ',');
    }
);

Vue.filter(
    'textAreaToHtml',
    function(value)
    {
        return value.replace(/\r?\n/g, '<br />');
    }
);

Vue.filter(
    'crypt',
    function(value)
    {
        return ("*").repeat(value.length);
    }
);