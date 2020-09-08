/*
    ARRAY
*/
Object.defineProperty(Array.prototype, '_isArray',
{
    value: function()
    {
        return true;
    }
});

Object.defineProperty(Array.prototype, '_isObject',
{
    value: function()
    {
        return false;
    }
});

Object.defineProperty(Array.prototype, '_isString',
{
    value: function()
    {
        return false;
    }
});
/*
    OBJECT
*/
Object.defineProperty(Object.prototype, '_isArray',
{
    value: function()
    {
        return false;
    }
});

Object.defineProperty(Object.prototype, '_isObject',
{
    value: function()
    {
        return true;
    }
});

Object.defineProperty(Object.prototype, '_isString',
{
    value: function()
    {
        return false;
    }
});
/*
    STRING
*/
Object.defineProperty(String.prototype, '_isArray',
{
    value: function()
    {
        return false;
    }
});

Object.defineProperty(String.prototype, '_isObject',
{
    value: function()
    {
        return false;
    }
});

Object.defineProperty(String.prototype, '_isString',
{
    value: function()
    {
        return true;
    }
});