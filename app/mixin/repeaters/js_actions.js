var Repeater_Actions_Mixin = {

    methods:
    {
        /*
            ADD A REPEATER
        */
        "addLine": function()
        {
            if (typeof this.builded_config.maxRecords === "undefined" || this.values.length < this.builded_config.maxRecords)
            {
                var a = JSON.parse(JSON.stringify(this.emptyLine));

                //  CHECK IF REPEATER ELEMENT NEED TO GENERATE AN UID FOR A DEFINED FIELD
                //
                if (typeof this.builded_config.generateUID !== "undefined")
                {
                    var prefix = (typeof this.builded_config.generateUID_prefix !== "undefined") ? this.builded_config.generateUID_prefix : "";
                    a[this.builded_config.generateUID] = prefix + "" + this.shortUuid();
                }
                //	--DEBUG_[ add json ]
                // if (this.$root.config.debugMode === true)
                {
                    console.log("added json data", a);
                }
                //	--/DEBUG_[ add json ]                        

                this.values.push(a);
            }

            this.repeaterEndAction();
        },
        /*
            REMOVE A REPEATER
        */
        "removeLine": function(pI, m)
        {
            //  DESTROY ALL COMPONENTS
            //
            if (this.isNotDisplayMode())
            {
                this.$emit('event_destroyComponents');
            }

            this.values.splice(pI, 1);

            //  IN CASE OF TAB WHEN WE REMOVE A TAB WE SET THE POSITION
            //
            if (m === "tab")
            {
                if (this.values.length === 0)
                {
                    this.vtab = 0;
                }
                else if (pI === this.values.length)
                {
                    this.vtab = pI - 1;
                }
                else
                {
                    this.vtab = pI;
                }
            }

            this.repeaterEndAction();
        },
        /*  

        */
        "repeaterEndAction": function()
        {
            //  RESET ICON VALIDATION IN TOOLBAR
            this.changeValidationIcon("RESET");

            this.$nextTick(
                function()
                {
                    this.simulateVB();
                }
            );
        }
    }
};

//  MERGE THIS MIXIN WITH THE MAIN ONE
//
Repeater_Mixin.methods = Object.assign(Repeater_Mixin.methods, Repeater_Actions_Mixin.methods);