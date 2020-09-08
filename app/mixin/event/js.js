//	MIXIN EVENT

var Event_Mixin = {

    mounted: function()
    {
        this.initDestroyComponent();
    },
    methods:
    {
        "eventTrigger": function(elm, eventName)
        {
            var event = document.createEvent('Event');
            event.initEvent("" + eventName + "", true, true);
            elm.dispatchEvent(event);
        },

        "simulateVB": function()
        {
            this.$nextTick(
                function()
                {
                    if (this.$el.querySelector("[v]") !== null)
                    {
                        this.eventTrigger(this.$el.querySelector("[v]"), 'validate');
                    }

                    if (this.$el.querySelector("[b]") !== null)
                    {
                        this.eventTrigger(this.$el.querySelector("[b]"), 'behave');
                    }
                }
            );
        },
        /*
            LINKED TO MIXIN/REPEATER.JS
        */
        "initDestroyComponent": function()
        {
            //  IF INSIDE REPEATER AND ELEMENT HAS METHOD DESTROY
            //  WE RUN THIS EVENT TO BE ABLE TO REMOVE ALL COMPONENTS DECLARATION TO AVOID MEMORY LEAKS
            if (typeof this.$parent.formData === "undefined" && typeof this.destroy !== "undefined")
            {
                this.$parent.$parent.$on('event_destroyComponents', this.destroy);
            }
        }
    }
};