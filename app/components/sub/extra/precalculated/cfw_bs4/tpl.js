var PrecalculatedInput_template = function()
{
    /*
        <div class="form-group row form-group-input-precalculated" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <input type="text"
                    :disabled="!status_ability" 
                    autocomplete="off"
                    spellcheck="false" 
                    :name="name+'_'+fieldUid" 
                    :value="precalculated"
                    v-expression.validation="i_validations" 
                    v-expression.behaviour="i_behaviours" 
                    @input="updateElement($event,$event.target.value)"
                    @change="updateElement($event,$event.target.value)" 
                    mode="PRC"  
                    :placeholder="i_labels['PLACEHOLDER']" class="form-control form-control-sm d-none" :class="[validation_error , requireClass() ? 'require' : '']"/>  
                
                <div 
                    :name="name+'_'+fieldUid+'_container'"
                    spellcheck="false" 
                    class="form-control input-precalculated" :class="[builded_config.position==='left' ? 'float-left' : 'float-right' , isDisplayMode() ? 'display-mode-input' : '' , requireClass() ? 'require' : '']">{{precalculated}}</div>                    
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

// PrecalculatedInput_template = PrecalculatedInput_template.slice(13, -1).trim().slice(2, -2).trim();
PrecalculatedInput_template = PrecalculatedInput_template.prepareTemplate();