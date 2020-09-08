/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN MAP POPUP

var Map_Popup_Mixin = {


    data: function()
    {
        return {
            tmpIcon: ""
        };
    },
    watch:
    {
        "modalUpdate": function()
        {
            /*
                WHEN MODAL IS OPEN WE DEFINE THE VALUE OF "tmpIcon"
            */
            if (this.modalUpdate === true)
            {
                if (this.tempLayer instanceof L.Marker)
                {
                    var c = this.tempLayer.getIcon().options.className.split(" ");
                    if (c.length === 3)
                    {
                        this.tmpIcon = "map-cicon " + c[2];
                    }
                    else
                    {
                        this.tmpIcon = "";
                    }
                }
            }
        }
    },
    methods:
    {
        /*
            WHEN CLICK ON MODAL POPUP UPDATE BUTTONS M IS DEFINE IS ACTION OR CANCEL
            EVEN WITH CANCEL THE POPUP IS UPDATED WITH PREVIOUS CONTENT TO JUMP CORRECTLY INSIDE THE PAGE ( PREVIOUS POSITION BEFORE MODAL APPEAR )
        */
        "updatePopupFromModal": function(md)
        {
            //  GET NEW CONTENT 
            //  LINEARIZE, BBCODE TO HTML, ENTITIES TO CHAR
            //
            var newContent = this.EntitiesEncode(this.BBcodeToHtml((this.$el.querySelector("textarea").value).linearize()));

            //  GET SOURCE CALLER
            //            
            var m = this.tempLayer;

            //  REMOVE MODAL
            //
            this.modalUpdate = false;

            //  CREATE CONTAINER
            //
            var p2 = L.DomUtil.create('div');
            if (md === "update")
            {
                p2.innerHTML = '<div class="edit"></div><div class="desc">' + newContent + '</div>';
            }
            else
            {
                this.tempPopupContent = this.EntitiesEncode(this.BBcodeToHtml(this.tempPopupContent.linearize()));
                p2.innerHTML = '<div class="edit"></div><div class="desc">' + this.tempPopupContent + '</div>';
            }

            //  UPDATE ICON IN CASE OF MARKER
            //
            if (md === "update" && this.tempLayer instanceof L.Marker)
            {
                var bOject = Object.assign(
                {}, this.builded_config.makerConfig.base,
                {
                    className: "" + this.builded_config.makerConfig.base.className + " " + this.tmpIcon
                });

                iconUpdate = L.divIcon(bOject);

                this.tempLayer.setIcon(iconUpdate);
            }

            //  SET CONTENT
            //
            m.getPopup().setContent(p2);
            m.getPopup().openOn(this.map);

            //  EVENT
            //
            var fctClickButton = function(m, t, e)
            {
                t.updateAttachPopup(m);
            };
            L.DomEvent.on(m.getPopup()._container.querySelector("div.edit"), 'click', fctClickButton.bind(null, m, this));

            //  SET NEW VALUE INTO MODEL
            //
            this.set(m._map);

            //  REVERT MAP INTERACTION
            //
            this.enabledMapInteraction();
        },
        "updateAttachPopup": function(m)
        {
            //  INIT MODAL
            //
            this.modalUpdate = true;
            this.tempLayer = m;
            this.tempPopupContent = (this.HtmlToBBcode(m.getPopup().getContent().querySelector(".desc").innerHTML)).replace(/\[br\]/gi, "[br]\n");
            this.$el.querySelector(".popup-update-content-inside textarea").value = this.tempPopupContent;
            this.$nextTick(
                function()
                {
                    this.$el.querySelector(".popup-update-content-inside textarea").focus();
                });

            //  SET MAP INTERACTION OFF
            //
            this.disabledMapInteraction();
            return true;
        },
        /*
            E - Element involved.
            P - Content Text.
        */
        "attachPopup": function(e, p)
        {
            //  CONVERT BBCODE TO HTML
            //
            p = this.BBcodeToHtml(p);

            //  CREATE CONTAINER
            //
            var p2 = L.DomUtil.create('div');

            //  EDIT BUTTON SHOULD NOT BE VISIBLE INTO DISPLAY MODE AND EVENT SHOULD NOT BE INIT
            //
            if (this.isDisplayMode() === true)
            {
                p2.innerHTML = '<div class="edit d-none"></div><div class="desc">' + p + '</div>';

                e.on('mouseover', function(e)
                {
                    this.openPopup();
                });

                e.on('mouseout', function(e)
                {
                    this.closePopup();
                });
            }
            else
            {
                p2.innerHTML = '<div class="edit"></div><div class="desc">' + p + '</div>';

                var fctClickButton = function(m, t, e)
                {
                    t.updateAttachPopup(m);
                };
                L.DomEvent.on(p2.querySelector("div.edit"), 'click', fctClickButton.bind(null, e, this));
            }

            //  GET INSTANCE
            //
            var extraClass = "";
            if (e instanceof L.Marker)
            {
                extraClass = "map-popup-base-marker";
            }
            else if (e instanceof L.Polygon)
            {}
            else if (e instanceof L.Circle)
            {}
            else if (e instanceof L.Path)
            {}

            //  DEFINE POPUP CONFIGURATION
            //
            var popup = L.popup(
            {
                closeButton: true,
                className: "map-popup-base " + extraClass + ""
            }).setContent(p2);

            //  ATTACH
            //
            e.bindPopup(popup);
        },
        /*
            GET INSTANCE TYPE OF OBJECT INVOKING THE EDIT MODAL
        */
        "instanceOf": function()
        {
            if (this.tempLayer instanceof L.Marker)
            {
                return "Marker";
            }
            else if (this.tempLayer instanceof L.Polygon)
            {
                return "Polygon";
            }
            else if (this.tempLayer instanceof L.Circle)
            {
                return "Circle";
            }
            else if (this.tempLayer instanceof L.Path)
            {
                return "Path";
            }

            return "";
        },
        /*
            SELECT ICON MARKER - GET CURRENT ICON
        */
        "isCurrentIcon": function(o)
        {
            var c = this.tmpIcon.split(" ");
            return (c[c.length - 1] === o) ? true : false;
        },
        /*
            SELECT ICON MARKER - SET NEW ICON
        */
        "setMarkerIcon": function(e)
        {
            this.$nextTick(
                function()
                {
                    this.tmpIcon = "map-cicon " + e.target.value;
                }
            );
        }
    }
};