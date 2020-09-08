var FormGenerator_template = function()
{
    /*
        <div v-if="status" class="row">
            
            <ToolBar ref="TOOLBAR"></ToolBar>

            <transition name="fade">
                <div class="modal-backdrop xfade show" v-if="overlay"></div>
            </transition>
            
            <template v-for="(field, index) in schema">
                
                <component v-if="isInlist(field.fieldType, $root.config.group.single[0])"
                            :key="index"
                            :is="field.fieldType"
                            :value="formData[field.name]"
                            @input="updateForm(field.name, $event)"
                            @update_prop="updateProp($event)" 
                            v-bind="field">
                </component>

                <component v-else-if="isInlist(field.fieldType,$root.config.group.single[1])"
                            :key="index"
                            :is="field.fieldType"
                            :columns="field.columns"
                            :values="formData[field.name]"
                            @update_prop="updateProp($event)" 
                            v-bind="field">
                </component>
                
                <component v-else-if="isInlist(field.fieldType,$root.config.group.single[2])"
                            :key="index"
                            :is="field.fieldType"
                            :columns="field.columns" 
                            @update_prop="updateProp($event)" 
                            :values="formData[field.name]"
                            v-bind="field">
                </component>

                <component v-else-if="field.fieldType==$root.config.group.single[3][0]"
                            :key="index"
                            :is="field.fieldType"			               
                            :values="formData[field.name]" 
                            @update_prop="updateProp($event)" 
                            v-bind="field">
                </component>				    	    	    		    

                <component v-else-if="field.fieldType==$root.config.group.single[4][0]"
                            :key="index"
                            :is="field.fieldType"			  
                            @update_prop="updateProp($event)"              
                            v-bind="field">
                </component>			
                
            </template>

            <Modal_Validation_template_extra ref="MODAL-VALIDATION"></Modal_Validation_template_extra>

            <Modal_Load_template_extra ref="MODAL-LOAD"></Modal_Load_template_extra>

            <Btt_extra ref="BBT"></Btt_extra>

            <Footer ref="FOOTER"></Footer>

            <!--
            <Formeditor ref="FORMEDITOR" :ss="schema"></Formeditor>
            -->

        </div>    		
    */
}.toString();

FormGenerator_template = FormGenerator_template.prepareTemplate();