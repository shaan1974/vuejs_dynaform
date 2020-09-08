/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN MAP GEOMAN MAIN
//  https://jsfiddle.net/dvh1r2je/

var Map_Gm_Mixin = {

    data: function()
    {
        return {

            "from_drawend_event": false,
            "tmp_working_polygon": "",
            "tmp_previous_polygon": "",
            "tmp_current_polygons_muuid": "",
            "tmp_polygons": []
        };
    },
    methods:
    {
        "buildGeomanConfig": function()
        {
            return {
                position: 'topleft',
                drawMarker: true,
                drawCircleMarker: false,
                drawPolyline: this.builded_config.drawPolyline,
                drawRectangle: false,
                drawPolygon: this.builded_config.drawPolygon,
                drawCircle: this.builded_config.drawCircle,
                xeditMode: this.builded_config.drawPolygon,
                editMode: true,
                dragMode: true,
                cutPolygon: false,
                removalMode: true
            };
        },

        "initGeoman": function(map)
        {
            //  CONFIG
            //

            //  _____________ SET PATH OPTIONS
            //
            map.pm.setPathOptions(map.__component__.builded_config.configPolygons);

            //  _____________ SET MARKERS OPTIONS
            //
            //  BASE CONFIG TO USE WHEN MARKER IS ADDED WITH TOOLBAR
            //
            var iconBase = L.divIcon(map.__component__.builded_config.makerConfig.add);

            var markerStyle = {
                opacity: 1,
                draggable: false,
                icon: iconBase
            };

            var options = {
                markerStyle
            };

            map.pm.enableDraw('Marker', options);
            map.pm.disableDraw('Marker');

            //  ADD CONTROLS
            map.pm.addControls(this.buildGeomanConfig());

            //  LABELS
            map.pm.setLang('customName', leaflet_geoman_lg, '' + map.__component__.$root.config.lg.short.toLocaleLowerCase() + '');

            //  EVENTS
            //
            //  ___ DRAW START
            map.on('pm:drawstart', this.event_main_drawstart);
            //  ___ DRAW END
            map.on('pm:drawend', this.event_main_drawend);
            //  ___ CREATE
            map.on('pm:create', this.event_main_create);
            //  ___ REMOVE
            map.on('pm:remove', this.event_main_remove);
        }
    }
};