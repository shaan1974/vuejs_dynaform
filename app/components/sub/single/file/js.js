//	INPUT FILE

FileInput = Vue.component(
    'FileInput',
    {
        template: FileInput_template,
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'config', 'styles', 'config'],
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin],
        data: function()
        {
            return {
                "fileName": "",
                "status": true,
                "warning_message_display": false,
                "warning_message": "",
                "default_config": "fileInput"
            };
        },
        mounted: function()
        {
            if (typeof this.value.name !== "undefined")
            {
                this.fileName = this.value.name;
            }

            //  LABELS
            this.builded_config.maxsizeErrorMsg = (typeof this.builded_config.maxsizeErrorMsg !== "undefined") ? this.getLabel(this.$root, this.builded_config.maxsizeErrorMsg) : "(M)";
            this.builded_config.extensionsErrorMsg = (typeof this.builded_config.extensionsErrorMsg !== "undefined") ? this.getLabel(this.$root, this.builded_config.extensionsErrorMsg) : "(M)";

            if (typeof this.builded_config.image !== "undefined")
            {
                this.builded_config.image.imageError = (typeof this.builded_config.image.imageError !== "undefined") ? this.getLabel(this.$root, this.builded_config.image.imageError) : "(M)";
            }

            if (typeof this.builded_config.extensions !== "undefined")
            {
                //  IF FILES EXTENSIONS ACCEPTED IF RELATED TO CONFIG
                if (typeof this.builded_config.extensions === "string")
                {
                    this.builded_config.extensions = this.$root.config.filesCategories["" + this.builded_config.extensions + ""];
                }

                this.builded_config.extensions = this.builded_config.extensions.map(function(o)
                {
                    return o.toLocaleLowerCase();
                });
            }
        },
        methods:
        {
            "notEmptyObject": function(someObject)
            {
                return Object.keys(someObject).length;
            },
            //  RELATED TO ONE OF MY JSFIDDLE 
            //  https://jsfiddle.net/shaan1974/7Lbt5431/
            //
            "handleFileSelect": function(evt)
            {
                var files = evt.target.files;
                var f = files[0];
                var reader = new FileReader();
                var that = this;

                reader.onload = (function(theFile)
                {
                    return function(e)
                    {
                        var oFile = {
                            "name": f.name,
                            "size": f.size,
                            "type": f.type,
                            "value": e.target.result
                        };

                        var ext = (f.name.substr(f.name.lastIndexOf('.') + 1)).toLocaleLowerCase();

                        if (typeof that.builded_config.image !== "undefined")
                        {
                            var tmpImg = document.createElement("img");
                            tmpImg.src = e.target.result;
                            tmpImg.id = "TMP_IMG";
                            tmpImg.style.position = "absolute";
                            tmpImg.style.top = "-10000000000000px";
                            tmpImg.style.left = "-10000000000000px";
                            document.body.appendChild(tmpImg);

                            // document.querySelector("#TMP_IMG").once("load", function()
                            _Qs("#TMP_IMG").once("load", function()
                            {
                                // var elm = document.querySelector("#TMP_IMG");
                                var elm = _Qs("#TMP_IMG");
                                var w = elm.offsetWidth;
                                var h = elm.offsetHeight;

                                if (w > that.builded_config.image.minWidth && w < that.builded_config.image.maxWidth && h > that.builded_config.image.minHeight && h < that.builded_config.image.maxHeight)
                                {}
                                else
                                {
                                    that.warning_message = that.builded_config.image.imageError;
                                    that.warning_message_display = true;
                                    that.fileName = '';
                                    that.setDataValue(
                                    {}, true);
                                }

                                elm.parentNode.removeChild(elm);
                            });
                        }

                        if (that.builded_config.maxsizeCheck === true && that.builded_config.maxsize < parseFloat(parseFloat(f.size / 1000).toFixed(2)))
                        {
                            that.warning_message = that.builded_config.maxsizeErrorMsg;
                            that.warning_message_display = true;
                        }
                        else if (that.builded_config.extenstionsAcceptAll === false && that.builded_config.extensions.indexOf("" + ext + "") === -1)
                        {
                            that.warning_message = that.builded_config.extensionsErrorMsg;
                            that.warning_message_display = true;
                        }
                        else
                        {
                            that.fileName = f.name;
                            that.setDataValue(oFile, true);
                            evt.target.blur();
                        }
                    };
                })(f);

                // reader.readAsText(f,"windows-1252");
                reader.readAsDataURL(f);
            },
            "reset": function(evt)
            {
                this.fileName = "";

                this.setDataValue(
                {}, true);

                this.status = false;

                this.$nextTick(
                    function()
                    {
                        this.status = true;
                    });
            },
            "animationOff": function()
            {
                this.warning_message_display = false;
            }
        }
    }
);