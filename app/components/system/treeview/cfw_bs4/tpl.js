var Treeview_Template = function()
{
    /*        
        <ul :class="isChild === 0 ? 'tree' : ''">
            <li v-for="item in model">
                <span @click="selectMenu(item.UID,item)" :class="item.active ? 'active' : ''">{{item.name}}</span>
                <Treeview class="item" :model="item.children" v-if="item.children" :isChild="1"></Treeview>
            </li>
        </ul>
  	*/
}.toString();

Treeview_Template = Treeview_Template.prepareTemplate();