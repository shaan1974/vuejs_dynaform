/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	DROP UPLOAD

DropUpload = Vue.component(
    'DropUpload',
    {
        template: DropUpload_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'labelsDropZone', 'config', 'styles'],
        data: function()
        {
            return {
                files: [],
                rejected: [],
                over: false,
                default_config: "dropUpload"
            };
        },
        watch:
        {
            files: function()
            {
                this.setDataValue(this.files, true);
            }
        },
        mounted: function()
        {
            this.builded_config.maxsizeErrorMsg = (typeof this.builded_config.maxsizeErrorMsg !== "undefined") ? this.getLabel(this.$root, this.builded_config.maxsizeErrorMsg) : "(M)";
            this.builded_config.extensionsErrorMsg = (typeof this.builded_config.extensionsErrorMsg !== "undefined") ? this.getLabel(this.$root, this.builded_config.extensionsErrorMsg) : "(M)";
            this.builded_config.maxFilesErrorMsg = (typeof this.builded_config.maxFilesErrorMsg !== "undefined") ? this.getLabel(this.$root, this.builded_config.maxFilesErrorMsg) : "(M)";

            if (typeof this.builded_config.image !== "undefined")
            {
                this.builded_config.ImageErrorMsg = (typeof this.builded_config.image.imageError !== "undefined") ? this.getLabel(this.$root, this.builded_config.image.imageError) : "(M)";
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
            "filteringLength": function(f)
            {
                return this.files.filter(function(o)
                {
                    if (o.name !== f.name && o.size !== f.size) return o;
                }).length;
            },
            "handleFileSelect": function(evt)
            {
                var dt = evt.dataTransfer;
                var files = dt.files;

                this.handleFiles(files);

                evt.stopPropagation();
                evt.preventDefault();
            },
            "handleFiles": function(files)
            {
                //  REMOVE OVER CLASS
                this.over = false;

                var that = this;
                var onloadend = function(that, f, i)
                {
                    //	--DEBUG_[ dropupload filename ]
                    if (that.$root.config.debugMode === true)
                    {
                        console.log("Upload file");
                        console.log("FN " + f.name);
                    }
                    //	--/DEBUG_[ dropupload filename ]

                    if (typeof that.builded_config.image !== "undefined")
                    {
                        var tmpImg = document.createElement("img");
                        tmpImg.src = readers[i].result;
                        tmpImg.id = "TMP_IMG_" + that.shortUuid();
                        tmpImg.style.position = "absolute";
                        tmpImg.style.top = "-10000000000000px";
                        tmpImg.style.left = "-10000000000000px";
                        document.body.appendChild(tmpImg);

                        // document.querySelector("#" + tmpImg.id).on("load", function(t)
                        _Qs("#" + tmpImg.id).on("load", function(t)
                        {
                            var elm = t.target;
                            var w = elm.offsetWidth;
                            var h = elm.offsetHeight;

                            if (w > that.builded_config.image.minWidth && w < that.builded_config.image.maxWidth && h > that.builded_config.image.minHeight && h < that.builded_config.image.maxHeight)
                            {
                                f.data = elm.src;
                                that.files.push(f);
                            }
                            else
                            {
                                // IN ERROR
                                that.rejected.push(
                                {
                                    "name": "" + f.name,
                                    "error": "" + that.builded_config.ImageErrorMsg
                                });
                            }

                            elm.off("load");
                            elm.parentNode.removeChild(elm);
                        });
                    }
                    else
                    {
                        f.data = readers[i].result;
                        that.files.push(f);
                    }
                };

                this.rejected = [];

                var readers = [];
                for (var i = 0; i < files.length; i++)
                {
                    var f = {
                        "name": "" + files[i].name + "",
                        "size": "" + files[i].size + "",
                        "type": "" + ((files[i].type !== "") ? files[i].type : "n/a") + "",
                    };

                    var ext = (f.name.substr(f.name.lastIndexOf('.') + 1)).toLocaleLowerCase();

                    if (that.filteringLength(f) !== that.files.length)
                    {
                        this.rejected.push(
                        {
                            "name": "",
                            "error": "" + this.getLabel(this.$root, "DROP_UPLOAD_FILE_AREADY_IN")
                        });
                    }
                    else if (that.builded_config.maxFiles !== 0 && that.files.length > that.builded_config.maxFiles - 1)
                    {
                        this.rejected.push(
                        {
                            "name": "",
                            "error": "" + that.builded_config.maxFilesErrorMsg
                        });
                    }
                    else if (that.builded_config.maxsizeCheck === true && that.builded_config.maxsize < parseFloat(parseFloat(f.size / 1000).toFixed(2)))
                    {
                        this.rejected.push(
                        {
                            "name": f.name,
                            "error": that.builded_config.maxsizeErrorMsg
                        });
                    }
                    else if (that.builded_config.extenstionsAcceptAll === false && that.builded_config.extensions.indexOf("" + ext + "") === -1)
                    {
                        this.rejected.push(
                        {
                            "name": f.name,
                            "error": that.builded_config.extensionsErrorMsg
                        });
                    }
                    else
                    {
                        readers[i] = new FileReader();
                        readers[i].onloadend = onloadend.bind(null, that, f, i);
                        readers[i].readAsDataURL(files[i]);
                    }
                }
            },
            "handleDragOver": function(evt)
            {
                this.over = true;
                evt.stopPropagation();
                evt.preventDefault();
                evt.dataTransfer.dropEffect = 'copy';
            },
            "handleDragLeave": function(evt)
            {
                this.over = false;
            },
            "remove": function(pI)
            {
                this.files.splice(pI, 1);
                this.rejected = [];
            }
        }
    }
);