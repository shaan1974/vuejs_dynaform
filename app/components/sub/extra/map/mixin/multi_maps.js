//	MIXIN MULTI MAP

var Map_Mmap_Mixin = {

    methods:
    {
        "init_multi_maps": function()
        {
            var baseLayers = {};

            if (this.builded_config.multiMaps === true)
            {
                var grayscale = L.tileLayer(this.builded_config.oms[0].url,
                {
                    attribution: this.builded_config.oms[0].attribution
                });

                var color = L.tileLayer(this.builded_config.oms[1].url,
                {
                    attribution: this.builded_config.oms[1].attribution
                });

                /*color2 = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",
                {
                    attribution: this.builded_config.oms[1].attribution
                });*/

                baseLayers = {};
                baseLayers["" + this.getLabel(this.$root, this.builded_config.oms[0].label) + ""] = grayscale;
                baseLayers["" + this.getLabel(this.$root, this.builded_config.oms[1].label) + ""] = color;
                /*baseLayers["COLOR2"] = color2;*/

            }

            //  SET CORRECT OSM ATTRIBUTION IN MAIN CONFIG
            this.builded_config.omsAttrib = (this.builded_config.osmUrl === this.builded_config.oms[0].url) ? this.builded_config.oms[0].attribution : this.builded_config.oms[1].attribution;

            return baseLayers;
        },
        "set_multi_maps_control": function(baseLayers, map)
        {
            if (this.builded_config.multiMaps === true)
            {
                var bs = L.control.layers(baseLayers,
                {},
                {
                    collapsed: true
                }).addTo(map);

                //  SET CHECKBOX ON WITH DEFAULT START MAP LAYER
                var ndx = (this.builded_config.osmUrl === this.builded_config.oms[0].url) ? 0 : 1;
                bs._layerControlInputs[ndx].checked = true;

                //  SET CLASS CUROSR ON LABELS
                for (var cnt = 0, len = bs._layerControlInputs.length; cnt < len; cnt++)
                {
                    bs._layerControlInputs[cnt].nextElementSibling._addClass("cursor");
                }
            }
        }
    }
};