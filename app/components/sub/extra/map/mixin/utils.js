/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN MAP UTILS

var Map_Utils_Mixin = {

    methods:
    {
        /*
            #1 - Type of Layers
            #2 - Take care of muuid
        */
        /*"map_utils_getLayers": function(m, t, u)
        {
            var tmp_data = [];

            m.eachLayer(
                function(o)
                {
                    for (var cnt = 0, len = t.length; cnt < len; cnt++)
                    {
                        if (o instanceof L["" + t[cnt] + ""])
                        {
                            if (u === false || (u === true && typeof o.options.muuid !== "undefined"))
                            {
                                tmp_data.push(o);
                            }
                        }
                    }
                }
            );

            return tmp_data;
        },
        */
        /*
            GET COORDNATES OF POLYGONS
        */
        "map_utils_get_polygon_coord": function(m, u)
        {
            var p = [];

            m.eachLayer(
                function(z)
                {
                    if (z instanceof L.Polygon && typeof z.options.muuid !== "undefined")
                    {
                        if (z.options.muuid !== u)
                        {
                            p.push(z.toGeoJSON().geometry.coordinates);
                        }
                    }
                }
            );

            return p;
        },
        /*
            DISABLE/ENABLE MAP INTERACTION
            
            https://gis.stackexchange.com/questions/54454/disable-leaflet-interaction-temporary
        */
        "disabledMapInteraction": function()
        {
            this.map.dragging.disable();
            this.map.touchZoom.disable();
            this.map.doubleClickZoom.disable();
            this.map.scrollWheelZoom.disable();
            this.map.boxZoom.disable();
            this.map.keyboard.disable();
            if (this.map.tap) this.map.tap.disable();
            this.$el.querySelector('.map').style.cursor = 'default';
        },
        "enabledMapInteraction": function()
        {
            this.map.dragging.enable();
            this.map.touchZoom.enable();
            this.map.doubleClickZoom.enable();
            this.map.scrollWheelZoom.enable();
            this.map.boxZoom.enable();
            this.map.keyboard.enable();
            if (this.map.tap) this.map.tap.enable();
            this.$el.querySelector('.map').style.cursor = 'grab';
        },

        /*
            CHECK CURRENT OS
        */
        "currentOs": function()
        {
            var nu = navigator.userAgent;
            var na = navigator.appVersion;
            var current_os = {
                "windows": /win/.test(na.toLowerCase()),
                "mac_os": /mac/.test(na.toLowerCase()),
                "unix": /x11/.test(na.toLowerCase()),
                "linux": /linux/.test(na.toLowerCase()),
                "android": /android/.test(na.toLowerCase()) && /mobile/.test(na.toLowerCase()),
                "ipad": /ipad/.test(nu.toLowerCase()),
                "iphone": /iphone/.test(nu.toLowerCase()),
                "ipod": /ipod/.test(nu.toLowerCase()),
                "web_os": /webos/.test(nu.toLowerCase()),
                "meego": /meego/.test(nu.toLowerCase()),
                "window_phone": /windows phone/i.test(nu.toLowerCase()),
                "chrome_os": /(CrOS)/.test(nu),
                "firefox_os": (nu.indexOf('Firefox') > -1 && nu.indexOf("Mobile") > -1),
                "blackBerry": /BlackBerry/.test(nu),
                "amiga_os": /AmigaOS/.test(nu)
            };

            return current_os;
        }
    }
};