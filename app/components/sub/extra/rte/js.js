/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	RTE
//  https://github.com/JiHong88/SunEditor

Rte = Vue.component(
    'Rte',
    {
        template: Rte_template,
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'resetBtn', 'behaviours', 'defaultValue', 'propStatus', 'config', 'styles'],
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Value_Mixin, Event_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin],
        data: function()
        {
            return {
                "editor": "",
                "binaryLength": "",
                "updateContent": true,
                "default_config": "rte"
            };
        },
        watch:
        {
            "status_ability": function()
            {
                if (this.status_ability === true)
                {
                    this.editor.enabled();
                    this.editor.toolbar.show();
                }
                else
                {
                    this.editor.disabled();
                    this.editor.toolbar.hide();
                }
            }
        },
        computed:
        {
            customLabels: function(x)
            {
                return [
                    this.getLabel(this.$root, "RTE_LIMIT_REACH")
                ];
            }
        },
        mounted: function()
        {
            //  CUSTOM PLUGIN TO CREATE CLEAR BUTTON
            var that = this;

            //  IF FROM IS ON DISPLAY MODE SO WE DON'T NEED TO INIT PLUGIN
            if (this.isDisplayMode())
            {
                return true;
            }

            /*
            var addFct = function(that, core, targetElement)
            {
                core.setContents('');
                that.editor.noticeClose();
                that.updateContent = true;
                that.$el.querySelector("textarea").trigger("validate");

                var context = core.context;
                context.custom = {
                    textElement: null
                };

                var listDiv = core.plugins.custom_plugin_clear.setSubmenu.call(core, that);
                targetElement.parentNode.appendChild(listDiv);
            };

            var custom_plugin_clear = {
                name: 'custom_plugin_clear',
                add: addFct.bind(null, that),
                setSubmenu: function()
                {
                    //  REASSIGN TO BUTTON
                    that.$el.querySelector("[data-command='custom_plugin_clear']").addEventListener("click", this.plugins.custom_plugin_clear.onClick.bind(null, this, arguments[0]));

                    var listDiv = this.util.createElement('DIV');
                    return listDiv;
                },
                on: function() {},
                onClick: function(core, v, e)
                {
                    core.setContents('');
                    v.editor.noticeClose();
                    v.updateContent = true;
                    v.$el.querySelector("textarea").trigger("validate");
                }
            };
            */

            /* --- */
            /*
            var plugin_command = {
                name: 'customCommand',
                display: 'command',

                add: function(core, targetElement)
                {
                    var context = core.context;
                    var rangeTag = core.util.createElement('div');

                    context.customCommand = {
                        targetButton: targetElement,
                        tag: rangeTag
                    };
                },

                active: function(element)
                {
                    return false;
                },

                action: function()
                {
                    this.setContents('');
                    this.context.element.originElement.trigger("validate");
                }
            };
            */
            /* --- */

            //  INIT EDITOR RELATED TO NAME REF OF TEXTAREA
            // this.editor = SUNEDITOR.create((document.querySelector("[name='" + this.name + "_" + this.fieldUid + "']")),
            this.editor = SUNEDITOR.create((_Qs("[name='" + this.name + "_" + this.fieldUid + "']")),
            {
                "toolbarWidth": "100%",
                "resizingBar": false,
                /* should be disabled in next version */
                "showPathLabel": false,

                /*"mode": "classic",*/
                /*
                "charCounter": true,
                "charCounterType": "byte-html",
                "charCounterLabel": "Test",
                "maxCharCount": "100",
                */

                "height": "auto",
                "minHeight": "150px",
                "lang": SUNEDITOR_LANG['' + (this.$root.config.lg.short).toLocaleLowerCase() + ''],
                "plugins": [ /*plugin_command*/ /*, custom_plugin_clear*/ ],
                "buttonList": [
                    [
                        {
                            name: 'customCommand',
                            dataCommand: 'customCommand',
                            buttonClass: '',
                            title: '' + this.getLabel(this.$root, "RTE_CLEAR_BTN") + '',
                            dataDisplay: 'command',
                            innerHTML: '<i class="xse-icon-add icon-empty"></i>'
                        }
                        /*,
                                            {
                                                name: 'custom_plugin_clear',
                                                dataCommand: 'custom_plugin_clear',
                                                buttonClass: '',
                                                title: 'Custom plugin of the submenu',
                                                dataDisplay: 'submenu',
                                                innerHTML: '<i class="xse-icon-add icon-empty"></i>'
                                            }*/
                    ],
                    ['undo', 'redo'],
                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                    ['fontColor', 'hiliteColor'],
                    ['removeFormat'],
                    ['outdent', 'indent'],
                    ['align', 'horizontalRule', 'list'],
                    ['table', 'link'],
                    ['fullScreen', 'showBlocks']
                ]
            });

            //  CHECK STATUS
            if (this.status_ability === false)
            {
                this.editor.disabled();
                this.editor.toolbar.hide();
            }

            //  EVENTS
            //  ---- ONLOAD
            this.assignEventOnload();
            //  ---- ONCHANGE
            this.assignEventOnChange();
            //  ---- ONKEYDOWN
            this.assignEventOnKeyDown();
            //  ---- ONKEYUP
            this.assignEventOnKeyUp();
            //  ---- ONPASTE
            this.assignEventOnPaste();

            //  INIT COUNTER
            this.calculateCounter();

            //  IF INSIDE REPEATER WE RUN THIS EVENT TO BE ABLE TO REMOVE ALL COMPONENTS DECLARATION TO AVOID MEMORY LEAKS
            /*
            if (typeof this.$parent.formData === "undefined")
            {
                this.$parent.$parent.$on('event_destroyComponents', this.destroy);
            }
            */
        },
        methods:
        {
            "calculateCounter": function()
            {
                this.binaryLength = this.editor.getContents().BLENGTH();
            },
            /*
                EVENTS
            */
            "assignEventOnload": function()
            {
                var that = this;
                var fctOnLoad = function(that, r) {};
                this.editor.onload = fctOnLoad.bind(null, that);
            },
            "assignEventOnChange": function()
            {
                var that = this;

                var fctOnChange = function(that, contents)
                {
                    //  IF WE REACH THE MAXIMUM NOTICE IS DISPLAY
                    // if (that.editor.getContents().BLENGTH() > parseInt(that.maxlength.max))
                    if (that.editor.getContents().BLENGTH() > parseInt(that.builded_config.max))
                    {
                        that.editor.noticeOpen('' + that.customLabels[0] + '');
                        that.updateContent = false;
                        that.updateToTextArea("");
                        that.editor.save();
                    }
                    else
                    {
                        that.editor.noticeClose();
                        that.updateContent = true;
                    }

                    if (that.updateContent === true)
                    {
                        that.editor.save();
                        that.updateToTextArea(contents);
                        that.$el.querySelector("textarea").trigger("validate");
                    }
                    that.binaryLength = that.editor.getContents().BLENGTH();
                };

                this.editor.onChange = fctOnChange.bind(null, that);
            },
            "assignEventOnKeyDown": function()
            {
                var that = this;

                var fctKeyDown = function(that, e)
                {
                    /* that.editor.getContents().BLENGTH(), e.key.BLENGTH(), parseInt(that.maxlength.max));*/
                };
                this.editor.onKeyDown = fctKeyDown.bind(null, that);
            },
            "assignEventOnKeyUp": function()
            {
                var that = this;
                var fctOnKeyUp = function(that)
                {
                    that.binaryLength = that.editor.getContents().BLENGTH();

                    //  IF WE REACH THE MAXIMUM NOTICE IS DISPLAY
                    if (that.editor.getContents().BLENGTH() > parseInt(that.builded_config.max))
                    {
                        that.editor.noticeOpen('' + that.customLabels[0] + '');
                        that.updateContent = false;
                        that.updateToTextArea("");
                    }
                    else
                    {
                        that.editor.noticeClose();
                        that.updateContent = true;
                    }
                };

                this.editor.onKeyUp = fctOnKeyUp.bind(null, that);
            },
            "assignEventOnPaste": function()
            {
                var that = this;
                var fctOnPaste = function(that, clipboard, pastedContent)
                {
                    /* that.editor.getContents().BLENGTH(), pastedContent.BLENGTH(), parseInt(that.maxlength.max */
                    return true;
                };

                this.editor.onPaste = fctOnPaste.bind(null, that);
            },
            /*
                UPDATE
            */
            "updateToTextArea": function(c)
            {
                if (c === "<p><br></p>")
                {
                    c = "";
                }

                this.setDataValue("" + c + "", true);
            },
            /*
                DESTROY
            */
            "destroy": function()
            {
                this.editor.destroy();
            }
        }
    }
);