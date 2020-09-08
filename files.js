var base_cfw = "bs4";

var files = [

    /*  ALIAS */
    "app/extra/alias.js",

    /*  EXTRA  */
    "app/extra/caret.js",

    /*  POLYFILL  */
    "app/prototypes/_is.js",
    "app/prototypes/array.js",
    "app/prototypes/string.js",
    "app/prototypes/event.js",
    "app/prototypes/number.js",
    "app/prototypes/object.js",

    /*  RHEA */
    "app/prototypes/rhea/array.js",
    "app/prototypes/rhea/element.js",
    "app/prototypes/rhea/nodelist.js",
    "app/prototypes/rhea/object.js",

    /*  VUE - FILTERS  */
    "app/filters/increment.js",
    "app/filters/format.js",
    "app/filters/split.js",

    /*  VUE - DIRECTIVES  */
    "app/directives/autogrow/js.js",

    "app/directives/expression/js_expression_rule_replacements_fct.js",
    "app/directives/expression/js_expression_step_1_rule_state_replacements.js",
    "app/directives/expression/js_expression_step_2_rule_replacements.js",
    "app/directives/expression/js_expression_step_3_extra_rule_replacements.js",
    "app/directives/expression/js.js",
    "app/directives/expression/cfw_bs4/css.css",

    "app/directives/maxlength/js.js",
    "app/directives/maxlength/cfw_bs4/css.css",

    "app/directives/tooltip/js.js",
    "app/directives/tooltip/cfw_bs4/css.css",

    /*  VUE - MIXINS */
    "app/mixin/labels/js.js",

    "app/mixin/dyna_form/js.js",
    "app/mixin/dyna_form/js_uuid.js",
    "app/mixin/dyna_form/js_value.js",
    "app/mixin/dyna_form/js_path.js",

    "app/mixin/repeaters/js.js",
    "app/mixin/repeaters/js_actions.js",
    "app/mixin/repeaters/js_extra.js",

    "app/mixin/dico/js.js",

    "app/mixin/event/js.js",

    "app/mixin/validation/js.js",
    "app/mixin/validation/js_error.js",

    "app/mixin/require/js.js",

    "app/mixin/behaviour/js.js",
    "app/mixin/behaviour/js_repeater.js",
    "app/mixin/behaviour/js_value.js",
    "app/mixin/behaviour/js_prop.js",

    "app/mixin/prop_status/js.js",
    "app/mixin/prop_status/js_display.js",
    "app/mixin/prop_status/css.css",

    "app/mixin/guideline/js.js",
    "app/mixin/guideline/js_extra.js",

    "app/mixin/value/js.js",

    "app/mixin/helper/js.js",

    "app/mixin/clear/js.js",
    "app/mixin/clear/js_get.js",
    "app/mixin/clear/js_set.js",
    "app/mixin/clear/js_patch.js",
    "app/mixin/clear/js_cc.js",
    "app/mixin/clear/css.css",

    "app/mixin/config/js.js",

    "app/mixin/dynamic_table/js.js",
    "app/mixin/dynamic_table/js_paginate.js",
    "app/mixin/dynamic_table/js_order.js",
    "app/mixin/dynamic_table/js_filter.js",
    "app/mixin/dynamic_table/css.css",

    /*  VUE - DYNA - MIXINS */
    "app/mixin_dynamic/buttons/js.js",

    "app/mixin_dynamic/watchers/js.js",

    "app/mixin_dynamic/dic/js.js",

    "app/mixin_dynamic/precalculated/js.js",

    /*  SYSTEM */

    /*      HELPER */
    "app/components/system/helper/cfw_bs4/tpl.js",
    "app/components/system/helper/js.js",

    /*      MODAL - VALIDATION */
    "app/components/system/modal_validation/cfw_bs4/tpl.js",
    "app/components/system/modal_validation/cfw_bs4/css.css",
    "app/components/system/modal_validation/js.js",

    /*      MODAL - LOAD */
    "app/components/system/modal_load/cfw_bs4/tpl.js",
    "app/components/system/modal_load/cfw_bs4/css.css",
    "app/components/system/modal_load/cfw_bs4/css_animations/ripple.css",
    "app/components/system/modal_load/cfw_bs4/css_animations/fb.css",
    "app/components/system/modal_load/cfw_bs4/css_animations/fountain.css",
    "app/components/system/modal_load/cfw_bs4/css_animations/cube.css",
    "app/components/system/modal_load/cfw_bs4/css_animations/atom.css",
    "app/components/system/modal_load/cfw_bs4/css_animations/spinbox.css",
    "app/components/system/modal_load/cfw_bs4/css_animations/catching_up.css",
    "app/components/system/modal_load/js.js",

    /*      TOOLBAR */
    "app/components/system/toolbar/cfw_bs4/tpl.js",
    "app/components/system/toolbar/cfw_bs4/css.css",
    "app/components/system/toolbar/cfw_bs4/debug.css",
    "app/components/system/toolbar/js.js",

    /*      GUIDELINE */
    "app/components/system/guideline/cfw_bs4/tpl.js",
    "app/components/system/guideline/cfw_bs4/css.css",
    "app/components/system/guideline/js.js",

    /*      BTT */
    "app/components/system/btt/cfw_bs4/tpl.js",
    "app/components/system/btt/cfw_bs4/css.css",
    "app/components/system/btt/js.js",

    /*      FOOTER */
    "app/components/system/footer/cfw_bs4/tpl.js",
    "app/components/system/footer/cfw_bs4/css.css",
    "app/components/system/footer/js.js",

    /*      DEBUG */
    "app/components/system/debug/cfw_bs4/tpl.js",
    "app/components/system/debug/cfw_bs4/css.css",
    "app/components/system/debug/js.js",

    /*      TREEVIEW */
    "app/components/system/treeview/cfw_bs4/tpl.js",
    "app/components/system/treeview/cfw_bs4/css.css",
    "app/components/system/treeview/js.js",

    /*      FORM EDITOR */
    "app/components/system/formeditor/cfw_bs4/tpl.js",
    "app/components/system/formeditor/cfw_bs4/tpl_tv2.js",
    "app/components/system/formeditor/cfw_bs4/css.css",

    "app/components/system/formeditor/mixins/drag.js",
    "app/components/system/formeditor/mixins/context.js",
    "app/components/system/formeditor/mixins/static_array.js",
    "app/components/system/formeditor/mixins/action_remove.js",
    "app/components/system/formeditor/mixins/action_add.js",
    "app/components/system/formeditor/mixins/action_edit.js",
    "app/components/system/formeditor/js_tv2.js",
    "app/components/system/formeditor/js.js",

    /*  TEMPLATES */

    /*      SINGLES */

    /*          INPUT NUMBER */
    "app/components/sub/single/number/cfw_bs4/tpl.js",
    "app/components/sub/single/number/cfw_bs4/css.css",
    "app/components/sub/single/number/cfw_bs4/icon_reset.css",
    "app/components/sub/single/number/js.js",

    /*          SELECT */
    "app/components/sub/single/select/cfw_bs4/tpl.js",
    "app/components/sub/single/select/cfw_bs4/css.css",
    "app/components/sub/single/select/cfw_bs4/require.css",
    "app/components/sub/single/select/js.js",

    /*          INPUT TEXT */
    "app/components/sub/single/input/cfw_bs4/tpl.js",
    "app/components/sub/single/input/cfw_bs4/css.css",
    "app/components/sub/single/input/cfw_bs4/fl.css",
    "app/components/sub/single/input/js.js",

    /*          TEXTAREA */
    "app/components/sub/single/textarea/cfw_bs4/tpl.js",
    "app/components/sub/single/textarea/cfw_bs4/css.css",
    "app/components/sub/single/textarea/cfw_bs4/disable.css",
    "app/components/sub/single/textarea/cfw_bs4/require.css",
    "app/components/sub/single/textarea/js.js",

    /*          CHECKBOX SINGLE */
    "app/components/sub/single/checkbox-single/cfw_bs4/tpl.js",
    "app/components/sub/single/checkbox-single/cfw_bs4/disable.css",
    "app/components/sub/single/checkbox-single/cfw_bs4/css.css",
    "app/components/sub/single/checkbox-single/cfw_bs4/require.css",
    "app/components/sub/single/checkbox-single/cfw_bs4/error.css",
    "app/components/sub/single/checkbox-single/js.js",

    /*          CHECKBOX MULTI */
    "app/components/sub/single/checkbox-multi/cfw_bs4/tpl.js",
    "app/components/sub/single/checkbox-multi/cfw_bs4/disable.css",
    "app/components/sub/single/checkbox-multi/cfw_bs4/css.css",
    "app/components/sub/single/checkbox-multi/js.js",

    /*          RADIO */
    "app/components/sub/single/radio/cfw_bs4/tpl.js",
    "app/components/sub/single/radio/cfw_bs4/css.css",
    "app/components/sub/single/radio/cfw_bs4/disable.css",
    "app/components/sub/single/radio/js.js",

    /*          INPUT FILE */
    "app/components/sub/single/file/cfw_bs4/tpl.js",
    "app/components/sub/single/file/cfw_bs4/css.css",
    "app/components/sub/single/file/cfw_bs4/require.css",
    "app/components/sub/single/file/cfw_bs4/error.css",
    "app/components/sub/single/file/js.js",

    /*          RANGE */
    "app/components/sub/single/range/cfw_bs4/tpl.js",
    "app/components/sub/single/range/cfw_bs4/css.css ",
    "app/components/sub/single/range/cfw_bs4/error.css ",
    "app/components/sub/single/range/js.js",

    /*          PASSWORD */
    "app/components/sub/single/password/cfw_bs4/tpl.js",
    "app/components/sub/single/password/cfw_bs4/css.css",
    "app/components/sub/single/password/cfw_bs4/disable.css",
    "app/components/sub/single/password/cfw_bs4/icon_reset.css",
    "app/components/sub/single/password/js.js",

    /*          HIDDEN */
    "app/components/sub/single/hidden/cfw_bs4/tpl.js",
    "app/components/sub/single/hidden/js.js",

    /*      REPEATER */

    /*          COMMON */
    "app/components/sub/repeater/js.js",

    /*          TABLE */
    "app/components/sub/repeater/table/cfw_bs4/tpl.js",
    "app/components/sub/repeater/table/cfw_bs4/css.css",
    "app/components/sub/repeater/table/cfw_bs4/error.css",
    "app/components/sub/repeater/table/js.js",

    /*          TAB */
    "app/components/sub/repeater/tab/cfw_bs4/tpl.js",
    "app/components/sub/repeater/tab/cfw_bs4/css.css",
    "app/components/sub/repeater/tab/cfw_bs4/error.css",
    "app/components/sub/repeater/tab/js.js",

    /*      STATIC CONTAINER */

    /*          TAB */
    "app/components/sub/static/tab/cfw_bs4/tpl.js",
    "app/components/sub/static/tab/cfw_bs4/css.css",
    "app/components/sub/static/tab/js.js",

    /*          FIELDSET */
    "app/components/sub/static/fieldset/cfw_bs4/tpl.js",
    "app/components/sub/static/fieldset/cfw_bs4/css.css",
    "app/components/sub/static/fieldset/cfw_bs4/dedicate.css",
    "app/components/sub/static/fieldset/js.js",

    /*          TABLE */
    "app/components/sub/static/table/cfw_bs4/tpl.js",
    "app/components/sub/static/table/cfw_bs4/css.css",
    "app/components/sub/static/table/js.js",

    /*          TREEVIEW MENU */
    "app/components/sub/static/treeview_menu/cfw_bs4/tpl.js",
    "app/components/sub/static/treeview_menu/cfw_bs4/css.css",
    "app/components/sub/static/treeview_menu/js.js",

    /*      HELPER */

    /*          LABEL */
    "app/components/sub/helper/label/cfw_bs4/tpl.js",
    "app/components/sub/helper/label/cfw_bs4/disable.css",
    "app/components/sub/helper/label/js.js",

    /*          CONTAINER */
    "app/components/sub/helper/container/cfw_bs4/tpl.js",
    "app/components/sub/helper/container/cfw_bs4/css.css",
    "app/components/sub/helper/container/cfw_bs4/disable.css",
    "app/components/sub/helper/container/js.js",

    /*      EXTRA */

    /*          COF */
    "app/components/sub/extra/cof/cfw_bs4/tpl.js",
    "app/components/sub/extra/cof/cfw_bs4/css.css ",
    "app/components/sub/extra/cof/cfw_bs4/disable.css",
    "app/components/sub/extra/cof/cfw_bs4/require.css",
    "app/components/sub/extra/cof/cfw_bs4/error.css",
    "app/components/sub/extra/cof/cfw_bs4/icon_reset.css",
    "app/components/sub/extra/cof/js.js",

    /*          FORMAT */
    "app/components/sub/extra/format/cfw_bs4/tpl.js",
    "app/components/sub/extra/format/cfw_bs4/css.css",
    "app/components/sub/extra/format/cfw_bs4/disable.css",
    "app/components/sub/extra/format/js.js",

    /*          AUTOCOMPLETE */
    "app/components/sub/extra/separator/cfw_bs4/tpl.js",
    "app/components/sub/extra/separator/cfw_bs4/css.css",
    "app/components/sub/extra/separator/cfw_bs4/disable.css",
    "app/components/sub/extra/separator/js.js",

    /*          DROPDOWN */
    "app/components/sub/extra/dropdown/cfw_bs4/tpl.js",
    "app/components/sub/extra/dropdown/cfw_bs4/css.css",
    "app/components/sub/extra/dropdown/cfw_bs4/error.css",
    "app/components/sub/extra/dropdown/cfw_bs4/disable.css",
    "app/components/sub/extra/dropdown/js.js",

    /*          AUTOCOMPLETE */
    "app/components/sub/extra/autocomplete/cfw_bs4/tpl.js",
    "app/components/sub/extra/autocomplete/cfw_bs4/css.css",
    "app/components/sub/extra/autocomplete/cfw_bs4/disable.css",
    "app/components/sub/extra/autocomplete/js.js",

    /*          CURRENCY */
    "app/components/sub/extra/currency/cfw_bs4/tpl.js",
    "app/components/sub/extra/currency/js.js",

    /*          MAP */
    "app/components/sub/extra/map/cfw_bs4/tpl.js",
    "app/components/sub/extra/map/cfw_bs4/css.css",
    "app/components/sub/extra/map/cfw_bs4/icons.css",
    "app/components/sub/extra/map/cfw_bs4/disable.css",
    "app/components/sub/extra/map/cfw_bs4/popup.css",
    "app/components/sub/extra/map/mixin/bb_codes.js",
    "app/components/sub/extra/map/mixin/utils.js",
    "app/components/sub/extra/map/mixin/fullscreen.js",
    "app/components/sub/extra/map/mixin/onscroll.js",
    "app/components/sub/extra/map/mixin/multi_maps.js",
    "app/components/sub/extra/map/mixin/geoman.js",
    "app/components/sub/extra/map/mixin/geoman_events.js",
    "app/components/sub/extra/map/mixin/geoman_events_markers.js",
    "app/components/sub/extra/map/mixin/geoman_events_polygons.js",
    "app/components/sub/extra/map/mixin/geoman_events_lines.js",
    "app/components/sub/extra/map/mixin/geoman_events_circles.js",
    "app/components/sub/extra/map/mixin/buttons.js",
    "app/components/sub/extra/map/mixin/popup.js",
    "app/components/sub/extra/map/mixin/set.js",
    "app/components/sub/extra/map/mixin/gestures.js",
    "app/components/sub/extra/map/js.js",

    /*          DATEPICKER */
    "app/components/sub/extra/datepicker/cfw_bs4/tpl.js",
    "app/components/sub/extra/datepicker/cfw_bs4/css.css",
    "app/components/sub/extra/datepicker/cfw_bs4/disable.css",
    "app/components/sub/extra/datepicker/cfw_bs4/icon_reset.css",
    "app/components/sub/extra/datepicker/js.js",

    /*          RTE */
    "app/components/sub/extra/rte/cfw_bs4/tpl.js",
    "app/components/sub/extra/rte/cfw_bs4/css.css",
    "app/components/sub/extra/rte/cfw_bs4/disable.css",
    "app/components/sub/extra/rte/cfw_bs4/error.css",
    "app/components/sub/extra/rte/cfw_bs4/require.css",
    "app/components/sub/extra/rte/js.js",

    /*          DOUBLE RANGE */
    "app/components/sub/extra/double_range/cfw_bs4/tpl.js",
    "app/components/sub/extra/double_range/cfw_bs4/css.css",
    "app/components/sub/extra/double_range/cfw_bs4/disable.css",
    "app/components/sub/extra/double_range/cfw_bs4/error.css",
    "app/components/sub/extra/double_range/cfw_bs4/require.css",
    "app/components/sub/extra/double_range/js.js",

    /*          COLOR PICKER */
    "app/components/sub/extra/color/cfw_bs4/tpl.js",
    "app/components/sub/extra/color/cfw_bs4/css.css",
    "app/components/sub/extra/color/cfw_bs4/disable.css",
    "app/components/sub/extra/color/cfw_bs4/error.css",
    "app/components/sub/extra/color/cfw_bs4/require.css",
    "app/components/sub/extra/color/cfw_bs4/icon_reset.css",
    "app/components/sub/extra/color/js.js",

    /*          AUTONUMERIC */
    "app/components/sub/extra/autonumeric/cfw_bs4/tpl.js",
    "app/components/sub/extra/autonumeric/cfw_bs4/css.css",
    "app/components/sub/extra/autonumeric/cfw_bs4/disable.css",
    "app/components/sub/extra/autonumeric/js.js",

    /*          DROP UPLOAD */
    "app/components/sub/extra/drop_upload/cfw_bs4/tpl.js",
    "app/components/sub/extra/drop_upload/cfw_bs4/css.css",
    "app/components/sub/extra/drop_upload/cfw_bs4/disable.css",
    "app/components/sub/extra/drop_upload/js.js",

    /*          PRECALCULATED */
    "app/components/sub/extra/precalculated/cfw_bs4/tpl.js",
    "app/components/sub/extra/precalculated/cfw_bs4/css.css",
    "app/components/sub/extra/precalculated/cfw_bs4/error.css",
    "app/components/sub/extra/precalculated/cfw_bs4/disable.css",
    "app/components/sub/extra/precalculated/js.js",

    /*          SIMPLE RANGE */
    "app/components/sub/extra/simple_range/cfw_bs4/tpl.js",
    "app/components/sub/extra/simple_range/cfw_bs4/css.css",
    "app/components/sub/extra/simple_range/cfw_bs4/disable.css",
    "app/components/sub/extra/simple_range/cfw_bs4/require.css",
    "app/components/sub/extra/simple_range/cfw_bs4/error.css",
    "app/components/sub/extra/simple_range/js.js",

    /*          IMAGE_CR */
    "app/components/sub/extra/image_cr/cfw_bs4/tpl.js",
    "app/components/sub/extra/image_cr/cfw_bs4/css.css",
    "app/components/sub/extra/image_cr/cfw_bs4/error.css",
    "app/components/sub/extra/image_cr/js.js",

    /*          CATPCHA */
    "app/components/sub/extra/captcha/cfw_bs4/tpl.js",
    "app/components/sub/extra/captcha/cfw_bs4/css.css",
    "app/components/sub/extra/captcha/js.js",

    /*          STAR RATING */
    "app/components/sub/extra/stars_rating/cfw_bs4/tpl.js",
    "app/components/sub/extra/stars_rating/cfw_bs4/css.css",
    "app/components/sub/extra/stars_rating/cfw_bs4/error.css",
    "app/components/sub/extra/stars_rating/cfw_bs4/require.css",
    "app/components/sub/extra/stars_rating/js.js",

    /*          DROPDOWN CHECKBOX LIST */
    "app/components/sub/extra/dropdown_checboxes_list/cfw_bs4/tpl.js",
    "app/components/sub/extra/dropdown_checboxes_list/cfw_bs4/css.css",
    "app/components/sub/extra/dropdown_checboxes_list/cfw_bs4/error.css",
    "app/components/sub/extra/dropdown_checboxes_list/js.js",

    /*          TIMEPICKER */
    "app/components/sub/extra/timepicker/cfw_bs4/tpl.js",
    "app/components/sub/extra/timepicker/cfw_bs4/css.css",
    "app/components/sub/extra/timepicker/cfw_bs4/icon_reset.css",
    "app/components/sub/extra/timepicker/js.js",

    /*          MULTI-COMPLTE */
    "app/components/sub/extra/multi_complete/cfw_bs4/tpl.js",
    "app/components/sub/extra/multi_complete/cfw_bs4/css.css",
    "app/components/sub/extra/multi_complete/js.js",

    /*          CUSTOM BTN */
    "app/components/sub/extra/custom_btn/cfw_bs4/tpl.js",
    "app/components/sub/extra/custom_btn/cfw_bs4/css.css",
    "app/components/sub/extra/custom_btn/cfw_bs4/disable.css",
    "app/components/sub/extra/custom_btn/js.js",

    /*          CUSTOM BTN GROUP */
    "app/components/sub/extra/custom_btn_group/cfw_bs4/tpl.js",
    "app/components/sub/extra/custom_btn_group/cfw_bs4/css.css",
    "app/components/sub/extra/custom_btn_group/cfw_bs4/disable.css",
    "app/components/sub/extra/custom_btn_group/js.js",

    /*          CHARTSJS */
    "app/components/sub/extra/charts/cfw_bs4/tpl.js",
    "app/components/sub/extra/charts/cfw_bs4/css.css",
    "app/components/sub/extra/charts/js.js",

    /*  MAIN */
    "app/components/main/cfw_bs4/tpl.js",
    "app/components/main/cfw_bs4/css.css",
    "app/components/main/cfw_bs4/debug.css",
    "app/components/main/js.js",

    /*      APP DATA */
    /*
    "app/app_config.js",
    "app/app_data.js",
    "app/app_schema.js",
    "app/app_labels.js",
    "app/app_dictionnaries.js",
    "app/app_validation.js",
    */

    /*      APP */
    "app/index.js"
];