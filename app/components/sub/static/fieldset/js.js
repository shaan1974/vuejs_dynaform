//  FIELD SET
/*
    MODES : "FULL"-"BLOCK"

*/

Field_Set = Vue.component(
    'Field_Set',
    {
        template: Field_Set_template,
        props: ['labels', 'fieldsFormat', "name", "fieldMode", "values", "fieldType", "behaviours", "propStatus", "styles"],
        mixins: [Repeater_Mixin, Labels_Mixin, Validation_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, DynaForm_Mixin, Helper_Mixin]
    }
);