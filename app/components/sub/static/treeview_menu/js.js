//  TREEVIEW MENU
//
TreeviewMenu = Vue.component(
    'TreeviewMenu',
    {
        template: TreeviewMenu_template,
        props: ["name", "fieldMode", "value", "fieldType", "propStatus", "styles"],
        mixins: [Labels_Mixin, Prop_Status_Mixin, Event_Mixin]
    }
);