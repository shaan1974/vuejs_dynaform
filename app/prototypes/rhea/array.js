/*jshint bitwise: false*/
/*jshint sub:true*/

Object.defineProperty(Array.prototype, '_uniq',
{
    value: function(a, b)
    {
        for (a = this, b = a.length; b--; a.indexOf(a[b]) < b && a.splice(b, 1));
        return a;
    }
});

Object.defineProperty(Array.prototype, '_fEach',
{
    value: function(_callback)
    {
        var obj = this;

        for (var cnt = 0, len = this.length; cnt < len; cnt++)
        {
            _callback.call(obj, obj[cnt], cnt, obj);
        }
    }
});

Object.defineProperty(Array.prototype, '_last',
{
    value: function()
    {
        return this[this.length - 1];
    }
});

Object.defineProperty(Array.prototype, '_intersection',
{
    value: function(arr)
    {
        return this.filter(function(pp, ii)
        {
            if (arr.indexOf(pp) !== -1) return pp;
        });
    }
});

Object.defineProperty(Array.prototype, '_remove',
{
    value: function()
    {
        var what, a = arguments,
            L = a.length,
            ax;
        while (L && this.length)
        {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1)
            {
                this.splice(ax, 1);
            }
        }
        return this;
    }
});

Object.defineProperty(Array.prototype, '_remove2',
{
    value: function(v)
    {
        var p = this.indexOf(v);
        return [].concat(this.slice(0, p), months.slice(p + 1, this.length));
    }
});