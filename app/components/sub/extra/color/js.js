//	COLOR-PICKER

ColorPicker = Vue.component(
    'ColorPicker',
    {
        template: Colorpicker_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Dico_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Clear_Mixin, Watchers_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'styles', 'config'],
        data: function()
        {
            return {
                base: "",
                drag: false,
                rgbaColor: "rgba(255,0,0,1)",
                ctx1: "",
                ctx2: "",
                width1: 0,
                height1: 0,
                d_color: "",
                builded_config:
                {},
                css_config:
                {},
                default_config: "ColorPicker"
            };
        },
        methods:
        {
            "emptyColor": function(e)
            {
                this.d_color = "";
                this.setDataValue("", true);
            },
            "rgbToHex": function(r, g, b)
            {
                return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            },
            "fillGradient": function()
            {
                this.ctx1.fillStyle = this.rgbaColor;
                this.ctx1.fillRect(0, 0, this.width1, this.height1);

                var grdWhite = this.ctx2.createLinearGradient(0, 0, this.width1, 0);
                grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
                grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
                this.ctx1.fillStyle = grdWhite;
                this.ctx1.fillRect(0, 0, this.width1, this.height1);

                var grdBlack = this.ctx2.createLinearGradient(0, 0, 0, this.height1);
                grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
                grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
                this.ctx1.fillStyle = grdBlack;
                this.ctx1.fillRect(0, 0, this.width1, this.height1);
            },
            "changeColor": function(e)
            {
                var imageData = this.ctx1.getImageData(e.offsetX, e.offsetY, 1, 1).data;
                this.rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
                var hexColor = ("" + this.rgbToHex(imageData[0], imageData[1], imageData[2]) + "").toUpperCase();
                this.d_color = hexColor;
            },
            /*  EVENTS */
            "colorStripClick": function(e)
            {
                var imageData = this.ctx2.getImageData(e.offsetX, e.offsetY, 1, 1).data;
                this.rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
                this.fillGradient();
            },
            "colorBlockMouseDown": function(e)
            {
                this.drag = true;
                this.changeColor(e);
            },
            "colorBlockMouseMove": function(e)
            {
                if (this.drag)
                {
                    this.changeColor(e);
                }
            },
            "colorBlockMouseUp": function(e)
            {
                this.drag = false;
            },
            "selectColor": function(e)
            {
                this.base.querySelector(".color-input").checked = false;
                this.setDataValue(this.d_color, true);
            },
            "cancelColor": function(e)
            {
                this.d_color = this.value;
                this.base.querySelector(".color-input").checked = false;
            }
        },
        mounted: function()
        {
            //  IF FROM IS ON DISPLAY MODE SO WE DON'T NEED TO INIT PLUGIN
            if (this.isDisplayMode())
            {
                return true;
            }

            //  VARIABLES
            this.d_color = this.value;

            this.base = this.$el;
            var colorBlock = this.base.querySelector(".color-block");
            var colorStrip = this.base.querySelector(".color-strip");

            //  VARIABLES
            this.ctx1 = colorBlock.getContext('2d');
            this.width1 = colorBlock.width;
            this.height1 = colorBlock.height;

            this.ctx2 = colorStrip.getContext('2d');
            var width2 = colorStrip.width;
            var height2 = colorStrip.height;

            //  CREATE COLOR MAPPER
            this.ctx1.rect(0, 0, this.width1, this.height1);
            this.fillGradient();

            this.ctx2.rect(0, 0, width2, height2);
            var grd1 = this.ctx2.createLinearGradient(0, 0, 0, this.height1);
            grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
            grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
            grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
            grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
            grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
            grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
            grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
            this.ctx2.fillStyle = grd1;
            this.ctx2.fill();
        }
    }
);