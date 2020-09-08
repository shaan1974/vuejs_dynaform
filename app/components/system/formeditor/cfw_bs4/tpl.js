var Formeditor_Template = function()
{
    /*
        <div style="background-color: red;z-index: 99999;position: fixed;top: 0px;left: 0px;">
            
            <button @click="wazaTest()">xxx-wazaTest</button><br/>
            <button @click="wazaUpdate()">zzz-wazzUpdate</button><br/>
            <button @click="wazaSwap()" id="swap">zzz-wazzSwap</button><br/>

            <br/>

            <div class="tve_root">

                <ul id="ex1" class="treeview_data_main_root">
                    <TreeviewData class="item" v-for="(item,index) in ss" :model="item" :key="item.schemaUid" level_ndx="ROOT" :position="index" @callFromChildToParent="childrenCall()"></TreeviewData>
                </ul>
            </div>

        </div>
  	*/
}.toString();

Formeditor_Template = Formeditor_Template.prepareTemplate();