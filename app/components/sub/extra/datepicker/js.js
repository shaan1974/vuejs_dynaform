//	DATEPICKER

Datepicker = Vue.component(
    'Datepicker',
    {
        template: Datepicker_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Dico_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Clear_Mixin, Watchers_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'config', 'styles'],
        data: function()
        {
            return {
                date: "",
                activeDate: "",
                activeDay: "",
                active: false,
                calendarDays: [],
                cellHeight: "",
                hidePreviousMonth: false,
                hideNextMonth: false,
                builded_config:
                {},
                css_config:
                {},
                board: 1,
                default_config: "datePicker",
                vvalue: this.value
            };
        },
        watch:
        {
            value: function(event)
            {
                var that = this;
                var elm;

                if (typeof this.builded_config.linkFrom !== "undefined")
                {
                    elm = this.$parent.$children.find(function(o)
                    {
                        return o.name === "" + that.builded_config.linkFrom + "";
                    });

                    //  CASE IF ENCAPSULED INTO ELEMENT LIKE FIELD
                    //
                    if (typeof elm === "undefined")
                    {
                        elm = this.$parent.$parent.$children.find(function(o)
                        {
                            return o.key3 === "" + that.builded_config.linkFrom + "";
                        }).$children[0];
                    }
                    elm.builded_config.unselect.before = moment(this.value, this.builded_config.dateFormat).add(1, "d").format(this.builded_config.dateFormat);
                }

                if (typeof this.builded_config.linkTo !== "undefined")
                {
                    elm = this.$parent.$children.find(function(o)
                    {
                        return o.name === "" + that.builded_config.linkTo + "";
                    });

                    //  CASE IF ENCAPSULED INTO ELEMENT LIKE FIELD
                    //
                    if (typeof elm === "undefined")
                    {
                        elm = this.$parent.$parent.$children.find(function(o)
                        {
                            return o.key3 === "" + that.builded_config.linkTo + "";
                        }).$children[0];
                    }

                    elm.builded_config.unselect.after = moment(this.value, this.builded_config.dateFormat).subtract(1, "d").format(this.builded_config.dateFormat);
                }
            }
        },
        computed:
        {
            "monthes": function()
            {
                this.active = this.active;
                return [].concat([""], moment.months());
            },
            "days": function()
            {
                this.active = this.active;
                return ([].concat([], moment.weekdaysMin()).splice(1)).concat([], ([].concat([], moment.weekdaysMin()).splice(0, 1)));
            },
            "monthYearFormatted": function()
            {
                var s = this.activeDate.split("-");
                return (this.monthes[parseInt(s[1])] + " " + parseInt(s[0]));
            },
            "currentYear": function()
            {
                var s = this.activeDate.split("-");
                return parseInt(s[0]);
            },
            "cellHeightUnit": function()
            {
                return this.cellHeight + "px";
            }
        },
        methods:
        {
            "focus": function()
            {
                if (this.active === false)
                {
                    this.active = true;
                    this.board = 1;
                    this.cellHeight = this.$el.querySelector("input").offsetWidth / 7;

                    //  RESET DATE RELATED TO CURRENT ONE
                    var v = (this.value !== "") ? this.value : moment(moment.now()).format("DD-MM-YYYY");
                    var d = moment(v, "" + this.builded_config.dateFormat + "");
                    var y = d.format("YYYY");
                    var m = d.format("MM");
                    this.activeDate = d.format("YYYY") + "-" + d.format("MM");
                    this.populateCalendar(y, m);
                }
                else
                {
                    this.active = false;
                }
            },
            "blur": function()
            {
                this.active = false;
            },
            "getCurrentMonth": function(z)
            {
                return (typeof z === "undefined") ? moment(moment.now()).format("MM") : moment(moment.now()).format("M");
            },
            "getPreviousMonth": function(month)
            {
                return moment("2000-" + month + "-01", "YYYY-M-DD").subtract(1, "M").format("MM");
            },
            "getNextMonth": function(month)
            {
                return moment("2000-" + month + "-01", "YYYY-M-DD").add(1, "M").format("MM");
            },
            "getCurrentYear": function()
            {
                return moment(moment.now()).format("YYYY");
            },
            "getNumberOfDaysInMonth": function(year, month)
            {
                return moment(year + "-" + month, "YYYY-M").daysInMonth();
            },
            "getNumberOfDaysInPreviousMonth": function(year, month)
            {
                return moment(year + "-" + month, "YYYY-M").subtract(1, "M").daysInMonth();
            },
            "getNumberOfDaysInNextMonth": function(year, month)
            {
                return moment(year + "-" + month, "YYYY-M").add(1, "M").daysInMonth();
            },
            "getFirstDayOfMonth": function(year, month)
            {
                var d = (moment("" + year + "-" + month + "-01", "YYYY-M-DD").day() - 1);
                return (d === -1) ? 6 : d;
            },
            "populateCalendar": function(year, month)
            {
                year = parseInt(year);
                month = parseInt(month);

                this.calendarDays = [];
                var firstDayOfMonth = this.getFirstDayOfMonth(year, month);
                var numberOfRows = Math.ceil(this.getNumberOfDaysInMonth(year, month) / 7);
                var dayNumber = 1;
                // Number of rows to display
                var increment = 1;
                for (var x = 0; x <= numberOfRows; x++)
                {
                    var decrement = 0;
                    var row = [];
                    // var endOfMonth = false;
                    // Fills the first row with previous month ending days
                    if (x == 0)
                    {
                        for (var i = 0; i < firstDayOfMonth; i++)
                        {
                            row.push(
                            {
                                day: this.getNumberOfDaysInPreviousMonth(year, month) - decrement,
                                month: this.getPreviousMonth(month),
                                year: parseInt(year) - ((parseInt(month) == 1) ? 1 : 0)
                            });

                            decrement++;
                        }
                        row.reverse();
                    }

                    // Fills the rest of the rows
                    for (var y = row.length; y < 7 && y < this.getNumberOfDaysInMonth(year, month); y++)
                    {
                        // While current month days are not excedeed
                        if (dayNumber <= this.getNumberOfDaysInMonth(year, month))
                        {
                            row.push(
                            {
                                day: dayNumber,
                                month: month,
                                year: year
                            });
                            dayNumber++;
                        }
                        else
                        {
                            // Fills space left
                            for (var j = row.length; j < 7; j++)
                            {
                                row.push(
                                {
                                    day: increment,
                                    month: this.getNextMonth(month),
                                    year: parseInt(year) + ((parseInt(month) == 12) ? 1 : 0)
                                });

                                increment++;
                                // var t = row;
                            }
                        }
                    }
                    this.calendarDays.push(row);
                }

                //	--DEBUG_[ populate calendar ]
                if (this.$root.config.debugMode === true)
                {
                    console.log("FINISH POPULATE CALENDAR");
                }
                //	--/DEBUG_[ populate calendar ]                

                //  DISPLAY MONTH NAVIGATOR OR NOT
                var cell, currentDate;
                //  --- PREVIOUS
                if (this.builded_config.unselect.before !== "")
                {
                    cell = this.calendarDays[0][0];
                    currentDate = moment(cell.day + "-" + cell.month + "-" + cell.year, "DD-M-YYYY");
                    var beforeDate = moment(this.builded_config.unselect.before, this.builded_config.dateFormat).add(1, 'd');
                    this.hidePreviousMonth = currentDate.isBefore(beforeDate);
                }

                //  --- NEXT
                if (this.builded_config.unselect.after !== "")
                {
                    cell = this.calendarDays[this.calendarDays.length - 1];
                    cell = cell[cell.length - 1];
                    currentDate = moment(cell.day + "-" + cell.month + "-" + cell.year, "DD-M-YYYY");
                    var aftereDate = moment(this.builded_config.unselect.after, this.builded_config.dateFormat).subtract(1, 'd');
                    this.hideNextMonth = currentDate.isAfter(aftereDate);
                }
            },
            "setYear": function(a)
            {
                var d = moment(this.activeDate + "-01", "YYYY-MM-DD")[a](1, "Y");
                this.activeDate = d.format("YYYY") + "-" + d.format("MM");
                this.populateCalendar(d.format("YYYY"), d.format("MM"));
            },
            "defineYear": function(a)
            {
                var d = moment(this.activeDate + "-01", "YYYY-MM-DD").year("" + a + "");
                this.activeDate = d.format("YYYY") + "-" + d.format("MM");
                this.populateCalendar(d.format("YYYY"), d.format("MM"));
            },
            "setMonth": function(a)
            {
                var d = moment(this.activeDate + "-01", "YYYY-MM-DD")[a](1, "M");
                this.activeDate = d.format("YYYY") + "-" + d.format("MM");
                this.populateCalendar(d.format("YYYY"), d.format("MM"));
            },
            "selectDay": function(cell)
            {
                if (cell.month == this.getPreviousMonth(this.activeDate.substr(5, 2)))
                {
                    this.setMonth("subtract");
                }
                else if (cell.month == this.getNextMonth(this.activeDate.substr(5, 2)))
                {
                    this.setMonth("add");
                }

                var month = ((cell.month.toString().length === 1) ? "0" + cell.month.toString() : cell.month.toString());
                var day = ((cell.day.toString().length === 1) ? "0" + cell.day.toString() : cell.day.toString());
                var current_date = cell.year.toString() + "-" + month + "-" + day;
                this.activeDay = current_date;
                this.active = false;
                var that = this;

                setTimeout(
                    function()
                    {
                        that.setDateValue(moment("" + that.activeDay + "", "YYYY-MM-DD").format("" + that.builded_config.dateFormat + ""));
                        that.$el.querySelector("input").blur();
                    }, 10
                );
            },
            "isSelected": function(cell, ibia)
            {
                if (ibia === true) return false;
                var g_day = ((cell.day.toString().length === 1) ? "0" + cell.day.toString() : cell.day.toString());
                var g_month = ((cell.month.toString().length === 1) ? "0" + cell.month.toString() : cell.month.toString());
                var current_date = cell.year + "-" + g_month + "-" + g_day;
                return (current_date === this.activeDay) ? true : false;
            },
            "isDisabled": function(cell, ibia)
            {
                if (ibia === true) return false;
                return (parseInt(cell.month) !== parseInt(moment(this.activeDate + "-01", "YYYY-MM-DD").format("M"))) ? true : false;
            },
            "isToday": function(cell)
            {
                var current_date = cell.year + "-" + cell.month + "-" + ((cell.day.toString().length === 1) ? "0" + cell.day.toString() : cell.day.toString());
                return (current_date === moment(moment.now()).format("YYYY-MM-DD")) ? true : false;
            },
            "emptyDate": function(e)
            {
                this.activeDay = "";
                e.target.nextElementSibling.value = "";
                this.setDateValue("");
                this.active = false;
            },
            "isBefore": function(cell)
            {
                if (this.builded_config.unselect.before !== "")
                {
                    var beforeDate = moment(this.builded_config.unselect.before, this.builded_config.dateFormat);
                    var currentDate = moment(cell.day + "-" + cell.month + "-" + cell.year, "DD-M-YYYY");
                    return currentDate.isBefore(beforeDate);
                }
                return false;
            },
            "isAfter": function(cell)
            {
                if (this.builded_config.unselect.after !== "")
                {
                    var aftereDate = moment(this.builded_config.unselect.after, this.builded_config.dateFormat);
                    var currentDate = moment(cell.day + "-" + cell.month + "-" + cell.year, "DD-M-YYYY");
                    return currentDate.isAfter(aftereDate);
                }
                return false;
            },
            "setDateValue": function(v)
            {
                this.$el.querySelector("[mode='DATE']").value = v;
                this.$el.querySelector("[mode='DATE']").focus();

                this.setDataValue(v, true);
                this.vvalue = v;
            },
            "changeBoard": function()
            {
                this.board = (this.board + 1 === 4) ? 1 : this.board + 1;
            },
            "monthName": function(x)
            {
                return moment()._locale._monthsShort[x];
            },
            "changeMonth": function(x)
            {
                //	--DEBUG_[ Change month ]
                if (this.$root.config.debugMode === true)
                {
                    console.log("Change month");
                    console.log(this);
                    console.log(x);
                }
                //	--/DEBUG_[ Change month ]

                var d = moment(this.activeDate + "-01", "YYYY-MM-DD").month(x);
                this.activeDate = d.format("YYYY") + "-" + d.format("MM");
                this.populateCalendar(d.format("YYYY"), d.format("MM"));

                this.board = 1;
            }
        },
        mounted: function()
        {
            //  BUILD CALENDAR

            //  VARIABLES
            var currentYear, currentMonth, v;

            v = (this.value !== "") ? moment("" + this.value + "", "" + this.builded_config.dateFormat + "") : moment(moment.now());
            currentYear = v.format("YYYY");
            currentMonth = v.format("M");
            if (this.value !== "")
            {
                this.activeDay = v.format("YYYY-MM-DD");
            }

            this.populateCalendar(currentYear, currentMonth);
            this.activeDate = this.getCurrentYear() + "-" + this.getCurrentMonth();

            //  EVENTS
            //  -------- ON SCROLL (TO DO)
            var that = this;

            var fct = function(v)
            {
                if (v.active === true)
                {
                    v.active = false;
                    v.$el.querySelector("input").blur();
                }
            };

            window.on(
                "scroll.datepicker",
                fct.bind(null, that)
            );

            //  -------- ON CLICK OUTSIDE
            var fct2 = function(v, e)
            {
                if (e.target.closest(".form-group-date-picker") === null)
                {
                    if (v.active === true)
                    {
                        v.active = false;
                        v.$el.querySelector("input").blur();
                    }
                }
            };

            window.on(
                "click.datepicker",
                fct2.bind(null, that)
            );
        }
    }
);