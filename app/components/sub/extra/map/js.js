/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MAP
/*
    document.querySelector("#app").__vue__.formData.markers
*/

MapInput = Vue.component(
    'MapInput',
    {
        template: MapInput_template,
        mixins: [
            DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin, Dico_Mixin,
            Map_Fs_Mixin, Map_Os_Mixin, Map_Gm_Mixin, Map_Gm_Markers_Mixin, Map_Gm_Polygons_Mixin, Map_Gm_Events_Mixin, Map_Mmap_Mixin, Map_Utils_Mixin, Map_Gm_Polylines_Mixin, Map_Buttons_Mixin, Map_Popup_Mixin,
            Map_BBcodes_Mixin, Map_Set_Mixin, Map_Gestures_Mixin, Map_Gm_Circles_Mixin
        ],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'config', 'styles'],
        data: function()
        {
            return {
                "map_ok": false,
                "pm_config":
                {},
                "total":
                {},
                "default_config": "map",
                "exitFullScreenTotaly": false,
                "elementsInstance": ["Markers", "Polygons", "Polylines", "Circles"],
                "modalUpdate": false,
                "tempLayer": "",
                /* VAR TO USE AS TEMP TO PUT LAYER TO UPDATE WITH MODAL POPUP CONTENT */
                "tempPopupContent": "",
                /* VAR TO  USE AS TEMP FOR CURRENT CONTENT OF POPUP BEFORE CALLING THE MODAL TO UPDATE */
                "currentGeolocation": "",
                /* VAR TO PUT GEOLOCATION OF CURRENT USER, TO AVOID TO CALL THE SERVICE MULTIPLE TIMES */
            };
        },
        computed:
        {
            //  **************************************************************************************************************************************************
            //  GENERATE VISUAL INFORMATION INTO THE INPUT TO INDICATE NUMBER OF DIFFERENTS ELEMENTS INSTANCE
            //
            "precalculated": function()
            {
                var getC = function(t, o, i)
                {
                    return t["computed" + o + ""]();
                };

                return (this.elementsInstance.map(getC.bind(null, this))).filter(function(p)
                {
                    return p != "";
                }).join(" - ");
            }
        },
        mounted: function()
        {
            if (this.isDisplayMode() === true)
            {
                this.builded_config.inline = true;
            }

            //  IN CASE OF INLINE MAP WE DISPLAY THE MAP 
            //
            if (this.builded_config.inline === true)
            {
                var that = this;

                setTimeout(
                    function()
                    {
                        arguments[0].showMap();
                    }, 100, that
                );
            }
        },
        methods:
        {
            //  **************************************************************************************************************************************************
            //  IF OBJECT IS EMPTY
            //
            "notEmptyObject": function(someObject)
            {
                return Object.keys(someObject).length;
            },
            /*  **************************************************************************************************************************************************
                SHOW MAP
            */
            "showMap": function()
            {
                //  VARIABLES
                var that = this;

                //  IF INLNE SO NOT WITH PICKER WE USE THIS, IN THE OTHER CASE WE MOVE TO FORM-GENEATOR REFERENCE
                //
                var fg = (this.builded_config.inline === true) ? this : this.$root.$refs["FORM-GENERATOR"];

                //  IF MAP IS NOT YET INITIALIZE
                //
                if (typeof fg.map === "undefined")
                {}
                else if (fg.map_ref_component.$el.querySelector(".map").classList.contains("map_ok"))
                {
                    //  MEAN THAT USER CLICK ON THE ONE THAT IS ALREADY OPEN
                    fg.map.remove();
                    fg.map = undefined;
                    fg.map_ref_component.$el.querySelector(".map").classList.remove("map_ok");

                    //  IF CLICK IS ON THE SAME THAT IS OPEN WE STOP
                    if (fg.map_ref_component.$el === this.$el)
                    {
                        fg.map_ref_component = {};
                        return true;
                    }
                }
                else
                {
                    //  DESTROY IT  
                    // 
                    fg.map.remove();
                    fg.map = undefined;
                    fg.map_ref_component.$el.querySelector(".map").classList.remove("map_ok");
                }

                //  INIT MULTI MAP-LAYERS
                //
                var baseLayers = this.init_multi_maps();

                //  MAP OSM CREATION
                //
                var osm = L.tileLayer(this.builded_config.osmUrl,
                {
                    maxZoom: this.builded_config.maxZoom,
                    attribution: this.builded_config.omsAttrib
                });

                //  CREATE THE MAP ITSELF
                //  initialize the map on the "map" div with a given center and zoom
                //  Create map
                var map = L.map(this.$el.closest(".form-group-map").querySelector(".map"),
                {
                    zoominfoControl: true,
                    zoomControl: false,
                    attributionControl: true
                }).setView(this.builded_config.startPosition, this.builded_config.startZoom).addLayer(osm);

                //  SET CONTROL OF MUTI MAP LAYERS
                //
                this.set_multi_maps_control(baseLayers, map);

                //  https://leafletjs.com/reference-1.6.0.html#control-scale
                //
                if (this.builded_config.scale.visible === true)
                {
                    L.control.scale(
                    {
                        "position": "" + this.builded_config.scale.position + "",
                        "metric": this.builded_config.scale.metric,
                        "imperial	": this.builded_config.scale.imperial
                    }).addTo(map);
                }

                /*
                _Qs(".leaflet-control-zoom-in").setAttribute("title", "" + this.getLabel(this.$root, "MAP_ZOOM_IN") + "");
                _Qs(".leaflet-control-zoom-out").setAttribute("title", "" + this.getLabel(this.$root, "MAP_ZOOM_OUT") + "");
                */
                //   SET LABELS FOR TITLES OF ZOOM BUTTONS
                //
                _Qs(".leaflet-control-zoominfo-in").setAttribute("title", "xxx" + this.getLabel(this.$root, "MAP_ZOOM_IN") + "");
                _Qs(".leaflet-control-zoominfo-out").setAttribute("title", "yyy" + this.getLabel(this.$root, "MAP_ZOOM_OUT") + "");

                fg.map = map;
                fg.map_ref_component = this;

                //  ATTACH COMPONENT TO MAP
                //
                fg.map.__component__ = that;

                //  ****************************************************************************************************************************************
                //  FULLSCREEN
                //
                this.setFullScreen(map);

                //  SET CLASS TO DISPLAY MAP CONTAINER
                //
                this.$nextTick(
                    function()
                    {
                        this.$el.querySelector(".map").classList.add("map_ok");
                    }
                );

                //  ****************************************************************************************************************************************
                //  INIT GEOMAN MAP TOOLS 
                //
                //  SET GEOMAN MAP TOOLS IF WE ARE NOT IN DISPLAY MODE
                //
                if (this.isDisplayMode() === false)
                {
                    this.initGeoman(map);
                }

                //  GET ALL DATA FROM VALUE AND INSERTED INTO THE MAP
                //  CHECK IF OBJECT IS EMPTY OR NOT
                //
                if (this.notEmptyObject(this.value))
                {
                    //  CHECK DIFFERENT TYPE OF ELEMENT ACCEPTED : "MARKER,POLYGONS,POLYLINES,CIRCLES"
                    var doElm = function(t, m, o, i)
                    {
                        t["create" + o + ""](m);
                    };
                    this.elementsInstance.forEach(doElm.bind(null, this, map));

                    //  ****************************************************************************************************************************************
                    //  FIT ALL LAYERS ON SCREEN
                    //
                    this.map_fit();
                }

                //  ****************************************************************************************************************************************
                //  ADD A CUSTOM BUTTONS LIKE :
                //  - FIT ACTION "map_fit" (FCT)
                //  - CURRENT GEOLOCATION                    
                //
                this.new_tool_buttons();

                //  ****************************************************************************************************************************************
                //  INIT GESTURE ( TO AVOID SCROLL MAP WHEN ON SCROLL, TO SCROLL MAP , CTRL SHOULD BE PRESS ALSO )
                //
                this.initGesture();

                //  ****************************************************************************************************************************************
                //  IF INLINE STOP PROCESS
                //
                if (this.builded_config.inline === true)
                {
                    // console.log(this);
                    return true;
                }

                //  ****************************************************************************************************************************************
                //  ONSCROLL EVENT IN CASE OF NOT INLINE
                //
                this.windowOnScrollEvent();
            },
            /*  **************************************************************************************************************************************************
                DESTROY
            */
            "destroy": function()
            {
                var fg = (this.builded_config.inline === true) ? this : this.$root.$refs["FORM-GENERATOR"];

                fg.map.remove();
                fg.map = undefined;
                fg.map_ref_component.$el.querySelector(".map").classList.remove("map_ok");
            },
            /*  **************************************************************************************************************************************************
                MOUSE LEAVE MAP
            */
            "mouseLeaveMap": function(e)
            {
                if (this.builded_config.inline !== true)
                {
                    if (this.$root.$refs["FORM-GENERATOR"].map._isFullscreen !== true)
                    {
                        if (this.exitFullScreenTotaly === false)
                        {
                            this.showMap();
                        }

                        this.exitFullScreenTotaly = false;
                    }
                }
            }
        }
    }
);