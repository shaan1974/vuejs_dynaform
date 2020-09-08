/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	IMAGE CR
//
//  http://www.web-plus-plus.com/Articles/mastering-images-html5-canvas-1
//  https://codepen.io/wellingguzman/pen/VxdaaQ
//  https://codepen.io/jntrn/pen/NBPEMx (pixelate)
//  https: //developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter

ImageCr = Vue.component(
    'ImageCr',
    {
        template: ImageCr_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Dico_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'options', 'behaviours', 'defaultValue', 'propStatus', 'config', 'styles'],
        data: function()
        {
            return {
                image_target: "",
                container: "",
                orig_src: new Image(),
                event_state:
                {},
                constrain: false,
                builded_config:
                {},
                resize_canvas: document.createElement('canvas'),
                imageData: null,
                iWidth: "",
                iHeight: "",
                show_crop_btn: false,
                show_reset_btn: false,
                file_name: "",
                file_type: "",
                file_size: "",
                warning_message_display: false,
                tmp_label: this.getLabel(this.$root, "IMAGE_CR_CHOOSE_FILE"),
                backupImageData: "",
                showEffects: false,
                backupImage: "",
                backupImageWidth: "",
                backupImageHeight: "",
                effectValue: "",
                filters:
                {
                    "GREYSCALE": "255,255,255",
                    "WARMING_85": "236,138,0",
                    "WARMING_LBA": "250,150,0",
                    "WARMING_81": "235,177,19",
                    "COOLLING_80": "0,109,255",
                    "COOLLING_LBB": "0,93,255",
                    "COOLLING_82": "0,181,255",
                    "RED": "234,26,26",
                    "ORANGE": "243,132,23",
                    "YELLOW": "249,227,28",
                    "GREEN": "25,201,25",
                    "CYAN": "29,203,234",
                    "BLUE": "29,53,234",
                    "VIOLET": "155,29,234",
                    "MAGENTA": "227,24,227",
                    "SEPIA": "172,122,51",
                    "UNDERWATER": "172,122,51"
                },
                css_config:
                {},
                default_config: "imageCr"
            };
        },
        computed:
        {
            customLabels: function(x)
            {
                return {
                    "BTN_RESET": this.getLabel(this.$root, "IMAGE_CR_BTN_RESET"),
                    "BTN_CROP": this.getLabel(this.$root, "IMAGE_CR_BTN_CROP"),
                    "CHOOSE": this.getLabel(this.$root, "IMAGE_CR_CHOOSE_FILE"),
                    "INVALID_FORMAT": this.getLabel(this.$root, "IMAGE_CR_INVALID_FORMAT"),
                    "BTN_APPLY": this.getLabel(this.$root, "IMAGE_EFFECT_APPLY"),
                    "EFFECT_TITLE": this.getLabel(this.$root, "IMAGE_EFFECT_TITLE"),
                    "ROTATE": this.getLabel(this.$root, "IMAGE_ROTATE")
                };
            }
        },
        methods:
        {
            "notEmptyObject": function(someObject)
            {
                return Object.keys(someObject).length;
            },
            "setEffectValue": function(e)
            {
                this.effectValue = e.target.value;
            },
            "customEffect": function(z)
            {
                //  INIT
                var image = this.$el.querySelector(".resize-image");

                var myCanvas = document.createElement("canvas");
                var myCanvasContext = myCanvas.getContext("2d");

                var imgWidth = image.width;
                var imgHeight = image.height;
                // You'll get some string error if you fail to specify the dimensions
                myCanvas.width = imgWidth;
                myCanvas.height = imgHeight;
                myCanvasContext.drawImage(image, 0, 0);

                // This function cannot be called if the image is not rom the same domain.
                // You'll get security error if you do.
                var imageData = myCanvasContext.getImageData(0, 0, imgWidth, imgHeight);

                //  TAKE FILTER
                var filterName = "" + z + "";
                var density = 100;

                var filter = this.filters["" + filterName + ""].split(",");
                filter = {
                    "r": filter[0],
                    "g": filter[1],
                    "b": filter[2]
                };

                //  CALCULATE
                var rIntensity = (filter.r * density + 255 * (100 - density)) / 25500;
                var gIntensity = (filter.g * density + 255 * (100 - density)) / 25500;
                var bIntensity = (filter.b * density + 255 * (100 - density)) / 25500;
                var d = imageData.data;

                //  TRANSFORM DATA
                for (var i = 0; i < d.length; i += 4)
                {
                    var luma = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
                    d[i] = Math.round(rIntensity * luma);
                    d[i + 1] = Math.round(gIntensity * luma);
                    d[i + 2] = Math.round(bIntensity * luma);
                }
                imageData.data = d;

                // put image data back to context
                myCanvasContext.putImageData(imageData, 0, 0);
                image.src = myCanvas.toDataURL();
                this.imageData = myCanvas.toDataURL();
            },
            "rotateEffect": function(n)
            {
                var imgObj = this.$el.querySelector(".resize-image");
                var canvas = document.createElement('canvas');
                var canvasContext = canvas.getContext('2d');
                var imgW = imgObj.width;
                var imgH = imgObj.height;
                var w = imgW;
                var ratio = (imgW / w);
                var h = (imgH / ratio);
                canvas.width = h;
                canvas.height = w;

                switch (n)
                {
                    case "r-90":
                        canvasContext.translate(w - h, w);
                        canvasContext.rotate((-90 * Math.PI) / 180);
                        canvasContext.translate(0, -(w - h));
                        break;
                    case "r90":
                        canvasContext.translate(h, 0);
                        canvasContext.rotate((90 * Math.PI) / 180);
                        break;
                }

                canvasContext.drawImage(imgObj, 0, 0, w, h);

                // put image data back to context
                imgObj.src = canvas.toDataURL();
            },
            "loadData": function(gs)
            {
                this.showEffects = false;

                //set the image target
                this.image_target.src = this.imageData;
                this.orig_src.src = this.image_target.src;
                this.container.style.display = "inline-block";
                //set the image tot he init height
                this.image_target.style.width = "auto";
                this.image_target.style.height = this.init_height + "px";

                //resize the canvas
                var that = this;
                this.orig_src.on("load", function()
                {
                    that.resizeImageCanvas(that.image_target.width, that.image_target.height);

                    if (typeof gs !== "undefined")
                    {
                        if (gs === "load")
                        {
                            that.backupImageWidth = that.image_target.width;
                            that.backupImageHeight = that.image_target.height;
                            gs = "";
                        }

                        if (gs === "reset")
                        {
                            that.image_target.style.width = that.backupImageWidth + "px";
                            that.image_target.style.height = that.backupImageHeight + "px";
                            gs = "";
                        }
                    }
                });
            },
            "startResize": function(e)
            {
                if (this.isDisplayMode())
                {
                    return true;
                }

                e.preventDefault();
                e.stopPropagation();
                this.saveEventState(e);
                document.on(['mousemove.icr', 'touchmove.icr'], this.resizing);
                document.on(['mouseup.icr', 'touchend.icr'], this.endResize);
            },
            "endResize": function(e)
            {
                if (this.isDisplayMode())
                {
                    return true;
                }

                this.resizeImageCanvas(this.image_target.width, this.image_target.height);
                e.preventDefault();
                document.off('mouseup.icr', this.endResize);
                document.off('touchend.icr', this.endResize);
                document.off('mousemove.icr', this.endResize);
                document.off('touchmove.icr', this.endResize);
            },
            "saveEventState": function(e)
            {
                // Save the initial event details and container state
                this.event_state.container_width = parseInt(window.getComputedStyle(this.container).width);
                this.event_state.container_height = parseInt(window.getComputedStyle(this.container).height);
                this.event_state.container_left = this.container.getBoundingClientRect().left;
                this.event_state.container_top = this.container.getBoundingClientRect().top;
                this.event_state.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + this.get_windowSCrollX();
                this.event_state.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + this.get_windowSCrollY();
                this.event_state.evnt = e;
            },
            "resizing": function(e)
            {
                var mouse = {},
                    width, height, left, top;

                mouse.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX);
                mouse.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY);

                if (typeof this.event_state.evnt.target !== "undefined")
                {
                    if (this.event_state.evnt.target.classList.contains("resize-handle-se"))
                    {
                        width = mouse.x - this.event_state.container_left;
                        height = mouse.y - this.event_state.container_top;
                        left = this.event_state.container_left;
                        top = this.event_state.container_top;
                    }
                    else if (this.event_state.evnt.target.classList.contains("resize-handle-sw"))
                    {
                        width = this.event_state.container_width - (mouse.x - this.event_state.container_left);
                        height = mouse.y - this.event_state.container_top;
                        left = mouse.x;
                        top = this.event_state.container_top;
                    }
                    else if (this.event_state.evnt.target.classList.contains("resize-handle-nw"))
                    {
                        width = this.event_state.container_width - (mouse.x - this.event_state.container_left);
                        height = this.event_state.container_height - (mouse.y - this.event_state.container_top);
                        left = mouse.x;
                        top = mouse.y;
                        if (this.constrain || e.shiftKey)
                        {
                            top = mouse.y - ((width / this.orig_src.width * this.orig_src.height) - height);
                        }
                    }
                    else if (this.event_state.evnt.target.classList.contains("resize-handle-ne"))
                    {
                        width = mouse.x - this.event_state.container_left;
                        height = this.event_state.container_height - (mouse.y - this.event_state.container_top);
                        left = this.event_state.container_left;
                        top = mouse.y;
                        if (this.constrain || e.shiftKey)
                        {
                            top = mouse.y - ((width / this.orig_src.width * this.orig_src.height) - height);
                        }
                    }
                }

                // Optionally maintain aspect ratio
                if (this.constrain || e.shiftKey)
                {
                    height = width / this.orig_src.width * this.orig_src.height;
                }

                if (width > this.builded_config.min_width && height > this.builded_config.min_height && width < this.builded_config.max_width && height < this.builded_config.max_height)
                {
                    // To improve performance you might limit how often resizeImage() is called
                    this.resizeImage(width, height);
                    // Without this Firefox will not re-calculate the the image dimensions until drag end
                    this.container.style.left = left - this.$el.querySelector(".crop-wrapper").getBoundingClientRect().left + "px";
                    this.container.style.top = top - this.$el.querySelector(".crop-wrapper").getBoundingClientRect().top + "px";
                }
            },
            "resizeImage": function(width, height)
            {
                this.image_target.style.width = width + "px";
                this.image_target.style.height = height + "px";
            },

            "resizeImageCanvas": function(width, height)
            {
                this.resize_canvas.width = width;
                this.resize_canvas.height = height;
                this.resize_canvas.getContext('2d').drawImage(this.orig_src, 0, 0, width, height);
                this.image_target.setAttribute('src', this.resize_canvas.toDataURL("image/png"));
            },
            "startMoving": function(e)
            {
                if (this.isDisplayMode())
                {
                    return true;
                }

                e.preventDefault();
                e.stopPropagation();
                this.saveEventState(e);
                document.on(['mousemove.icr', 'touchmove.icr'], this.moving);
                document.on(['mouseup.icr', 'touchend.icr'], this.endMoving);
            },
            "endMoving": function(e)
            {
                if (this.isDisplayMode())
                {
                    return true;
                }

                e.preventDefault();
                document.off('mouseup.icr', this.endMoving);
                document.off('touchend.icr', this.endMoving);
                document.off('mousemove.icr', this.moving);
                document.off('touchmove.icr', this.moving);
            },
            "moving": function(e)
            {
                if (this.isDisplayMode() || this.$el.querySelector(".resize-container-ontop").style.cursor === "default")
                {
                    return true;
                }

                var mouse = {},
                    touches;
                e.preventDefault();
                e.stopPropagation();

                touches = [];
                touches[0] = {
                    "clientX": e.clientX,
                    "clientY": e.clientY
                };

                mouse.x = (e.clientX || e.pageX || touches[0].clientX) + this.get_windowSCrollX();
                mouse.y = (e.clientY || e.pageY || touches[0].clientY) + this.get_windowSCrollY();
                this.container.style.left = (mouse.x - (this.event_state.mouse_x - this.event_state.container_left) - this.$el.querySelector(".crop-wrapper").getBoundingClientRect().left) + "px";
                this.container.style.top = (mouse.y - (this.event_state.mouse_y - this.event_state.container_top) - this.$el.querySelector(".crop-wrapper").getBoundingClientRect().top) + "px";

                // Watch for pinch zoom gesture while moving
                if (this.event_state.touches && this.event_state.touches.length > 1 && touches.length > 1)
                {
                    var width = this.event_state.container_width,
                        height = this.event_state.container_height;
                    var a = this.event_state.touches[0].clientX - this.event_state.touches[1].clientX;
                    a = a * a;
                    var b = this.event_state.touches[0].clientY - this.event_state.touches[1].clientY;
                    b = b * b;
                    var dist1 = Math.sqrt(a + b);

                    a = e.originalEvent.touches[0].clientX - touches[1].clientX;
                    a = a * a;
                    b = e.originalEvent.touches[0].clientY - touches[1].clientY;
                    b = b * b;
                    var dist2 = Math.sqrt(a + b);

                    var ratio = dist2 / dist1;

                    width = width * ratio;
                    height = height * ratio;
                    // To improve performance you might limit how often resizeImage() is called
                    this.resizeImage(width, height);
                }
            },
            "crop": function()
            {
                this.showEffects = true;

                //Find the part of the image that is inside the crop box
                var crop_canvas;
                var left = this.$el.querySelector(".overlay").getBoundingClientRect().left - this.$el.querySelector(".resize-container").getBoundingClientRect().left;
                var top = this.$el.querySelector(".overlay").getBoundingClientRect().top - this.$el.querySelector(".resize-container").getBoundingClientRect().top;
                var width = parseInt(window.getComputedStyle(this.$el.querySelector(".overlay")).width);
                var height = parseInt(window.getComputedStyle(this.$el.querySelector(".overlay")).height);

                crop_canvas = document.createElement('canvas');
                crop_canvas.width = width;
                crop_canvas.height = height;
                crop_canvas.getContext('2d').drawImage(this.image_target, left, top, width, height, 0, 0, width, height);
                var dataURL = crop_canvas.toDataURL("image/png");
                this.image_target.src = dataURL;
                this.orig_src.src = this.image_target.src;

                this.iWidth = width;
                this.iHeight = height;

                var that = this;
                this.image_target.once("load", function()
                {
                    that.image_target.style.width = width + "px";
                    that.image_target.style.height = height + "px";

                    that.image_target.parentNode.style.top = (that.$el.querySelector(".overlay").getBoundingClientRect().top - that.$el.querySelector(".crop-wrapper").getBoundingClientRect().top) + 2 + "px";
                    that.image_target.parentNode.style.left = (that.$el.querySelector(".overlay").getBoundingClientRect().left - that.$el.querySelector(".crop-wrapper").getBoundingClientRect().left) + 2 + "px";
                });

                var oFile = {
                    "name": this.file_name,
                    "size": this.file_size,
                    "type": this.file_type,
                    "value": dataURL
                };

                this.setDataValue(oFile, true);
            },
            "get_windowSCrollX": function()
            {
                if (typeof window.document.documentMode !== "undefined")
                {
                    return (typeof window.pageXOffset !== "undefined") ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
                }
                return window.scrollX;
            },
            "get_windowSCrollY": function()
            {
                if (typeof window.document.documentMode !== "undefined")
                {
                    return (typeof window.pageYOffset !== "undefined") ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                }
                return window.scrollY;
            },
            "resetImage": function()
            {
                this.showEffects = false;
                this.$el.querySelector(".resize-container").style.display = "none";
                this.$el.querySelector(".resize-container").style.top = "0px";
                this.$el.querySelector(".resize-container").style.left = "0px";

                if (this.imageData)
                {
                    this.imageData = this.backupImage;

                    this.loadData('reset');

                    this.$nextTick(
                        function()
                        {
                            this.setDataValue(
                            {}, true);
                        }
                    );
                }
            },
            "animationOff": function()
            {
                this.warning_message_display = false;
            },
            "remove": function()
            {
                this.showEffects = false;

                this.$el.querySelector(".resize-image").setAttribute("src", "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
                // this.$el.querySelector(".resize-image").setAttribute("src", this.builded_config.emptyImage);
                this.$el.querySelector(".overlay").style.backgroundImage = "url('" + this.builded_config.emptyImage + "')";

                this.$el.querySelector(".resize-container").style.display = "none";
                this.tmp_label = this.getLabel(this.$root, "IMAGE_CR_CHOOSE_FILE");

                this.show_crop_btn = false;
                this.show_reset_btn = false;

                this.$nextTick(
                    function()
                    {
                        this.setDataValue(
                        {}, true);
                    }
                );
            },
            "destroy": function()
            {
                // document.querySelector(".js-loadfile").off("change");
                _Qs(".js-loadfile").off("change");
            }
        },
        mounted: function()
        {
            //  REINIT CSS
            this.$el.querySelector(".crop-wrapper").style.width = this.builded_config.crop_width + "px";
            this.$el.querySelector(".crop-wrapper").style.height = this.builded_config.crop_height + "px";

            var that = this;

            var pp = {
                "nw": ["top", "left"],
                "sw": ["bottom", "left"],
                "ne": ["top", "right"],
                "se": ["bottom", "right"]
            };

            ["ne", "se", "nw", "sw"].forEach
                (
                    function(o, i)
                    {
                        that.$el.querySelector(".resize-handle-" + o + "").style.width = that.builded_config.handler.width + "px";
                        that.$el.querySelector(".resize-handle-" + o + "").style.height = that.builded_config.handler.height + "px";
                        that.$el.querySelector(".resize-handle-" + o + "").style.display = "none";

                        that.$el.querySelector(".resize-handle-" + o + "").style["" + pp[o][0] + ""] = (-1 * (that.builded_config.handler.width / 2)) + "px";
                        that.$el.querySelector(".resize-handle-" + o + "").style["" + pp[o][1] + ""] = (-1 * (that.builded_config.handler.width / 2)) + "px";

                    }
                );

            this.$el.querySelector(".resize-container-ontop").style.cursor = "default"; // MOVE

            //  IF FROM IS ON DISPLAY MODE SO WE DON'T NEED TO INIT PLUGIN
            if (this.isDisplayMode())
            {
                this.$nextTick(
                    function()
                    {
                        this.$el.querySelector(".resize-container").style.display = "block";

                        var vTop = ((this.builded_config.crop_height - this.builded_config.image_height) + 4) / 2;
                        this.$el.querySelector(".resize-container").style.top = vTop + "px";

                        var vLeft = ((this.builded_config.crop_width - this.builded_config.image_height) + 4) / 2;
                        this.$el.querySelector(".resize-container").style.left = vLeft + "px";

                        this.$el.querySelector(".resize-image").style.height = this.builded_config.image_height + "px";
                    });

                return true;
            }

            //  IMAGE CR MAIN            
            this.image_target = this.$el.querySelector('.resize-image');

            var cropWrapper = this.$el.querySelector(".crop-wrapper");
            cropWrapper.style.width = this.builded_config.crop_width + "px";
            cropWrapper.style.height = this.builded_config.crop_height + "px";

            var overLay = this.$el.querySelector(".overlay");
            overLay.style.width = parseInt(this.builded_config.crop_width / 1.33333) + "px";
            overLay.style.height = parseInt(this.builded_config.crop_height / 1.16666) + "px";
            overLay.style.marginLeft = (-1 * parseInt(overLay.style.width) / 2) + "px";
            overLay.style.marginTop = (-1 * parseInt(overLay.style.height) / 2) + "px";

            this.$el.querySelector(".top-overlay").style.marginTop = (-1 * parseInt(overLay.style.height) / 2) + "px";
            this.$el.querySelector(".bottom-overlay").style.marginBottom = ((-1 * parseInt(overLay.style.height) / 2) - 4) + "px";

            var leftOverlay = this.$el.querySelector(".left-overlay");
            leftOverlay.style.marginTop = (-1 * parseInt(overLay.style.height) / 2) + "px";
            leftOverlay.style.marginRight = (-1 * parseInt(overLay.style.width) / 2) - 4 + "px";
            leftOverlay.style.height = (parseInt(overLay.style.height) + 4) + "px";

            var rightOverlay = this.$el.querySelector(".right-overlay");
            rightOverlay.style.marginTop = (-1 * parseInt(overLay.style.height) / 2) + "px";
            rightOverlay.style.marginLeft = (-1 * parseInt(overLay.style.width) / 2) + "px";
            rightOverlay.style.height = (parseInt(overLay.style.height) + 4) + "px";

            //  IF FILES EXTENSIONS ACCEPTED IF RELATED TO CONFIG
            if (typeof this.builded_config.extensions === "string")
            {
                this.builded_config.extensions = this.$root.config.filesCategories["" + this.builded_config.extensions + ""];
            }

            //load a file with html5 file api

            // document.querySelector(".js-loadfile").on("change", function(evt)
            _Qs(".js-loadfile").on("change", function(evt)
            {
                var files = evt.target.files; // FileList object
                var reader = new FileReader();

                that.file_name = files[0].name;
                that.file_size = files[0].size;
                that.file_type = files[0].type;

                var ext = (files[0].name.substr(files[0].name.lastIndexOf('.') + 1)).toLocaleLowerCase();

                if (that.builded_config.extensions.indexOf("" + ext + "") === -1)
                {
                    that.warning_message_display = true;
                }
                else
                {
                    that.tmp_label = that.file_name;
                    reader.onload = function(e)
                    {
                        that.showEffects = false;
                        that.backupImage = reader.result;

                        that.imageData = reader.result;
                        that.loadData('load');

                        that.show_crop_btn = true;
                        that.show_reset_btn = true;

                        that.$el.querySelector("input[type='file']").blur();

                        that.$el.querySelector(".resize-handle-ne").style.display = "";
                        that.$el.querySelector(".resize-handle-se").style.display = "";
                        that.$el.querySelector(".resize-handle-nw").style.display = "";
                        that.$el.querySelector(".resize-handle-sw").style.display = "";
                        that.$el.querySelector(".resize-container-ontop").style.cursor = "move";

                        that.$el.querySelector(".overlay").style.backgroundImage = "url('')";

                    };
                    reader.readAsDataURL(files[0]);
                }
            });

            // When resizing, we will always use this copy of the original as the base
            this.orig_src.src = this.image_target.src;
            // Wrap the image with the container and add resize handles
            this.image_target.style.height = this.init_height + "px";
            // Assign the container to a variable
            this.container = this.$el.querySelector(".resize-container");

            //  IN CASE OF IMAGE IS ALREADY IN DATA
            if (this.notEmptyObject(this.value))
            {
                if (this.isNotDisplayMode())
                {
                    this.tmp_label = this.value.name;
                    this.imageData = this.value.value;
                    this.loadData('load');

                    var vTop = ((this.builded_config.crop_height - this.builded_config.image_height) + 4) / 2;
                    this.$el.querySelector(".resize-container").style.top = vTop + "px";

                    var vLeft = ((this.builded_config.crop_width - this.builded_config.image_height) + 4) / 2;
                    this.$el.querySelector(".resize-container").style.left = vLeft + "px";

                    this.$el.querySelector(".resize-image").style.height = this.builded_config.image_height + "px";
                }
            }
        }
    }
);