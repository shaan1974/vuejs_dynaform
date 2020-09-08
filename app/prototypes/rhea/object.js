/*
	OBJECT
*/
/*
	https://jsperf.com/lodash-foreach-vs-custom-for-each
*/
Object.defineProperties(
    Object.prototype,
    {
        '_fEach':
        {
            value: function(callback)
            {
                if (this === null)
                {
                    throw new TypeError('Not an object');
                }

                var obj = this;

                for (var key in obj)
                {
                    if (obj.hasOwnProperty(key))
                    {
                        if (typeof arguments[1] === "undefined")
                        {
                            callback.call(obj, obj[key], key, obj);
                        }
                        else
                        {
                            callback.call(obj, obj[key], key, obj, arguments[1]);
                        }
                    }
                }
            },
            writable: true
        }
    }
);