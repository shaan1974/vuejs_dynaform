//	MIXIN MAP_FULLSCREEN

var Map_Os_Mixin = {

    methods:
    {
        "windowOnScrollEvent": function()
        {
            //  VARIABLES
            var that = this;

            //  WINDOW SCROLL
            var onScroll = function(that, e)
            {
                var fg = that.$root.$refs["FORM-GENERATOR"];

                if (typeof fg.map === "undefined") return true;

                var cMap = fg.map_ref_component.$el._Qs(".map");

                if (cMap === null) return true;

                if (cMap._hasClass("map_ok"))
                {
                    if (fg.map._isFullscreen === true)
                    {
                        return false;
                    }
                    //  MEAN THAT USER CLICK ON THE ONE THAT IS ALREADY OPEN
                    fg.map.remove();
                    fg.map = undefined;
                    cMap._removeClass("map_ok");

                    if (fg.map_ref_component.$el === that.$el)
                    {
                        fg.map_ref_component = {};
                    }
                }
            };

            window.once(["scroll.map", "resize.map"], onScroll.bind(null, that));
        }
    }
};