Vue.filter(
    'split',
    function(value, p)
    {
        return value.split(",")[p];
    }
);

Vue.filter(
    'removeUid',
    function(value, p)
    {
        var ndx = value.indexOf("|");
        return value.slice(ndx + 1);
    }
);