/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN MAP EVENTS CIRCLES

var Map_Gm_Circles_Mixin = {

    //  **************************************************************************************************************************************************
    //  MOUNTED
    //
    mounted: function()
    {
        this.total.circles = 0;
    },
    methods:
    {
        /*  **************************************************************************************************************************************************
             IS MAXIMUM REACH
             So no display of the icon into the toolbar.             
        */
        "maximumReachCircles": function(map)
        {
            if (map.__component__.builded_config.maximumCircles != Number.MAX_SAFE_INTEGER)
            {
                p_none = (map.__component__.total.circles >= map.__component__.builded_config.maximumCircles) ? "none" : "";
                map.pm.Toolbar.buttons.drawCircle.buttonsDomNode.style.display = "" + p_none + "";
                if (p_none === "none")
                {
                    //  DISABLE ACTION ON CIRCLES
                    map.pm.disableDraw('Circle');
                }
            }
        },
        /*  **************************************************************************************************************************************************
             COMPUTED
        */
        "computedCircles": function()
        {
            if (this.builded_config.drawCircle === true)
            {
                return "" + this.getLabel(this.$root, "MAP_CIRCLES") + " [" + this.value.circles.length + "]";
            }
            return "";
        },
        /*  **************************************************************************************************************************************************
             CREATE CIRCLES
        */
        "createCircles": function(map)
        {
            if (this.value.circles.length === 0) return true;

            //	--DEBUG_[ create circles ]
            if (this.$root.config.debugMode === true)
            {
                console.log("CREATE CIRCLES");
                console.log(this.value.circles);
            }
            //	--/DEBUG_[ create circles ]                

            var circles = this.value.circles;
            for (var cnt2 = 0, len2 = circles.length; cnt2 < len2; cnt2++)
            {
                this.createCircle(circles[cnt2], map, this.value.circlesConfig[cnt2], this.value.circlesUid[cnt2]);
            }
        },
        "createCircle": function(d, map, p, uuid)
        {
            var latlngs = JSON.parse(JSON.stringify(d));
            var circle = L.circle([latlngs[0], latlngs[1]], latlngs[2],
                Object.assign(map.__component__.builded_config.configCircles,
                {
                    muuid: uuid,
                    draggable: false
                })).addTo(map);

            //  ATTACH POPUP TO CIRCLE
            //
            this.attachPopup(circle, p);

            map.fireEvent("pm:create",
            {
                shape: "Circle",
                marker: circle,
                layer: circle,
                source: "init" /* MEAN THAT WHEN CALL PM:CREATE -> this.event_main_create the circle switch section know if the icon should be redifined or not */
            });
        },
        /*  **************************************************************************************************************************************
        /*  EVENTS
        */
        /*  **************************************************************************************************************************************
            CIRCLE - DRAG END
        */
        "event_Circle_drag_end": function(e)
        {
            var map = e.target._map;
            e.target.setStyle(e.target._map.__component__.builded_config.configCircles);
            this.set(map);
        },
        /*
            CIRCLE - EDIT
        */
        "event_Circle_edit": function(e)
        {
            var map = e.target._map;
            e.target.setStyle(e.target._map.__component__.builded_config.configCircles);
            this.set(map);
        },
        /*  **************************************************************************************************************************************
            CIRCLE - MOUSE OVER
        */
        "event_Circle_Mouseover": function(e)
        {
            console.log(e.target);
            //  IF IN REMOVE MODE SET NEW STYLE
            //
            if (e.target._map.pm._globalRemovalMode === true)
            {
                e.target.setStyle(e.target._map.__component__.builded_config.configStylesRemove);
            }
        },
        /*  **************************************************************************************************************************************
            CIRCLE - MOUSE OUT
        */
        "event_Circle_Mouseout": function(e)
        {
            //  IF IN REMOVE MODE REVERT BASE STYLE
            //
            if (e.target._map.pm._globalRemovalMode === true)
            {
                e.target.setStyle(e.target._map.__component__.builded_config.configCircles);
            }
        }
    }
};