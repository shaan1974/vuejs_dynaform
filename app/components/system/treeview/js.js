/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
//	TREEVIEW
/*
    temp1.$parent.$parent.$children.find( function(o) { return o.name==="students"; } ).set_prop("HIDE")
    temp1.$parent.$parent.$children.find( function(o) { return o.name==="students"; } ).set_prop("SHOW")
*/
Treeview = Vue.component(
    'Treeview',
    {
        template: Treeview_Template,
        props: ['model', 'isChild'],
        mixins: [Labels_Mixin],
        data: function()
        {
            return {
                open: true
            };
        },
        computed:
        {
            isFolder: function()
            {
                return this.model.children && this.model.children.length;
            }
        },
        methods:
        {
            getTreeviewElements: function(c, o)
            {
                return o.name === "" + c + "";
            },
            /*
                WHEN CLICK ON MENU ELEMENTS
            */
            selectMenu: function(e, c_item)
            {
                //  VARIABLES
                //
                var b = this.$parent;

                //  GET REAL OBJECT REFERENCE THAT HAVE METHOD VALUE
                //
                while (b.value === undefined)
                {
                    b = b.$parent;
                }

                var e_children = b.$parent.$children;

                //  INTERNAL FUNCTION TO BE ABLE TO FIND ALL UID KEY VALUE
                //
                function df(o)
                {
                    var r = [];
                    Object.entries(o).forEach(function(z)
                    {
                        if (z[1].UID !== undefined)
                        {
                            r.push(z[1].UID);
                            z[1].active = false;

                            if (z[1].children !== undefined)
                            {
                                q = df(z[1].children);
                                r = r.concat(q);
                            }
                        }
                    });

                    return r;
                }

                //  REMOVE THE ONE OF CLICK ACTION FROM BUILDED LIST
                //
                var completeListToHide = df(b.value)._remove(e);

                //  LOOP TO HIDE
                //                
                for (var cnt = 0, len = completeListToHide.length; cnt < len; cnt++)
                {
                    e_children.find(this.getTreeviewElements.bind(null, completeListToHide[cnt])).set_prop('HIDE');
                }

                //  DISPLAY THE ONE CLICK
                //
                e_children.find(this.getTreeviewElements.bind(null, e)).set_prop('SHOW');
                c_item.active = true;
            },
            toggle: function()
            {
                /*if (this.isFolder)
                {
                    this.open = !this.open;
                }*/
            },
            changeType: function()
            {
                /*if (!this.isFolder)
                {
                    Vue.set(this.model, 'children', []);
                    this.addChild();
                    this.open = true;
                }*/
            },
            addChild: function()
            {
                /*this.model.children.push(
                {
                    name: 'new stuff'
                });*/
            }
        }
    }
);