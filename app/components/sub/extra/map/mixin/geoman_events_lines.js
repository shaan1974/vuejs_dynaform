/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN MAP EVENTS POLYLINES

var Map_Gm_Polylines_Mixin = {

    //  **************************************************************************************************************************************************
    //  MOUNTED
    //
    mounted: function()
    {
        this.total.polylines = 0;
    },
    methods:
    {
        /*  **************************************************************************************************************************************************
             IS MAXIMUM REACH
             So no display of the icon into the toolbar.             
        */
        "maximumReachPolylines": function(map)
        {
            if (map.__component__.builded_config.maximumPolylines != Number.MAX_SAFE_INTEGER)
            {
                p_none = (map.__component__.total.polylines >= map.__component__.builded_config.maximumPolylines) ? "none" : "";
                map.pm.Toolbar.buttons.drawPolyline.buttonsDomNode.style.display = "" + p_none + "";
                if (p_none === "none")
                {
                    //  DISABLE ACTION ON POLYLINES
                    map.pm.disableDraw('Polyline');
                }
            }
        },
        /*  **************************************************************************************************************************************************
             COMPUTED
        */
        "computedPolylines": function()
        {
            if (this.builded_config.drawPolyline === true)
            {
                return "" + this.getLabel(this.$root, "MAP_POLYLINES") + " [" + this.value.polylines.length + "]";
            }
            return "";
        },
        /*  **************************************************************************************************************************************************
             CREATE POLYLINES
        */
        "createPolylines": function(map)
        {
            if (this.value.polylines.length === 0) return true;

            //	--DEBUG_[ create polylines ]
            if (this.$root.config.debugMode === true)
            {
                console.log("CREATE POLYLINES");
                console.log(this.value.polylines);
            }
            //	--/DEBUG_[ create polylines ]                

            var polylines = this.value.polylines;
            for (var cnt2 = 0, len2 = polylines.length; cnt2 < len2; cnt2++)
            {
                // this.createPolyline(polylines[cnt2], map);
                this.createPolyline(polylines[cnt2], map, this.value.polylinesConfig[cnt2], this.value.polylinesUid[cnt2]);
            }
        },
        "createPolyline": function(d, map, p, uuid)
        {
            var latlngs = JSON.parse(JSON.stringify(d));
            var polyline = L.polyline(latlngs,
                Object.assign(map.__component__.builded_config.configPolylines,
                {
                    muuid: uuid /*this.shortUuid()*/ ,
                    draggable: false
                })).addTo(map);

            //  ATTACH POPUP TO MARKER
            //
            this.attachPopup(polyline, p);

            map.fireEvent("pm:create",
            {
                shape: "Line",
                marker: polyline,
                layer: polyline,
                source: "init" /* MEAN THAT WHEN CALL PM:CREATE -> this.event_main_create the marker switch section know if the icon should be redifined or not */
            });
        },
        /*  **************************************************************************************************************************************
        /*  EVENTS
        */
        /*  **************************************************************************************************************************************
            POLYLINE - DRAG END
        */
        "event_Polyline_drag_end": function(e)
        {
            var map = e.target._map;
            e.target.setStyle(e.target._map.__component__.builded_config.configPolylines);
            this.set(map);
        },
        /*  **************************************************************************************************************************************
            POLYLINE - VERTEX ADDED
        */
        "event_Polyline_vertexadded": function(e)
        {
            var map = e.target._map;
            this.set(map);
        },
        /*  **************************************************************************************************************************************
            POLYLINE - VERTEX REMOVED
        */
        "event_Polyline_vertexremoved": function(e)
        {
            var map = e.target._map;
            this.set(map);
        },
        /*  **************************************************************************************************************************************
            POLYLINE - MOUSE OVER
        */
        "event_Polyline_Mouseover": function(e)
        {
            //  IF IN REMOVE MODE SET NEW STYLE
            //
            if (e.target._map.pm._globalRemovalMode === true)
            {
                e.target.setStyle(e.target._map.__component__.builded_config.configStylesRemove);
            }
        },
        /*  **************************************************************************************************************************************
            POLYLINE - MOUSE OUT
        */
        "event_Polyline_Mouseout": function(e)
        {
            //  IF IN REMOVE MODE REVERT BASE STYLE
            //
            if (e.target._map.pm._globalRemovalMode === true)
            {
                e.target.setStyle(e.target._map.__component__.builded_config.configPolylines);
            }
        }
    }
};