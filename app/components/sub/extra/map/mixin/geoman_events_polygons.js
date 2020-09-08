/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN MAP EVENTS POLYGONS

var Map_Gm_Polygons_Mixin = {

    //  **************************************************************************************************************************************************
    //  MOUNTED
    //
    mounted: function()
    {
        this.total.polygons = 0;
    },
    methods:
    {
        /*  **************************************************************************************************************************************************
             IS MAXIMUM REACH
             So no display of the icon into the toolbar.             
        */
        "maximumReachPolygons": function(map)
        {
            if (map.__component__.builded_config.maximumPolygons != Number.MAX_SAFE_INTEGER)
            {
                p_none = (map.__component__.total.polygons >= map.__component__.builded_config.maximumPolygons) ? "none" : "";
                map.pm.Toolbar.buttons.drawPolygon.buttonsDomNode.style.display = "" + p_none + "";
                if (p_none === "none")
                {
                    //  DISABLE ACTION ON POLYGON
                    map.pm.disableDraw('Polygon');
                }
            }
        },
        /*  **************************************************************************************************************************************************
             COMPUTED
        */
        "computedPolygons": function()
        {
            if (this.builded_config.drawPolygon === true)
            {
                return "" + this.getLabel(this.$root, "MAP_POLYGONS") + " [" + this.value.polygons.length + "]";
            }
            return "";
        },
        /*  **************************************************************************************************************************************************
             CREATE POLYGONS
        */
        "createPolygons": function(map)
        {
            if (this.value.polygons.length === 0) return true;

            //	--DEBUG_[ create polygons ]
            if (this.$root.config.debugMode === true)
            {
                console.log("CREATE POLYGONS");
                console.log(this.value.polygons);
            }
            //	--/DEBUG_[ create polygons ]                

            var polygons = this.value.polygons;
            for (var cnt2 = 0, len2 = polygons.length; cnt2 < len2; cnt2++)
            {
                this.createPolygon(polygons[cnt2], map, this.value.polygonsConfig[cnt2], this.value.polygonsUid[cnt2]);
            }
        },
        "createPolygon": function(d, map, p, uuid)
        {
            var latlngs = JSON.parse(JSON.stringify(d));
            var polygon = L.polygon(latlngs,
                Object.assign(map.__component__.builded_config.configPolygons,
                {
                    muuid: uuid,
                    /*this.shortUuid(),*/
                    draggable: false
                })).addTo(map);


            //  ATTACH POPUP TO MARKER
            //
            this.attachPopup(polygon, p);

            map.fireEvent("pm:create",
            {
                shape: "Polygon",
                marker: polygon,
                layer: polygon,
                source: "init" /* MEAN THAT WHEN CALL PM:CREATE -> this.event_main_create the marker switch section know if the icon should be redifined or not */
            });
        },
        /*  **************************************************************************************************************************************
        /*  EVENTS
        */
        /*  **************************************************************************************************************************************
            POLYGON - DRAG START
        */
        "event_Polygon_drag_start": function(e)
        {
            var map = e.target._map;
            var map_c = map.__component__;

            //  IF POLYGON COULD NOT OVERLAY POLYGON
            if (map_c.builded_config.polygonsOverlapPolygons === false)
            {
                map_c.tmp_polygons = [];
                map_c.tmp_current_polygons_muuid = e.target.options.muuid;
                map_c.tmp_polygons = this.map_utils_get_polygon_coord(map, e.target.options.muuid);
            }

            map_c.tmp_previous_polygon = e.target.getLatLngs();
        },
        /*  **************************************************************************************************************************************
            POLYGON - DRAG
        */
        "event_Polygon_drag": function(e)
        {
            var map = e.target._map;
            var map_c = map.__component__;

            //  IF POLYGON COULD NOT OVERLAY POLYGON
            if (map_c.builded_config.polygonsOverlapPolygons === false)
            {
                var p;
                var cp = turf.polygon(e.target.toGeoJSON().geometry.coordinates);
                var overlap = 0;

                for (var cnt9 = 0, len9 = map_c.tmp_polygons.length; cnt9 < len9; cnt9++)
                {
                    p = turf.polygon(map_c.tmp_polygons[cnt9]);

                    if (turf.booleanOverlap(cp, p) === true)
                    {
                        overlap = 1;
                        e.target.setLatLngs(map_c.tmp_previous_polygon);
                        e.target.setStyle(e.target._map.__component__.builded_config.configPolygonsError);
                        break;
                    }
                }

                if (overlap === 0)
                {
                    map_c.tmp_previous_polygon = e.target.getLatLngs();
                    e.target.setStyle(e.target._map.__component__.builded_config.configPolygons);
                }
            }
        },

        /*  **************************************************************************************************************************************
            POLYGON - DRAG END
        */
        "event_Polygon_drag_end": function(e)
        {
            var map = e.target._map;
            e.target.setStyle(e.target._map.__component__.builded_config.configPolygons);
            this.set(map);
        },
        /*  **************************************************************************************************************************************
            POLYGON - VERTEX ADDED
        */
        "event_Polygon_vertexadded": function(e)
        {
            var map = e.target._map;
            this.set(map);
        },
        /*  **************************************************************************************************************************************
            POLYGON - VERTEX REMOVED
        */
        "event_Polygon_vertexremoved": function(e)
        {
            var map = e.target._map;
            this.set(map);
        },
        /*  **************************************************************************************************************************************
            POLYGON - MARKER DRAG START
        */
        "event_Polygon_markerdragstart": function(e)
        {
            var map = e.target._map;
            map.__component__.tmp_previous_polygon = e.target.getLatLngs();
        },
        /*  **************************************************************************************************************************************
            POLYGON - MARKER DRAG END
        */
        "event_Polygon_markerdragend": function(e)
        {
            var map = e.target._map;

            //  CHANGE COLOR,FILL COLOR OF POLYGON IF INTERSECT IS FALSE
            //
            if (e.target.pm.hasSelfIntersection() === false)
            {
                e.target.setStyle(e.target._map.__component__.builded_config.configPolygons);
                this.set(map);
            }

            //  ************************************************************************************************************
            //  CHECK IF POLYGON IS NOT OVERTLAPING AN OTHERS ONES WHEN MARKER IS DRAG END.
            //  

            if (map.__component__.builded_config.polygonsOverlapPolygons === false)
            {
                var cp = turf.polygon(e.target.toGeoJSON().geometry.coordinates);
                var polygons = [];
                var overlap = 0;
                var uuid = e.target.options.muuid;
                var p;

                polygons = this.map_utils_get_polygon_coord(map, uuid);


                for (var cnt9 = 0, len9 = polygons.length; cnt9 < len9; cnt9++)
                {
                    p = turf.polygon(polygons[cnt9]);

                    if (turf.booleanOverlap(cp, p) === true)
                    {
                        overlap = 1;
                        break;
                    }
                }

                if (overlap === 1)
                {
                    e.target.setLatLngs(map.__component__.tmp_previous_polygon);
                    map.pm.disableGlobalEditMode();
                    map.pm.enableGlobalEditMode();
                }
            }
        },
        /*  **************************************************************************************************************************************
            POLYGON - CREATION MODE - VERTAX MARKERS ADDED
            
            https://github.com/Turfjs/turf-inside
        */
        "event_polygon_create_add_vertex_markers": function(e)
        {
            var layer = e.workingLayer;

            //  ON EDIT
            layer.on('pm:edit', function(e) {});

            //  ON ADD VERTEX
            //
            layer.on('pm:vertexadded', function(e)
            {
                var map = this._map;

                if (map.__component__.builded_config.polygonsOverlapPolygons === false)
                {
                    //  #1 - CHECK IF POINT IS INSIDE EXISTIN POLYGON
                    //

                    var p;
                    var cp = turf.point([e.latlng.lng, e.latlng.lat]);
                    var overlap = 0;
                    // var polygons = [];
                    var polygons = map.__component__.map_utils_get_polygon_coord(map, '');

                    for (var cnt9 = 0, len9 = polygons.length; cnt9 < len9; cnt9++)
                    {
                        p = turf.polygon(polygons[cnt9]);

                        if (turf.inside(cp, p) === true)
                        {
                            overlap = 1;
                            break;
                        }
                    }

                    //  #2 - CHECK IF LINE CREATED FROM MARKER TO NEXT MARKER PASS THROUGHT EXISTING POLYGONS
                    //  http://turfjs.org/docs/#lineIntersect
                    //
                    if (overlap === 0)
                    {
                        //  IF MORE THAN 1 POINT TO DO THE CHECK
                        if (e.workingLayer.toGeoJSON().geometry.coordinates.length !== 1)
                        {
                            var cl = turf.lineString(e.workingLayer.toGeoJSON().geometry.coordinates);

                            for (var cnt8 = 0, len8 = polygons.length; cnt8 < len8; cnt8++)
                            {
                                p = turf.polygon(polygons[cnt8]);

                                if (turf.lineIntersect(cl, p).features.length !== 0)
                                {
                                    overlap = 1;
                                    break;
                                }
                            }
                        }
                    }

                    //  #3 - CHECK IF LINE CROSS ITSELF (NOEUD PAPILLON)
                    //  http://turfjs.org/docs/#kinks
                    //
                    if (overlap === 0)
                    {
                        //  IF MORE THAN 3 POINT TO DO THE CHECK
                        if (e.workingLayer.toGeoJSON().geometry.coordinates.length > 3)
                        {
                            var c = e.workingLayer.toGeoJSON().geometry.coordinates;
                            var t = JSON.parse(JSON.stringify(c));
                            t.push(c[0]);
                            var k = turf.kinks(turf.lineToPolygon(turf.lineString(t)));

                            if (k.features.length !== 0)
                            {
                                overlap = 1;
                            }
                        }
                    }

                    //  OVERLAP OR NOT
                    //  REMOVE LAST POINT OF VERTEX
                    if (overlap === 1)
                    {
                        map.pm.Draw["Polygon"]._removeLastVertex();
                    }
                    else
                    {
                        map.__component__.tmp_working_polygon = e;
                    }
                }

                //  FINISH CREATING POLYGON
                //
                e.marker.on('click', function(e) {});
            });
        },
        /*  **************************************************************************************************************************************
            POLYGON - MOUSE OVER
        */
        "event_Polygone_Mouseover": function(e)
        {
            //  IF IN REMOVE MODE SET NEW STYLE
            //
            if (e.target._map.pm._globalRemovalMode === true)
            {
                e.target.setStyle(e.target._map.__component__.builded_config.configStylesRemove);
            }
        },
        /*  **************************************************************************************************************************************
            POLYGON - MOUSE OUT
        */
        "event_Polygone_Mouseout": function(e)
        {
            //  IF IN REMOVE MODE REVERT BASE STYLE
            //
            if (e.target._map.pm._globalRemovalMode === true)
            {
                e.target.setStyle(e.target._map.__component__.builded_config.configPolygons);
            }
        }
    }
};