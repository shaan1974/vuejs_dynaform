/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN - TREEVIEW DATA - STATIC ARRAY
// 

var TreeviewData_Static_Array_Mixin = {

    methods:
    {
        "fill_switchStaticArray": function(t)
        {
            if (this.switchStaticArrayInit === false)
            {
                for (var cnt7 = 0; cnt7 < t; cnt7++)
                {
                    this.switchStaticArray.push(true);
                }
            }
            this.switchStaticArrayInit = true;
        },
        "swicth_current_switchStaticArray": function(ndx)
        {
            var tmp = [].concat(this.switchStaticArray);
            tmp[ndx] = !tmp[ndx];

            //  EMPTY ARRAY WITH SPLICE
            //
            this.switchStaticArray.splice(0, this.switchStaticArray.length);

            //  SET ARRAY WITH NNJ
            for (var cnt7 = 0; cnt7 < tmp.length; cnt7++)
            {
                this.switchStaticArray.push(tmp[cnt7]);
            }
        }
    }
};