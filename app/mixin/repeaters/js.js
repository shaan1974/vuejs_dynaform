/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN

var Repeater_Mixin = {

    created: function()
    {
        this.fieldUid = this.shortUuid();
    },
    watch:
    {
        vtab: function()
        {
            //  CALL EVENT DEFINED WITH $ON INTO CHILDREN

            //  IN SOME CASE WE HAVE TO REINIT COMPONENENT
            //  BECAUSE THESES COMPONENNTS SHOULD BE VISIBILE TO GET BY EX WITH OR HEIGHT AND WHEN AN ELEMENT IS HIDDEN THE INFO COULD NOT BE TAKEN

            //	--DEBUG_[ repeater vtab ]
            if (this.$root.config.debugMode === true)
            {
                console.log("VTAB");
                console.log("Repeater MIXIN Vtab change");
            }
            //	--/DEBUG_[ repeater vtab ]            

            if (this.isNotDisplayMode())
            {
                this.$emit('event_doubleRangeSlider');
                this.$emit('event_inputNumber');
            }

            //  IF ELEMENT INSIDE IS ALSO A REPEATER LIKE A TAB WE TRIGGER THE WATCH  TO EXECUTE TWICE THE SAME VTAB WATCH
            this.$children.forEach(function(o)
            {
                if (typeof o.$children[0] !== "undefined")
                {
                    if (o.$children[0].is_repeater === true && typeof o.$children[0].vtab !== "undefined")
                    {
                        o.$children[0].vtab = 1;
                        o.$children[0].$nextTick(
                            function()
                            {
                                this.vtab = 0;
                            });
                    }
                }
            });
        }
    },
    methods:
    {
        /*
            UPDATE
        */
        "updateInput": function(event, val, targetIndex, targetElement)
        {
            //	--DEBUG_[ display repeater value ]
            if (this.$root.config.debugMode === true)
            {
                console.log('%c REPEATER-UDPATE-VALUE! ', 'background: #222; color: #bada55');
            }
            //	--/DEBUG_[ display repeater value ]

            //  RESET ICON VALIDATION IN TOOLBAR
            //  this.changeValidationIcon("RESET");

            // SPECIAL CASE FOR STATIC TAB
            var p = this.getPath(this);
            var r = this.buildPath(targetElement, p, this);

            if (this.values[targetIndex].constructor.toString().indexOf("Array()") !== -1)
            {
                //  ORIGINAL
                // this.values[targetIndex][0][targetElement] = val;
                // p = this.getPath(this)
                // r = this.buildPath(targetElement, p, this);
                this.$root.$refs["FORM-GENERATOR"].updateForm(targetElement, val, r[targetIndex][0]);
            }
            else
            {
                //  ORIGINAL
                // this.values[targetIndex][targetElement] = val;
                // p = this.getPath(this)
                // r = this.buildPath(targetElement, p, this);
                this.$root.$refs["FORM-GENERATOR"].updateForm(targetElement, val, r[targetIndex]);
            }

            // this.values[targetIndex][targetElement]=val;
            /*event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.cancelBubble = true;*/
        },
        "updateProp": function(t)
        {
            // this.$set(t, t.prop_name, t.prop_value);
            this.$root.$refs["FORM-GENERATOR"].updateProp(t);
        }
    }
};