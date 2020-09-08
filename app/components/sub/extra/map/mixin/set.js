/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN MAP SET

var Map_Set_Mixin = {

    methods:
    {
        /*  **************************************************************************************************************************************************
        SET VALUE WITH EMIT  

        document.querySelector("#app").__vue__.$children[0].$children[37].value
        */
        "set": function(map)
        {
            this.$el.querySelector("[mode='MAP']").focus();

            var o = {};

            //  RESET TOTAL COUNTER LOOPING ON KEY AND OBJECT TO CDO THE COUNT
            //
            for (var key in this.total)
            {
                this.total["" + key + ""] = 0;
                o["" + key + ""] = [];
            }

            o["markersConfig"] = [];
            o["markersClass"] = [];
            o["markersUid"] = [];

            o["polylinesConfig"] = [];
            o["polygonsUid"] = [];

            o["polygonsConfig"] = [];
            o["polylinesUid"] = [];

            o["circlesConfig"] = [];
            o["circlesUid"] = [];

            //  LOOP ON ALL EXISTING LAYERS (TAKE IN COUNT ONLY POLYGON & MARKER WITH MUUID PROPERTY)
            //
            var p, z, d;

            for (var i in map._layers)
            {
                z = map._layers[i];

                if (typeof z.options.muuid !== "undefined")
                {
                    /*  **************************************************************************************************************************************************
                        POLYGON
                    */
                    if (z instanceof L.Polygon)
                    {
                        p = z.toGeoJSON().geometry.coordinates[0].map(function(o)
                        {
                            return JSON.parse(JSON.stringify(o)).reverse();
                        });

                        d = "polygons";
                        o["polygonsConfig"].push(this.EntitiesEncode(this.HtmlToBBcode(z.getPopup()._content.querySelector(".desc").innerHTML)));

                        //  MUUID
                        o["polygonsUid"].push(z.options.muuid);
                    }
                    /*  **************************************************************************************************************************************************
                        MARKER
                    */
                    else if (z instanceof L.Marker)
                    {
                        p = z.toGeoJSON().geometry.coordinates.reverse();
                        d = "markers";

                        //  UPDATE POPUP CONTENT
                        o["markersConfig"].push(this.EntitiesEncode(this.HtmlToBBcode(z.getPopup()._content.querySelector(".desc").innerHTML)));

                        //  UPDATE CLASS NAME(S)
                        o["markersClass"].push(z.getIcon().options.className);

                        //  MUUID
                        o["markersUid"].push(z.options.muuid);
                    }
                    /*  **************************************************************************************************************************************************
                        CIRCLE
                    */
                    else if (z instanceof L.Circle)
                    {
                        p = z.toGeoJSON().geometry.coordinates.reverse();
                        p.push(z.getRadius());
                        d = "circles";
                        o["circlesConfig"].push(this.EntitiesEncode(this.HtmlToBBcode(z.getPopup()._content.querySelector(".desc").innerHTML)));

                        //  MUUID
                        o["circlesUid"].push(z.options.muuid);
                    }
                    /*  **************************************************************************************************************************************************
                        PATH
                    */
                    else if (z instanceof L.Path)
                    {
                        p = z.toGeoJSON().geometry.coordinates.map(function(o)
                        {
                            return JSON.parse(JSON.stringify(o)).reverse();
                        });

                        d = "polylines";
                        o["polylinesConfig"].push(this.EntitiesEncode(this.HtmlToBBcode(z.getPopup()._content.querySelector(".desc").innerHTML)));

                        //  MUUID
                        o["polylinesUid"].push(z.options.muuid);
                    }

                    /*  **************************************************************************************************************************************************
                        PUSH TO MAIN OBJECT AND UPDATE TOTAL OBJECT
                    */
                    o["" + d + ""].push(p);
                    this.total["" + d + ""] = this.total["" + d + ""] + 1;
                }
            }

            //  SET VALUE INTO THE MODEL
            //
            this.setDataValue(o, true);

            //  CHECK FOR MAXIMUM OF EACH INSTANCE ELEMENT TYPE
            //
            var checkMax = function(t, m, o, i)
            {
                t["maximumReach" + o + ""](m);
            };
            this.elementsInstance.forEach(checkMax.bind(null, this, map));
        },
        /*  **************************************************************************************************************************************************
            SET EMPTY 
        */
        "emptyMap": function(e)
        {
            //  IF INLINE MODE, REMOVE ALSO ALL MARKERS OR POLYGONS OF THE MAP OBJECT
            //
            if (this.builded_config.inline === true)
            {
                var cMap = this.map;

                this.map.eachLayer(function(layer)
                {
                    if (layer instanceof L.Marker || layer instanceof L.Polygon || layer instanceof L.Path)
                    {
                        cMap.removeLayer(layer);
                    }
                });
            }

            this.set(this.map);
        }
    }
};