/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN MAP BUTTONS

var Map_Buttons_Mixin = {

    methods:
    {
        /*
            MAIN FUNCTION TO ADD BUTTON(S)
        */
        "new_tool_buttons": function()
        {
            //  DEPENDING OF INLINE MAP OR NOT THE MAP REFERENCE IS DIFFERENT TO GET
            //
            var m = (typeof this.map === "undefined") ? this.$root.$refs["FORM-GENERATOR"].map : this.map;

            //  BUTTON FIT TO MAP
            //
            L.easyButton('leaflet-control-fit', function(btn, map)
            {
                map.__component__.map_fit();
            }, "" + this.getLabel(this.$root, "MAP_FIT_TITLE") + "").addTo(m);

            //  BUTTON LOCALISE GPS POSTION
            //
            L.easyButton('leaflet-control-gl', function(btn, map)
            {
                map.__component__.get_user_geolocation();
            }, "" + this.getLabel(this.$root, "MAP_GPS_TITLE") + "").addTo(m);
        },
        /*
            BUTTON ACTIONS
        */
        /*
            FIT MAP TO SEE ALL ELEMENTS INSIDE
        */
        "map_fit": function()
        {
            var map = (typeof this.map === "undefined") ? this.$root.$refs["FORM-GENERATOR"].map : this.map;
            var tmp_data = [];

            map.eachLayer(
                function(o)
                {
                    if (o instanceof L.Marker || o instanceof L.Polygon || o instanceof L.Path || o instanceof L.MarkerCluster)
                    {
                        if (typeof o.options.muuid !== "undefined")
                        {
                            tmp_data.push(o);
                        }
                    }
                }
            );

            if (tmp_data.length !== 0)
            {
                var group = new L.featureGroup(tmp_data);
                map.fitBounds(group.getBounds());
            }
        },
        /*
            GET USER LOCATION
        */
        "get_user_geolocation": function()
        {
            //  IF GEOLOCATION HAS BEEN SAVE WE USE IT
            //
            if (this.currentGeolocation !== "")
            {
                this.map.setZoom(15);
                this.map.panTo(this.currentGeolocation);
            }
            else
            {
                //  IN CASE OF CHROMIUM BROWSER SOMETIME THE NAVIGATOR GEOLOCATION IS NOT RUNNING PERFECTLY SO WE USE THIS SERVICE
                //
                if (window.navigator.plugins["Chromium PDF Plugin"])
                {
                    var _getDataLoc = function(that, response)
                    {
                        var j = response.data;
                        that.map.setZoom(15);
                        that.map.panTo(new L.LatLng(j.lat, j.lon));
                        that.currentGeolocation = new L.LatLng(j.lat, j.lon);
                    };

                    axios(
                        {
                            method: 'get',
                            url: "http://ip-api.com/json",
                            responseType: 'stream',
                        })
                        .then(_getDataLoc.bind(null, this));
                }
                else
                {
                    var fct_SHOW_POSITION = function(that, position)
                    {
                        // console.log("x - Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
                        that.map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
                        that.currentGeolocation = new L.LatLng(position.coords.latitude, position.coords.longitude);
                    };

                    try
                    {
                        this.map.setZoom(15);
                        navigator.geolocation.getCurrentPosition(fct_SHOW_POSITION.bind(null, this));
                    }
                    catch (e)
                    {}
                }
            }
        }
    }
};