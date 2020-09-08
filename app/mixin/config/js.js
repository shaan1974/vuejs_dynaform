/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN - CONFIG
// 

var Config_Mixin = {

    watch:
    {
        /*
            IN CASE OF CONFIG DEFINED INTO SCHEMA IS UPDATED WE HAVE TO RERUN THE FUNCTION "BUILDCONFIG" TO REBUILD INTERNAT CONFIG
        */
        config:
        {
            deep: true,
            handler: function()
            {
                //	--DEBUG_[ RENEW CONFIG VAR ]
                if (this.$root.config.debugMode === true)
                {
                    console.log("RENEW " + this.default_config + "");
                    console.log("REBUILD CONFIG");
                }
                //	--/DEBUG_[ RENEW CONFIG VAR ]             
                this.buildConfig("builded_config", this.default_config);
            }
        }
    },
    data: function()
    {
        return {
            "builded_config":
            {},
            "css_config":
            {}
        };
    },
    mounted: function()
    {
        //  BUILD CONFIG
        //
        if (typeof this.default_config !== "undefined")
        {
            this.buildConfig("builded_config", this.default_config);

            //	--DEBUG_[ MOUNTED CONFIG ]
            if (this.$root.config.debugMode === true)
            {
                console.log('%c BUILD CONFIG - ' + JSON.stringify(this.default_config) + ' ', 'background: #000; color: #fff');
                console.log(">", JSON.stringify(this.$root.config["" + this.default_config + ""]));
                console.log(">", JSON.stringify(this.builded_config));
            }
            //	--/DEBUG_[ MOUNTED CONFIG ]             
        }
    },
    methods:
    {
        buildConfig: function(dest, base)
        {
            //  MAIN CONFIG
            //
            var a = {},
                b = {},
                d = {};

            //  #1 - CHECK IF CONFIG EXIST
            //
            if (typeof this.$root.config["" + base + ""] !== "undefined")
            {
                a = JSON.parse(JSON.stringify(this.$root.config["" + base + ""]));

                if (typeof this["config"] !== "undefined")
                {
                    b = JSON.parse(JSON.stringify(this["config"]));
                }
                else
                {
                    b = JSON.parse("{}");
                }
            }

            //  #2 - BUILD CSS CONFIG RELATED TTO INLINE OR NOT INLINE
            //  DISPLAY INLINE OR NOT
            //
            if (typeof this.config !== "undefined")
            {
                if (typeof this.config.displayInline !== "undefined")
                {
                    d = JSON.stringify(this.$root.config.displayInline[this.config.displayInline]);
                }
                else
                {
                    d = JSON.stringify(this.$root.config.displayInline["true"]);
                }
            }
            else
            {
                d = JSON.stringify(this.$root.config.displayInline["true"]);
            }

            //  #3 - CSS CONFIG
            //  ADD THIS CONFIG TO B 
            this["css_config"] = JSON.parse(d);

            //  COPY TO OBJECT
            this["" + dest + ""] = Object.assign(a, b);

            //  #4 CHECK IF CONFIG INCLUDE WATCHERS        
            //
            if (typeof this.config !== "undefined")
            {
                if (typeof this.config.watchers !== "undefined")
                {
                    this.init_watcher(this.config.watchers);
                }
            }
        }
    }
};