var Range_template = function()
{
    /*
        <div class="form-group row form-group-input-range" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-sm-2 col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div class="input-group" :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">

              <template v-if="isNotDisplayMode()">

                  <input type="range"
                        :disabled="!status_ability" 
                        autocomplete="off"
                        :name="name+'_'+fieldUid" 
                        :value="value"
                        @input="updateElement($event,$event.target.value)"
                        :min="builded_config.minValue" 
                        :max="builded_config.maxValue"
                        :step="builded_config.stepValue" 
                        v-expression.validation="i_validations" 
                        v-expression.behaviour="i_behaviours" 
                        class="form-control form-control-sm custom-range" :class="[validation_error , requireClass() ? 'require' : '']">

                  <div class="input-group-append">
                    <span class="input-group-text">{{value}}</span>
                  </div>

              </template>

              <template v-else>

                  <div class="card col-sm-12 display-mode-input">
                      <div class="card-body pl-0 pr-0 ">{{value}}</div>
                  </div> 

              </template>                   

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

// Range_template = Range_template.slice(13, -1).trim().slice(2, -2).trim();
Range_template = Range_template.prepareTemplate();