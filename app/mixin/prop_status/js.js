/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	MIXIN PROP STATUS
/*  
    Prop_Status_Mixin
    
    v-if="status_visibility"

    :disabled="!status_ability"    

    TABLE
    _Qs("#app").__vue__.$children[0].$children[15].status_ability

    NUMBER INSIDE TABLE
    _Qs("#app").__vue__.$children[0].$children[15].$children[14].$children[0].status_ability

    FIRST ELEMENT IN TABLE, ON INIT DISABLED
    _Qs("#app").__vue__.$children[0].$children[15].$children[12].$children[0].base_properties

*/
var Prop_Status_Mixin = {

    computed:
    {
        i_prop_status: function()
        {
            return (typeof this.propStatus !== "undefined") ? this.getPropStatus(this.$root, this.propStatus) : [];
        }
    },
    data: function()
    {
        return {
            "base_status": this.propStatus,
            "prop_name": "",
            "prop_value": "",
            "status_visibility": true,
            "status_ability": true,
            "status_display": false,
            "z_options": this.options,
            "base_properties":
            {}
        };
    },
    mounted: function()
    {
        this.status_visibility = this.i_prop_status.visibility;
        this.status_ability = this.i_prop_status.ability;
        this.status_display = this.$root.config.displayMode;

        //  BACKUP OF THE PROPERTIES, NEED IF PARENT ELEMENT LIKE REPEATER OR CONTAINER, CHANGE IT PROPERTIES
        //  SO THIS PROPERTY UPDATE ALSO THE SAME PROPERTY FOR ALL CHILDS.
        //
        //  BUT IF ONE CHILD IS BY DEFAULT DISABLED, WHEN PARENT IS SET TO ENABLE ALL CHILDS SHOULD BE ENABLE EXCEPT THE ONES DISABLED BY DEFAULT.

        //  IN CASE OF BASE STATUS DISABLED WE INIT BASE PROPERTY - STATUS ABILITY
        if (this.base_status === "DISABLED")
        {
            this.base_properties.status_ability = this.status_ability;
        }

        //  IN CASE OF BASE STATUS HIDDEN WE INIT BASE PROPERTY - STATUS VISIBILITY
        if (this.base_status === "HIDDEN")
        {
            this.base_properties.status_visibility = this.status_visibility;
        }

        // IF OTHERS TYPE ARE CREATED DON'T FORGET TO PUT IT HERE (app_behaviour.js)
    },
    methods:
    {
        /*
            GET PROP STATUS
        */
        getPropStatus: function(root, val)
        {
            return (typeof root.propStatus["" + val + ""] === "undefined") ? [] : root.propStatus["" + val + ""];
        }
    }
};