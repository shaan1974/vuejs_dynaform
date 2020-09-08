var TextInput_template = function()
{
    /*
        <div class="form-group row form-group-input-text" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <template v-if="isNotDisplayMode()">

                    <template v-if="builded_config.prependIcon===''">

                        <input type="text"
                            :disabled="!status_ability" 
                            autocomplete="off"
                            spellcheck="false" 
                            :name="name+'_'+fieldUid" 
                            :value="value"
                            v-expression.validation="i_validations" 
                            v-expression.behaviour="i_behaviours" 
                            @input="updateElement($event,$event.target.value)"
                            @change="updateElement($event,$event.target.value)"
                            :placeholder="i_labels['PLACEHOLDER']" 
                            class="form-control form-control-sm" 
                            :class="[validation_error , requireClass() ? 'require' : '' , value === '' ? 'empty' : 'not-empty']">  

                        <div v-if="status_ability" class="clear" @click="clearContent()" :class="[fadeIn, fadeOut]"></div>                    

                    </template>

                    <template v-else>

                         <div class="input-group input-group-sm">

                            <div class="input-group-prepend" >
                                <span class="input-group-text" :class="builded_config.prependIcon"></span>
                            </div>

                            <input type="text"
                            :disabled="!status_ability" 
                            autocomplete="off"
                            spellcheck="false" 
                            :name="name+'_'+fieldUid" 
                            :value="value"
                            v-expression.validation="i_validations" 
                            v-expression.behaviour="i_behaviours" 
                            @input="updateElement($event,$event.target.value)"
                            @change="updateElement($event,$event.target.value)"
                            :placeholder="i_labels['PLACEHOLDER']" 
                            class="form-control form-control-sm" 
                            :class="[validation_error , requireClass() ? 'require' : '' , value === '' ? 'empty' : 'not-empty']">  

                            <div class="clear" @click="clearContent()" :class="[fadeIn, fadeOut]"></div>                    

                         </div>

                    </template>
                    
                    <template v-if="builded_config.floatingLabel">
                        <div v-if="fieldMode !== 'full'" class="floating-label">{{i_labels["LABEL"]}}</div>
                    </template>

                    

                </template>

                <template v-else>

                    <div class="card col-sm-12 display-mode-input">
                        <div class="card-body pl-0 pr-0" v-if="value!==''">{{value}}</div>
                        <div class="card-body pl-0 pr-0" v-else>{{i_labels["LABEL_SD_EMPTY"]}}</div>                        
                    </div> 

                </template>            
                
                <!-- status_ability : {{status_ability}} base_status : {{base_status}} --->
                
            </div>
            
            <template v-if="isNotDisplayMode()">

                <template v-if="isHelper()">
                    <Helper_extra :helper="i_labels['HELPER']" :hclass="fieldMode === 'full' ? ''+css_config.helper+'' : 'col-sm-12'"></Helper_extra>
                </template>

                <template v-if="isGuideLine()">
                    <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid"></Guideline_extra>
                </template>

            </template>

        </div>
  	*/
}.toString();

// TextInput_template = TextInput_template.slice(13, -1).trim().slice(2, -2).trim();
TextInput_template = TextInput_template.prepareTemplate();