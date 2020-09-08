/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN MAP EVENTS MARKERS

var Map_Gm_Markers_Mixin = {

    //  **************************************************************************************************************************************************
    //  MOUNTED
    //
    mounted: function()
    {
        this.total.markers = 0;
    },
    methods:
    {
        /*  **************************************************************************************************************************************************
             IS MAXIMUM REACH
             So no display of the icon into the toolbar.             
        */
        "maximumReachMarkers": function(map)
        {
            if (map.__component__.builded_config.maximumMakers != Number.MAX_SAFE_INTEGER)
            {
                m_none = (map.__component__.total.markers >= map.__component__.builded_config.maximumMakers) ? "none" : "";
                map.pm.Toolbar.buttons.drawMarker.buttonsDomNode.style.display = "" + m_none + "";
                if (m_none === "none")
                {
                    //  DISABLE ACTION ON MARKER
                    map.pm.disableDraw('Marker');
                }
            }
        },
        /*  **************************************************************************************************************************************************
             COMPUTED
        */
        "computedMarkers": function()
        {
            if (this.builded_config.drawMarker === true)
            {
                return "" + this.getLabel(this.$root, "MAP_MARKERS") + " [" + this.value.markers.length + "]";
            }
            return "";
        },
        /*  **************************************************************************************************************************************************
             CREATE MARKERS

             CALL ON INIT WHEN THE MARKER COMING FROM DATA SHOULD BE INSERTED INTO THE MAP
        */
        "createMarkers": function(map)
        {
            if (this.value.markers.length === 0) return true;

            //	--DEBUG_[ create markers ]
            if (this.$root.config.debugMode === true)
            {
                console.log("CREATE MARKERS");
                console.log(this.value.markers);
            }
            //	--/DEBUG_[ create markers ]

            var markers = this.value.markers;
            var op;
            var markersCluster = L.markerClusterGroup();
            var rm;

            for (var cnt1 = 0, len1 = markers.length; cnt1 < len1; cnt1++)
            {
                op = {};
                op.latlng = {
                    "lat": markers[cnt1][0],
                    "lng": markers[cnt1][1]
                };

                rm = this.createMarker(op, map, this.value.markersConfig[cnt1], this.value.markersClass[cnt1], this.value.markersUid[cnt1]);
                // this.createMarker(op, map, this.value.markersConfig[cnt1] );

                //  IF WE ARE IN DISPLAY MODE SO THE MARKER CREATED INTO "createMarker" IS ADDED TO THE CLUSTER 
                //
                if (this.isDisplayMode() === true)
                {
                    markersCluster.addLayer(rm);
                }
            }

            //  IN CASE OF DISPLAY MODE WE ADD THE MARKERS-CLUSTER TO THE MAP OBJECT
            //
            if (this.isDisplayMode() === true)
            {
                map.addLayer(markersCluster);
            }
        },
        "createMarker": function(e, map, p, cl, uuid)
        {
            //  BASE ICON
            // 
            //  DEFINE BASE ICON IN DIV FORMAT
            //
            // var iconBase = L.divIcon(map.__component__.builded_config.makerConfig.base);
            var bOject = Object.assign(
            {}, map.__component__.builded_config.makerConfig.base,
            {
                className: "" + map.__component__.builded_config.makerConfig.base.className + " " + cl
            });
            var iconBase = L.divIcon(bOject);

            //  DEFINE MARKER
            //
            var marker = L.marker(e.latlng,
            {
                muuid: uuid,
                /*this.shortUuid(),*/
                draggable: false,
                icon: iconBase
            }); /*.addTo(map);*/

            //  IF WE ARE NOT IN DISPLAY MODE WE ADD DIRECTLY THE MARKER TO THE MAP
            //  
            if (this.isDisplayMode() === false)
            {
                marker.addTo(map);
            }

            //  ATTACH POPUP TO MARKER
            //
            this.attachPopup(marker, p);

            //  EVENTS FOR GEOMAN
            //
            map.fireEvent("pm:create",
            {
                shape: "Marker",
                marker: marker,
                layer: marker,
                source: "init" /* MEAN THAT WHEN CALL PM:CREATE -> this.event_main_create the marker switch section know if the icon should be redifined or not */
            });

            //  WE RETURN THE MARKER ITSELF IN CASE WE ARE IN DISPLAY MODE
            //
            return marker;
        },
        /*  **************************************************************************************************************************************
        /*  EVENTS
        */
        /*  **************************************************************************************************************************************
            MARKER - DRAG
        */
        "event_Marker_drag": function(e) {},
        /*  **************************************************************************************************************************************
            MARKER - EDIT
        */
        "event_Marker_edit": function(e)
        {
            var map = e.target._map;
            this.set(map);
        },
        /*  **************************************************************************************************************************************
            MARKER - MOUSEOVER
        */
        "event_Marker_Mouseover": function(e)
        {
            //  IF IN REMOVE MODE SET NEW STYLE
            //
            if (e.target._map.pm._globalRemovalMode === true)
            {
                // iconDelete = L.divIcon(e.target._map.__component__.builded_config.makerConfig.delete);

                var cl = (e.target.getIcon().options.className.replace("" + this.builded_config.makerConfig.base.className + "", "")).trim();
                var bOject = Object.assign(
                {}, this.builded_config.makerConfig.delete,
                {
                    className: "" + this.builded_config.makerConfig.delete.className + " " + cl
                });

                iconDelete = L.divIcon(bOject);

                e.target.setIcon(iconDelete);
            }
        },
        /*  **************************************************************************************************************************************
            MARKER - MOUSEOUT
        */
        "event_Marker_Mouseout": function(e)
        {
            //  IF IN REMOVE MODE SET NEW STYLE
            //
            if (e.target._map.pm._globalRemovalMode === true)
            {
                // iconBase = L.divIcon(e.target._map.__component__.builded_config.makerConfig.base);

                var cl = (e.target.getIcon().options.className.replace("" + this.builded_config.makerConfig.delete.className + "", "")).trim();
                var bOject = Object.assign(
                {}, this.builded_config.makerConfig.base,
                {
                    className: "" + this.builded_config.makerConfig.base.className + " " + cl
                });

                iconBase = L.divIcon(bOject);

                e.target.setIcon(iconBase);
            }
        }
    }
};