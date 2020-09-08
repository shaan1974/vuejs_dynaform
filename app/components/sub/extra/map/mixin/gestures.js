//	MIXIN MAP_FULLSCREEN

var Map_Gestures_Mixin = {

    methods:
    {
        /*
        INIT GESTURES
    */
        "initGesture": function()
        {
            //  CANCEL SCROLLWHELL
            //
            //  DEPENDING OF INLINE MAP OR NOT THE MAP REFERENCE IS DIFFERENT TO GET
            //
            var m = (typeof this.map === "undefined") ? this.$root.$refs["FORM-GENERATOR"].map : this.map;

            // this.map.scrollWheelZoom.disable();
            m.scrollWheelZoom.disable();

            //  GESTURE FUNCTION
            //
            var internalGesture = function(that, e)
            {
                if (that.$el.querySelector(".map").isEqualNode(e.target))
                {
                    if ((e.target._hasClass("leaflet-container") || e.target.closest(".leaflet-container") !== null) && e.ctrlKey === true)
                    {
                        var m = (typeof that.map === "undefined") ? that.$root.$refs["FORM-GENERATOR"].map : that.map;
                        //  VARS
                        //
                        var current_zoom = m.getZoom();
                        var max_zoom = m.getMaxZoom();
                        var min_zoom = m.getMinZoom();

                        //  DELTA TRICK FOR FIREFOX
                        //  http://www.javascriptkit.com/javatutors/onmousewheel.shtml
                        //
                        var evt = window.event || e; //equalize event object
                        var delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta;

                        if (delta / 120 > 0)
                        {
                            current_zoom = (current_zoom + 1 >= max_zoom) ? max_zoom : (current_zoom + 1);
                        }
                        else
                        {
                            current_zoom = (current_zoom - 1 <= min_zoom) ? 0 : (current_zoom - 1);
                        }

                        m.setZoom(current_zoom);

                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                    else
                    {
                        if (e.ctrlKey === true)
                        {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                        }
                    }
                }
            };

            //  INIT EVENTS: "MOUSEWHEEL" AND "DOMMOUSESCROLL"
            //
            var events_name = ['mousewheel', 'DOMMouseScroll'];
            for (var cnt = 0, len = events_name.length; cnt < len; cnt++)
            {
                window.off("" + events_name[cnt] + ".map_" + this.fieldUid);
                window.on("" + events_name[cnt] + ".map_" + this.fieldUid, internalGesture.bind(null, this),
                {
                    passive: false
                });
            }
        }
    }
};