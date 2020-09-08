/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN - PRECALCULATED
// 
/*
var findNested = function(obj, key, memo)
{
    var i,
        proto = Object.prototype,
        ts = proto.toString,
        hasOwn = proto.hasOwnProperty.bind(obj);

    if ('[object Array]' !== ts.call(memo)) memo = [];

    for (i in obj)
    {
        if (hasOwn(i))
        {
            if (i === key)
            {
                memo.push(obj);
            }
            else if ('[object Array]' === ts.call(obj[i]) || '[object Object]' === ts.call(obj[i]))
            {
                this.findNested(obj[i], key, memo);
            }
        }
    }

    return memo;
};
*/
var Precalculated_Mixin = {

    methods:
    {
        "findNestedNode": function(obj, key, memo)
        {
            var i,
                proto = Object.prototype,
                ts = proto.toString,
                hasOwn = proto.hasOwnProperty.bind(obj);

            if ('[object Array]' !== ts.call(memo)) memo = [];

            for (i in obj)
            {
                if (hasOwn(i))
                {
                    if (i === key)
                    {
                        memo.push(obj);
                    }
                    else if ('[object Array]' === ts.call(obj[i]) || '[object Object]' === ts.call(obj[i]))
                    {
                        this.findNestedNode(obj[i], key, memo);
                    }
                }
            }

            return memo;
        },
        "Precalculated_A": function()
        {
            // var usersData = this.findNested(this.$root.formData, "users")[0].users;
            // var usersData = findNested(this.$root.formData, "users")[0].users;
            var usersData = this.findNestedNode(this.$root.formData, "users")[0].users;

            // var t = this.$root.formData.users.map(function(o)
            var t = usersData.map(function(o)
            {
                return Number(o["age"]);
            }).reduce(function(a, b)
            {
                return a + b;
            });

            return t;
        },

        "Precalculated_B": function()
        {
            // var rapportTab_Users_Data = findNested(findNested(this.$root.formData, "rapportTab")[0].rapportTab, "users")[0].users;
            var rapportTab_Users_Data = this.findNestedNode(this.findNestedNode(this.$root.formData, "rapportTab")[0].rapportTab, "users")[0].users;

            // var t = this.$root.formData["rapportTab"][2][0].users.map(function(o)
            var t = rapportTab_Users_Data.map(function(o)
            {
                return Number(o["age"]);
            }).reduce(function(a, b)
            {
                return a + b;
            });

            return t;
        },

        "Precalculated_C": function()
        {
            // var a11 = findNested((findNested(this.$root.formData, "AmountTable")[0].AmountTable), "a11")[0].a11;
            // var a21 = findNested((findNested(this.$root.formData, "AmountTable")[0].AmountTable), "a21")[0].a21;
            var a11 = this.findNestedNode((this.findNestedNode(this.$root.formData, "AmountTable")[0].AmountTable), "a11")[0].a11;
            var a21 = this.findNestedNode((this.findNestedNode(this.$root.formData, "AmountTable")[0].AmountTable), "a21")[0].a21;

            t = Number(a11) + Number(a21);
            // t = Number(this.$root.formData.AmountTable[0][0].a11) + Number(this.$root.formData.AmountTable[1][0].a21);
            return t;
        },

        "Precalculated_D": function()
        {
            // var a12 = findNested((findNested(this.$root.formData, "AmountTable")[0].AmountTable), "a12")[0].a12;
            // var a22 = findNested((findNested(this.$root.formData, "AmountTable")[0].AmountTable), "a22")[0].a22;
            var a12 = this.findNestedNode((this.findNestedNode(this.$root.formData, "AmountTable")[0].AmountTable), "a12")[0].a12;
            var a22 = this.findNestedNode((this.findNestedNode(this.$root.formData, "AmountTable")[0].AmountTable), "a22")[0].a22;

            t = Number(a12) + Number(a22);
            // t = Number(this.$root.formData.AmountTable[0][0].a12) + Number(this.$root.formData.AmountTable[1][0].a22);
            return t;
        }
    }
};