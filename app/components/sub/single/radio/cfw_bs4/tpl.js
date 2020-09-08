var Radio_template = function()
{
    /*
        <div class="form-group row form-group-radios" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'" class="text-left block-check-multi" :name="name+'_'+fieldUid">

                <template v-if="isNotDisplayMode()">

                    <template v-for="(o,i) in i_options">

                        <div class="form-check" :class="[ builded_config.display === 'vertical' ? 'form-check-not-inline' : 'form-check-inline' , 
                        ( 
                            ( requireClass() && i===i_options.length-1 && builded_config.display !== 'vertical' )
                            ||
                            ( requireClass() && builded_config.display === 'vertical' )
                        ) ? 'require' : '']">

                            <input 
                                :disabled="!status_ability"  
                                autocomplete="off" 
                                class="form-check-input" 
                                :class="[validation_error]" 
                                :id="fieldUid+'_'+i" 
                                type="radio" 
                                :name="name+'_'+fieldUid" 
                                :checked="isChecked(o.v)" 
                                :value="o.v" 
                                @click="updateElement($event,$event.target.value)" 
                                v-expression.validation="i_validations" 
                                v-expression.behaviour="i_behaviours">
                            <label class="form-check-label" :for="fieldUid+'_'+i">{{o.t}}</label>

                        </div>

                    </template>    

                </template>

                <template v-else>

                    <div class="card col-sm-12 display-mode-input">
                        
                        <div class="card-body pl-0 pr-0" v-if="value!==''">
                            <template v-for="(o,i) in i_options" v-if="isChecked(o.v)">
                            {{o.t}}
                            </template>
                        </div>

                        <div class="card-body pl-0 pr-0" v-if="value===''">
                            {{i_labels["LABEL_SD_EMPTY"]}}
                        </div>

                    </div> 

                </template>                  

            </div>
                    
            <template v-if="isNotDisplayMode()">
            
                <template v-if="isHelper()">
                    <Helper_extra :helper="i_labels['HELPER']" :hclass="fieldMode === 'full' ? ''+css_config.helper+'' : 'col-sm-12'"></Helper_extra>
                </template>

                <template v-if="isGuideLine()">
                    <Guideline_extra :guideline=" i_labels['GUIDELINE']" :reff="name+'_'+fieldUid"></Guideline_extra>
                </template>            
            
            </template>

        </div>
    */
}.toString();

// Radio_template = Radio_template.slice(13, -1).trim().slice(2, -2).trim();
Radio_template = Radio_template.prepareTemplate();