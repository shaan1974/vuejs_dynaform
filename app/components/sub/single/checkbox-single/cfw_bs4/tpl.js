var CheckboxSingle_template = function()
{
    /*
            <div class="form-group row form-group-single-checkbox" v-if="status_visibility" :class="styles.formGroup">

                <label v-if="fieldMode === 'full'" class="col-sm-2 col-form-label" :class="styles.label">{{i_labels["LABEL"]}}</label>

                <div :class="fieldMode === 'full' ? 'col-sm-8' : 'col-sm-12'" class="text-left">

                    <template v-if="isNotDisplayMode()">

                        <input     
                            :disabled="!status_ability"                     
                            autocomplete="off" 
                            type="checkbox" 
                            :id="fieldUid" 
                            class="form-check-input" 
                            :class="[validation_error , requireClass() ? 'require' : '']" 
                            :checked="Ichecked" 
                            :name="name" 
                            :value="value" 
                            v-expression.validation="i_validations" 
                            v-expression.behaviour="i_behaviours" 
                            mode="SINGLE" 
                            :truevalue="builded_config.trueValue" 
                            :falsevalue="builded_config.falseValue"  
                            @click="updateCheckboxValue($event,$event.target.value)">
                        
                        <label class="form-check-label" :for="fieldUid" :name="name+'_'+fieldUid">{{i_labels["LABEL_INSIDE"]}}</label>

                    </template>

                    <template v-else>

                        <div class="card col-sm-12 display-mode-input">
                            <div class="card-body pl-0 pr-0 " v-if="value===builded_config.trueValue">{{i_labels["LABEL_TRUE"]}}</div>
                            <div class="card-body pl-0 pr-0 " v-if="value===builded_config.falseValue">{{i_labels["LABEL_FALSE"]}}</div>
                        </div> 

                    </template>                       

                </div>

                <template v-if="isNotDisplayMode()">

                    <template v-if="isHelper()">
                        <Helper_extra :helper="i_labels['HELPER']" :hclass="fieldMode === 'full' ? 'col-sm-8 offset-sm-2' : 'col-sm-12'"></Helper_extra>
                    </template>

                    <template v-if="isGuideLine()">
                        <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid"></Guideline_extra>
                    </template>                
                
                </template>

            </div>
  	*/
}.toString();

// CheckboxSingle_template = CheckboxSingle_template.slice(13, -1).trim().slice(2, -2).trim();
CheckboxSingle_template = CheckboxSingle_template.prepareTemplate();