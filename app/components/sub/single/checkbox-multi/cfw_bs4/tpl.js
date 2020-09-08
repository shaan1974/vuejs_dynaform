var CheckboxMulti_template = function()
{
    /*
            <div class="form-group row form-group-multi-checkbox" v-if="status_visibility" :class="styles.formGroup">

                <label v-if="fieldMode === 'full'" class="col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

                <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'" class="text-left block-check-multi" :name="name+'_'+fieldUid">
                    
                    <template v-if="isNotDisplayMode()">
                        
                        <template v-if="builded_config.selectUnselectAll">

                            <div class="form-check all-notall" :class="[ builded_config.display === 'vertical' ? 'form-check-not-inline' : 'form-check-inline' , 
                            ( requireClass() && builded_config.display === 'vertical' ) ? 'require' : '']">
                                
                                <input 
                                    :disabled="!status_ability" 
                                    autocomplete="off" 
                                    class="form-check-input" 
                                    :class="[validation_error]" 
                                    :id="fieldUid+'_R'" type="checkbox" 
                                    :name="fieldUid+'_'+name" 
                                    :checked="value.length===i_options.length" 
                                    @click="selectUnSelectAll()" 
                                    :value="0" 
                                    mode="MULTI" 
                                    v-expression.validation="i_validations" 
                                    v-expression.behaviour="i_behaviours">
                                <label class="form-check-label" :for="fieldUid+'_R'">
                                                                        
                                    <template v-if="value.length===i_options.length">{{getLabel($root, 'CHB_UNCHECK_ALL')}}</template>
                                    <template v-else>{{getLabel($root, 'CHB_CHECK_ALL')}}</template>

                                    <template v-if=" builded_config.display !== 'vertical'"><b> |</b></template>
                                </label>

                            </div>
                        </template>

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
                                    :id="fieldUid+'_'+i" type="checkbox" 
                                    :name="fieldUid+'_'+name" 
                                    :checked="isChecked(o.v)" 
                                    :value="o.v" 
                                    @click="updateChecboxValues($event,$event.target.value)"
                                    mode="MULTI" 
                                    v-expression.validation="i_validations" 
                                    v-expression.behaviour="i_behaviours">
                                <label class="form-check-label" :for="fieldUid+'_'+i">{{o.t}}</label>

                            </div>

                        </template>    

                    </template>

                    <template v-else>

                        <div class="card col-sm-12 display-mode-input">
                            
                            <div class="card-body pl-0 pr-0" v-if="value.length!==0">
                                <ul class="taglist pl-0 mb-0"><li v-for="(o,i) in i_options" :value="o.v" v-if="isChecked(o.v)">{{o.t}}</li></ul>
                            </div>

                            <div class="card-body pl-0 pr-0" v-if="value.length===0">
                            {{i_labels["LABEL_MD_EMPTY"]}}
                            </div>

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

CheckboxMulti_template = CheckboxMulti_template.prepareTemplate();