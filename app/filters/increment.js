Vue.filter(
    'increment',
    function(value)
    {
        value = parseInt(value, 10);
        return value + 1;
    }
);