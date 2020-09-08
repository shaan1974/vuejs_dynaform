//	DOUBLE RANGE

DoubleRange = Vue.component(
    'DoubleRange',
    {
        template: DoubleRange_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Value_Mixin, Event_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'config', 'styles'],
        data: function()
        {
            return {
                "default_config": "doubleRange"
            };
        },
        mounted: function()
        {
            //  IF EMPTY
            if (this.value === "")
            {
                this.updateRangeValue(
                {}, "" + this.builded_config.min + "," + this.builded_config.max + "");

                this.$nextTick(
                    function()
                    {
                        this.changeValue(1, 'init');
                    }
                );
            }
            else
            {
                this.changeValue(1, 'init');
            }

            //  UF INSIDE REPEATER WE RUN THIS EVENT TO SET CORRECTLY THE DOUBLE RANGE SLIDER
            if (typeof this.$parent.formData === "undefined")
            {
                this.$parent.$parent.$on('event_doubleRangeSlider', this.setDoubleRange);
            }
        },
        methods:
        {
            //  CALL IF ELEMENT IS NOT VISIBLE AT RUN TIME LIKE IN TAB
            "setDoubleRange": function()
            {
                this.$nextTick(
                    function()
                    {
                        this.changeValue(1, 'init');
                    }
                );
            },
            "updateRangeValue": function(event, val)
            {
                this.setDataValue(val, true);
            },
            "getCoords": function(elem)
            {
                var box = elem.getBoundingClientRect();
                return {
                    top: box.top + pageYOffset,
                    left: box.left + pageXOffset
                };
            },
            "moveButton": function(evt, m)
            {
                var slideRef = this.name + '_' + this.fieldUid + '_range';
                var slider = this.$el.querySelector("#" + slideRef + "");
                var between = slider.querySelector(".range__between");
                var button1 = slider.querySelector(".range__button_1");
                var button2 = slider.querySelector(".range__button_2");
                var inpt1 = slider.querySelector(".range_inpt1");
                var inpt2 = slider.querySelector(".range_inpt2");

                var sliderCoords = this.getCoords(slider);
                var buttonCoords1 = this.getCoords(button1);
                var buttonCoords2 = this.getCoords(button2);
                var shiftX2 = evt.pageX - buttonCoords2.left;
                var shiftX1 = evt.pageX - buttonCoords1.left;
                var that = this;

                var fctOnMouseMove = function(that, m, slider, button1, button2, between, inpt1, inpt2, sliderCoords, buttonCoords1, buttonCoords2, shiftX2, shiftX1, evt)
                {
                    var left1, right1, left2, right2;

                    if (m === 1)
                    {
                        left1 = evt.pageX - shiftX1 - sliderCoords.left;
                        right1 = slider.offsetWidth - button1.offsetWidth;
                        if (left1 < 0) left1 = 0;
                        if (left1 > right1) left1 = right1;
                        button1.style.marginLeft = left1 + 'px';

                        shiftX2 = evt.pageX - buttonCoords2.left;
                        left2 = evt.pageX - shiftX2 - sliderCoords.left;
                        right2 = slider.offsetWidth - button2.offsetWidth;
                        if (left2 < 0) left2 = 0;
                        if (left2 > right2) left2 = right2;
                    }
                    else
                    {
                        left2 = evt.pageX - shiftX2 - sliderCoords.left;
                        right2 = slider.offsetWidth - button2.offsetWidth;
                        if (left2 < 0) left2 = 0;
                        if (left2 > right2) left2 = right2;
                        button2.style.marginLeft = left2 + 'px';

                        shiftX1 = evt.pageX - buttonCoords1.left;
                        left1 = evt.pageX - shiftX1 - sliderCoords.left;
                        right1 = slider.offsetWidth - button1.offsetWidth;
                        if (left1 < 0) left1 = 0;
                        if (left1 > right1) left1 = right1;
                    }

                    var per_min, per_max;

                    if (left1 > left2)
                    {
                        between.style.width = (left1 - left2) + 'px';
                        between.style.marginLeft = left2 + 'px';
                        per_min = left2 * 100 / (slider.offsetWidth - button1.offsetWidth);
                        per_max = left1 * 100 / (slider.offsetWidth - button1.offsetWidth);
                    }
                    else
                    {
                        between.style.width = (left2 - left1) + 'px';
                        between.style.marginLeft = left1 + 'px';
                        per_min = left1 * 100 / (slider.offsetWidth - button1.offsetWidth);
                        per_max = left2 * 100 / (slider.offsetWidth - button1.offsetWidth);
                    }
                    inpt1.value = (parseInt(that.builded_config.min) + Math.round((that.builded_config.max - that.builded_config.min) * per_min / 100));
                    inpt2.value = (parseInt(that.builded_config.min) + Math.round((that.builded_config.max - that.builded_config.min) * per_max / 100));
                };

                document.on("mousemove.range", fctOnMouseMove.bind(null, that, m, slider, button1, button2, between, inpt1, inpt2, sliderCoords, buttonCoords1, buttonCoords2, shiftX2, shiftX1));

                var fctOnMouseUp = function(that, evt)
                {
                    that.changeValue(1);
                    document.off("mousemove.range");
                    document.off("mouseup.range");
                };

                document.on("mouseup.range", fctOnMouseUp.bind(null, that));

                return false;
            },
            "changeValue": function(m, z)
            {
                if (this.$root.config.displayMode === true)
                {
                    return true;
                }

                var slideRef = this.name + '_' + this.fieldUid + '_range';
                var slider = this.$el.querySelector("#" + slideRef + "");

                var between = slider.querySelector(".range__between");
                var button1 = slider.querySelector(".range__button_1");
                var button2 = slider.querySelector(".range__button_2");
                var inpt1 = slider.querySelector(".range_inpt1");
                var inpt2 = slider.querySelector(".range_inpt2");

                var temp;
                var inpt3 = (m === 1) ? inpt1 : inpt2;

                if (parseInt(inpt3.value) < this.builded_config.min)
                {
                    inpt3.value = this.builded_config.min;
                }

                if (parseInt(inpt3.value) > this.builded_config.max)
                {
                    inpt3.value = this.builded_config.max;
                }

                if (parseInt(inpt1.value) > parseInt(inpt2.value))
                {
                    temp = inpt1.value;
                    inpt1.value = inpt2.value;
                    inpt2.value = temp;
                }

                if (typeof z === "undefined")
                {
                    this.updateRangeValue(
                    {}, inpt1.value + "," + inpt2.value);
                }

                var per1 = parseInt(inpt1.value - this.builded_config.min) * 100 / (this.builded_config.max - this.builded_config.min);
                var per2 = parseInt(inpt2.value - this.builded_config.min) * 100 / (this.builded_config.max - this.builded_config.min);
                var left1 = per1 * (slider.offsetWidth - button1.offsetWidth) / 100;
                var left2 = per2 * (slider.offsetWidth - button1.offsetWidth) / 100;

                button1.style.marginLeft = left1 + 'px';
                button2.style.marginLeft = left2 + 'px';

                between.style.width = ((left1 > left2) ? (left1 - left2) : (left2 - left1)) + 'px';
                between.style.marginLeft = ((left1 > left2) ? left2 : left1) + 'px';
            },
            "destroy": function()
            {
                document.off("mousemove.range");
                document.off("mouseup.range");
            }
        }
    }
);