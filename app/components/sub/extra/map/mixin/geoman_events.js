//	MIXIN MAP_FULLSCREEN

var Map_Gm_Events_Mixin = {

    methods:
    {
        /*
            DRAW_START
        */
        "event_main_drawstart": function(e)
        {
            //  IN CASE OF POLYGON WE HAVE TO CAPTURE WHEN POINT ARE SET ON SCREEN TO SEE IF IT OVERLAP INTO AN EXISTING POLYGON
            if (e.shape === "Polygon")
            {
                var map = e.target.pm.map;
                if (map.__component__.builded_config.polygonsOverlapPolygons === false)
                {
                    map.__component__.event_polygon_create_add_vertex_markers(e);
                }
                map.__component__.from_drawend_event = false;
            }
        },
        /*
            DRAW_END
        */
        "event_main_drawend": function(e)
        {
            var map = e.target.pm.map;
            map.__component__.from_drawend_event = true;
        },
        /*
            REMOVE
        */
        "event_main_remove": function(e)
        {
            //  UPDATE
            var map = e.target.pm.map;
            map.__component__.set(map);
        },
        /*
            CREATE
        */
        "event_main_create": function(e)
        {
            //  SET MUUID
            var map = e.target.pm.map;

            // var uuid = "WAZA-U" + map.__component__.shortUuid();
            // e.layer.options.muuid = uuid;

            //  E.SOURCE IS NOT DEFINED IN CASE OF THIS ELEMENT IS ADDED FROM GEOMAN TOOLBAR
            //  WHEN IT'S COMING FROM THE MODEL ON INIT E.SOURCE IS POPULATED
            //
            var uuid;
            if (typeof e.source === "undefined")
            {
                var prefix = "";
                switch (e.shape)
                {
                    case "Polygon":
                        prefix = "NPG";
                        break;
                    case "Marker":
                        prefix = "NMK";
                        break;
                    case "Line":
                        prefix = "NPL";
                        break;
                    case "Circle":
                        prefix = "NCR";
                        break;
                }
                uuid = prefix + "_" + map.__component__.shortUuid();
                e.layer.options.muuid = uuid;
            }
            else
            {
                uuid = e.layer.options.muuid;
            }

            //  WHEN POLYGON IS CREATED WITH TOOLBAR IF POLYGON COULD NOT OVERLAP
            //
            if (map.__component__.builded_config.polygonsOverlapPolygons === false && e.shape === "Polygon" && map.__component__.from_drawend_event === true)
            {
                var cp = turf.polygon(e.layer.toGeoJSON().geometry.coordinates);
                var overlap = 0;
                var polygons = map.__component__.map_utils_get_polygon_coord(map, uuid);

                for (var cnt9 = 0, len9 = polygons.length; cnt9 < len9; cnt9++)
                {
                    var p = turf.polygon(polygons[cnt9]);

                    if (turf.booleanOverlap(cp, p) === true)
                    {
                        overlap = 1;
                        break;
                    }
                }

                if (overlap === 1)
                {
                    // https://jsfiddle.net/falkedesign/omw2pt34/
                    e.layer.removeFrom(map);
                    setTimeout(function()
                    {
                        //Needed because snapping
                        map.pm.enableDraw('Polygon');
                        var latlngs = e.layer.getLatLngs();
                        if (!L.LineUtil.isFlat(latlngs))
                        {
                            latlngs = latlngs[0];
                        }
                        latlngs.forEach(function(latlng)
                        {
                            map.pm.Draw.Polygon._createVertex(
                            {
                                latlng: latlng
                            });
                        });
                    }, 100);

                    return true;
                }
            }

            //  IN CASE OF INIT OR ADDED GOOD SHAPE
            //
            switch (e.shape)
            {
                case "Polygon":
                    //  ************************************************************************************************************************************************************
                    //  POLYGON

                    //  SHOULD BE CREATE IF IT'S A NEW MARKER AND NOT COMING FROM INSERT DATA form "createPolyline" function
                    //
                    if (typeof e.source === "undefined")
                    {
                        this.attachPopup(e.layer, "" + this.getLabel(this.$root, "MODAL_MAP_EMPTY_POPUP") + "");
                    }

                    //  NOT ALLOWING WEIRD POLYGON - THE FROM SHOULD NOT BE OVERLAP IT SELF
                    e.layer.pm.enable(
                    {
                        allowSelfIntersection: false,
                        /*preventMarkerRemoval: true,
                        limitMarkersToCount: 5*/
                    });
                    e.layer.pm.disable();

                    //  EVENT drag
                    e.layer.on('pm:dragstart', map.__component__.event_Polygon_drag_start);
                    e.layer.on('pm:drag', map.__component__.event_Polygon_drag);
                    e.layer.on('pm:dragend', map.__component__.event_Polygon_drag_end);

                    //  EVENT WHEN markerdrag start-end 
                    e.layer.on('pm:markerdragstart', map.__component__.event_Polygon_markerdragstart);
                    e.layer.on('pm:markerdragend', map.__component__.event_Polygon_markerdragend);

                    //  CREATE NEW POINT ( CLICK ON SMALL POINT BEWTEEN 2 BIG POINTS)
                    e.layer.on('pm:vertexadded', map.__component__.event_Polygon_vertexadded);

                    //  RIGHT CLICK ON POINT TO REMOVE
                    e.layer.on('pm:vertexremoved', map.__component__.event_Polygon_vertexremoved);

                    //  IF INTERSECT ON UPDATE
                    e.layer.on('pm:intersect', function(e) {});

                    e.layer.on('pm:edit', function(e) {});

                    e.layer.on('mouseover', map.__component__.event_Polygone_Mouseover);
                    e.layer.on('mouseout', map.__component__.event_Polygone_Mouseout);

                    break;

                case "Marker":
                    //  ************************************************************************************************************************************************************
                    //  MARKER

                    //  BASE ICON
                    //  SHOULD BE CREATE IF IT'S A NEW MARKER AND NOT COMING FROM INSERT DATA form "createMarker" function
                    //
                    if (typeof e.source === "undefined")
                    {
                        var iconBase = L.divIcon(map.__component__.builded_config.makerConfig.base);

                        e.marker.setIcon(iconBase);

                        this.attachPopup(e.marker, "" + this.getLabel(this.$root, "MODAL_MAP_EMPTY_POPUP") + "");
                    }

                    //  EVENT WHEN MARKER IS MOVE
                    e.marker.on('pm:edit', map.__component__.event_Marker_edit);
                    e.marker.on('drag', map.__component__.event_Marker_drag);

                    e.marker.on('mouseover', map.__component__.event_Marker_Mouseover);
                    e.marker.on('mouseout', map.__component__.event_Marker_Mouseout);
                    break;

                case "Circle":
                    //  SHOULD BE CREATE IF IT'S A NEW CIRCLE AND NOT COMING FROM INSERT DATA form "createCircle" function
                    //
                    if (typeof e.source === "undefined")
                    {
                        this.attachPopup(e.layer, "" + this.getLabel(this.$root, "MODAL_MAP_EMPTY_POPUP") + "");
                    }

                    //  SET STYLES FOR LINE, BECAUSE STYLE HAS BEEN DEFINED FOR ALL ( POLY/PATH) WITH SET setPathOptions )
                    //
                    e.layer.setStyle(map.__component__.builded_config.configCircles);

                    e.layer.on('pm:dragend', map.__component__.event_Circle_drag_end);

                    e.layer.on('pm:edit', map.__component__.event_Circle_edit);

                    e.layer.on('mouseover', map.__component__.event_Circle_Mouseover);
                    e.layer.on('mouseout', map.__component__.event_Circle_Mouseout);

                    break;
                case "Line":
                    //  ************************************************************************************************************************************************************
                    //  Line

                    //  SHOULD BE CREATE IF IT'S A NEW LINE AND NOT COMING FROM INSERT DATA form "createPolyline" function
                    //
                    if (typeof e.source === "undefined")
                    {
                        this.attachPopup(e.layer, "" + this.getLabel(this.$root, "MODAL_MAP_EMPTY_POPUP") + "");
                    }

                    //  SET STYLES FOR LINE, BECAUSE STYLE HAS BEEN DEFINED FOR ALL ( POLY/PATH) WITH SET setPathOptions )
                    //
                    e.layer.setStyle(map.__component__.builded_config.configPolylines);

                    e.layer.on('pm:edit', function(e) {});

                    e.layer.on('mouseover', map.__component__.event_Polyline_Mouseover);
                    e.layer.on('mouseout', map.__component__.event_Polyline_Mouseout);

                    e.layer.on('pm:dragend', map.__component__.event_Polyline_drag_end);

                    //  CREATE NEW POINT ( CLICK ON SMALL POINT BEWTEEN 2 BIG POINTS)
                    e.layer.on('pm:vertexadded', map.__component__.event_Polyline_vertexadded);

                    //  RIGHT CLICK ON POINT TO REMOVE
                    e.layer.on('pm:vertexremoved', map.__component__.event_Polyline_vertexremoved);
                    break;
            }

            //  UPDATE
            map.__component__.set(map);
        }
    }
};