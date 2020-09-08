var TreeviewData_Template = function()
{
    /*     
        <li draggable="true" :data-level="level_ndx"             
            :data-name="model.name" 
            :data-position="position" 
            @dragstart.stop="dragStart(model, $event)" @dragover.prevent @dragenter.stop="dragEnter(model,$event)" @dragleave.stop="dragLeave" @dragend.stop="dragEnd" @drop.stop="dragFinish(model, $event)" 
            @contextmenu.stop.prevent="showContextMenu($event)">
            
            <div class="fe-contextmenu xd-none" v-if="contextMenu">
                <button class="btn btn-light btn-command edit" @click="treeviewEntry_edit(model,$event)"></button>
                <button class="btn btn-light btn-command duplicate"></button>
                <button class="btn btn-light btn-command remove" @click="treeviewEntry_remove(model,$event)"></button>
                <button class="btn btn-light cancel" @click="hideContextMenu($event)"></button>
            </div>

            <div class="tv_div" :class="(model.fieldType==='TabStatic' || model.fieldType==='Field_Set' || model.fieldType=='TableStatic' || model.fieldType==='TableRepeater' || model.fieldType==='TabRepeater' ) ? 'xnobgcolor' : 'celement' ">

                <template v-if="model.fieldType==='TabStatic' || model.fieldType==='Field_Set' || model.fieldType=='TableStatic'">

                    {{model.fieldType}} - ({{model.name}}) 

                    {{fill_switchStaticArray(model.fieldsFormat.length)}}

                    "{{switchStaticArray}}"

                    <div class="tve_static" :class=" switchStatic ? 'tve_static_off' : '' ">
                    <template v-for="(item2,index2) in model.fieldsFormat">                    

                        <template v-if="index2===0">
                        <div>
                            (STATIC)  
                            <div class="colapseContent" :class=" switchStatic ? 'colapseContentOn' : 'colapseContentOff' " @click="switchStatic=!switchStatic"></div>                                                        
                        </div>
                        </template>
                        
                        <ul class="ul_static" :class="switchStatic ? 'd-none' : '' ">                        
                            <template v-if="isConstructorArray(item2)===true">
                                <li :data-array="index2"
                                    draggable="true"
                                    :data-level="model.schemaUid+'_STATIC_ARRAY'"                            
                                    :data-position="index2" 
                                    @dragstart.stop="dragStart(model, $event)" @dragover.prevent 
                                    @dragenter.stop="dragEnter(model,$event)" @dragleave.stop="dragLeave" @dragend.stop="dragEnd" @drop.stop="dragFinish(model, $event)" 
                                    class="li_static">
                                    
                                    <div class="static_array">
                                        <div class="addElement" @click="treeviewEntry_add(model,$event,'ARRAY', index2)"></div>xxx-(REPEATER)  &#160;ARRAY #{{index2+1}} 

                                        <span @click="treeviewEntry_remove(model,$event)">(R)</span>
                                        <div class="colapseContent" 
                                        :class=" switchStaticArray[index2]  ? 'colapseContentOff' : 'colapseContentOn' " @click="swicth_current_switchStaticArray(index2)"></div>
                                    </div>
                                    <ul v-if="switchStaticArray[index2]">
                                        <TreeviewData 
                                            class="item" v-for="(item3,index3) in item2" :model="item3" :key="item3.schemaUid" :level_ndx="model.schemaUid+'_'+index2+'_STATIC'" :position="index3" 
                                            @callFromChildToParent="formEditor.childrenCall()"></TreeviewData>
                                    </ul>
                                </li>
                            </template>

                            <template v-else>
                                <li>NOT ARRAY - {{item2.fieldType}}</li>
                            </template>

                        </ul>

                    </template>
                    </div>

                </template>

                <template v-else-if="model.fieldType==='TableRepeater' || model.fieldType==='TabRepeater'">
                        
                    {{model.fieldType}} - ({{model.name}})

                    <div class="tve_repeater">                        
                        
                        <div>
                            <div class="addElement" @click="treeviewEntry_add(model,$event,'REPEATER')"></div>xxx-(REPEATER) 
                            <div class="colapseContent" :class=" switchArray ? 'colapseContentOn' : 'colapseContentOff' " @click="switchArray=!switchArray"></div>
                        </div>

                        <ul style="border:1px dotted yellow" :class="switchArray ? 'd-none' : '' ">
                            <TreeviewData 
                                class="item" v-for="(item4,index4) in model.fieldsFormat" :model="item4" :key="item4.schemaUid" :level_ndx="model.schemaUid+'_REPEATER'" :position="index4" 
                                @callFromChildToParent="formEditor.childrenCall()"></TreeviewData>
                        </ul>
                    </div>

                </template>
                
                <template v-else>
                    <div v-if="position===0 && level_ndx==='ROOT'" class="addElement addElementRoot" @click="treeviewEntry_add(model,$event,'ROOT')"></div>
                    {{model.fieldType}} - ({{model.name}}) (CLASSIC)
                </template>                

            </div>
        </li> 
  
  	*/
}.toString();

TreeviewData_Template = TreeviewData_Template.prepareTemplate();