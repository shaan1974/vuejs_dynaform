/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN - BUTTONS
// 
var Buttons_Mixin = {

    methods:
    {
        /*
            COMMON
        */
        "btn_getElement": function(ref)
        {
            return this.$parent.$parent.$children.find(function(o)
            {
                return o.key3 === "" + ref + "";
            }).$children[0];
        },
        /*
            BUTTONS
        */
        "btnFilterReset": function()
        {
            this.btn_getElement("firstname").setDataValue("");
            this.btn_getElement("lastname").setDataValue("");
            this.btn_getElement("age").setDataValue("");
            this.btn_getElement("age_operator").setDataValue("");
            this.btn_getElement("rights").setDataValue("");
            this.btn_getElement("startDate").setDataValue("");
            this.btn_getElement("endDate").setDataValue("");

            var target = this.$parent.$parent.$parent.$children.find(function(o)
            {
                return o.name === "students";
            });

            target.builded_config.dynamic.headerFiltering.operators[4] = "L";

            this.$nextTick(
                function()
                {
                    this.btnFilterAction();
                });
        },
        "btnFilterAction": function()
        {
            var sDate = this.btn_getElement("startDate").$parent.rowValue;
            sDate = (sDate !== "") ? moment(sDate, "DD-MM-YYYY").format("YYYY-MM-DD") : "";
            var eDate = this.btn_getElement("endDate").$parent.rowValue;
            eDate = (eDate !== "") ? moment(eDate, "DD-MM-YYYY").format("YYYY-MM-DD") : "";

            // var fDate = (sDate === "" || eDate === "") ? "" : "" + sDate + "^" + eDate + "";
            var fDate;

            //  MANAGING DATES INPUT DATA
            //
            if (sDate !== "" && eDate !== "")
            {
                fDate = sDate + "^" + eDate + "";
                fDateOp = "BW";
            }
            else if (sDate !== "" && eDate === "")
            {
                fDate = sDate + "";
                fDateOp = "GT";
            }
            else if (sDate === "" && eDate !== "")
            {
                fDate = eDate + "";
                fDateOp = "LT";
            }
            else
            {
                fDate = "";
                fDateOp = "L";
            }

            var data = {
                _firstName: this.btn_getElement("firstname").$parent.rowValue,
                _lastName: this.btn_getElement("lastname").$parent.rowValue,
                _ageOperator: this.btn_getElement("age_operator").$parent.rowValue,
                _age: this.btn_getElement("age").$parent.rowValue,
                _right: this.btn_getElement("rights").$parent.rowValue,
                _birthDay: fDate,
                /*_birthDayOperator: "BW"*/
                _birthDayOperator: fDateOp
            };

            //	--DEBUG_[ filter data ]
            if (this.$root.config.debugMode === true)
            {
                console.log(data);
            }
            //	--/DEBUG_[ filter data ]

            var target = this.$parent.$parent.$parent.$children.find(function(o)
            {
                return o.name === "students";
            });

            target.builded_config.dynamic.headerFiltering.values[1] = data._firstName;
            target.builded_config.dynamic.headerFiltering.values[2] = data._lastName;
            target.builded_config.dynamic.headerFiltering.values[3] = data._age;
            target.builded_config.dynamic.headerFiltering.operators[3] = data._ageOperator;
            target.builded_config.dynamic.headerFiltering.values[4] = data._birthDay;
            target.builded_config.dynamic.headerFiltering.operators[4] = data._birthDayOperator;
            target.builded_config.dynamic.headerFiltering.values[5] = data._right;

            target.filterChange();
        },
        "btnActionEdit": function()
        {
            alert("EDIT");
            console.log(this);
        },
        "btnActionRemove": function()
        {
            alert("REMOVE");
            console.log(this);
        },
        "btnActionClone": function()
        {
            alert("CLONE");
            console.log(this);
        }
    }
};