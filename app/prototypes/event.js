/*jshint sub:true*/
/*
    https://stackoverflow.com/questions/21817397/event-handler-namespace-in-vanilla-javascript/21817552
*/
var events = {
    on: function(event, cb, opts)
    {
        if (!this.namespaces) // save the namespaces on the DOM element itself
            this.namespaces = {};

        if (typeof event === "string")
        {
            event = [event];
        }

        for (var cnt = 0, len = event.length; cnt < len; cnt++)
        {
            this.namespaces[event[cnt]] = cb;
            var options = opts || false;

            this.addEventListener(event[cnt].split('.')[0], cb, options);
        }

        return this;
    },
    once: function(event, cb)
    {
        if (!this.namespaces) // save the namespaces on the DOM element itself
            this.namespaces = {};

        if (typeof event === "string")
        {
            event = [event];
        }

        for (var cnt = 0, len = event.length; cnt < len; cnt++)
        {
            this.namespaces[event[cnt]] = cb;
            var options = {
                once: true
            };

            this.addEventListener(event[cnt].split('.')[0], cb, options);
        }

        return this;
    },
    off: function(event)
    {
        if (typeof event === "string")
        {
            event = [event];
        }

        for (var cnt = 0, len = event.length; cnt < len; cnt++)
        {
            this.removeEventListener(event[cnt].split('.')[0], this.namespaces[event[cnt]]);
            delete this.namespaces[event[cnt]];
        }

        return this;
    },
    trigger: function(eventName)
    {
        var event = document.createEvent('Event');
        event.initEvent('' + eventName.split(".")[0] + '', true, true); //can bubble, and is cancellable

        if (eventName.split(".").length === 2)
        {
            event.namespace = eventName.split(".")[1];
        }
        this.dispatchEvent(event);
    }
};

// Extend the DOM with these above custom methods
document.on = Element.prototype.on = events.on;
document.off = Element.prototype.off = events.off;
document.once = Element.prototype.once = events.once;
document.trigger = Element.prototype.trigger = events.trigger;

window.on = Element.prototype.on = events.on;
window.off = Element.prototype.off = events.off;
window.once = Element.prototype.once = events.once;
window.trigger = Element.prototype.trigger = events.trigger;