var Number_template = function()
{
    /*
        <div class="form-group row form-group-input-number" v-if="status_visibility" :class="styles.formGroup">
            
            <span class="numberWidth">x</span>
            <label v-if="fieldMode === 'full'" class="col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <!--({{status_ability}})-->
                
                <template v-if="isNotDisplayMode()">

                    <template v-if="this.builded_config.baseArrows===true">
                    
                        <input type="number" 
                            :disabled="!status_ability" 
                            autocomplete="off" 
                            :name="name+'_'+fieldUid" 
                            :value="value" 
                            v-expression.validation="i_validations" 
                            v-expression.behaviour="i_behaviours" 
                            @input="updateElement($event,$event.target.value);"
                            @keyup="checkNumber($event)" 
                            :min="this.builded_config.minValue" 
                            :max="this.builded_config.maxValue"
                            :step="this.builded_config.step" 
                            :placeholder="i_labels['PLACEHOLDER']" 
                            class="form-control form-control-sm form-group-number-0" 
                            :class="[validation_error , requireClass() ? 'require' : '']">

                            <div class="clear" @click="clearContent()" :class="[fadeIn, fadeOut]"></div>  

                    </template>

                    <template v-else>

                        <div class="form-group mb-0 form-control-sm pl-0 form-group-no-arrows form-group-number-1" v-if="this.builded_config.mode===1">     
                            
                            <div class="input-group input-group-sm pl-0">

                                <div class="input-group-prepend" @click="btnClick('UP')">
                                    <div class="input-group-text up-icon"></div>
                                </div>   
                                <input type="number" 
                                    :disabled="!status_ability" 
                                    autocomplete="off" 
                                    :name="name+'_'+fieldUid" 
                                    :value="value" 
                                    v-expression.validation="i_validations" 
                                    v-expression.behaviour="i_behaviours" 
                                    @input="updateElement($event,$event.target.value);"
                                    @change="checkNumber($event)"  
                                    @keyup="checkNumber($event)" 
                                    @wheel="rollNumber($event)" 
                                    :min="this.builded_config.minValue" 
                                    :max="this.builded_config.maxValue"
                                    :step="this.builded_config.step" 
                                    :placeholder="i_labels['PLACEHOLDER']" 
                                    class="form-control form-control-sm numberNoArrows" 
                                    :class="[validation_error , requireClass() ? 'require' : '']">

                                <div v-if="status_ability" class="clear" @click="clearContent()" :class="[fadeIn, fadeOut]"></div>

                                <div class="input-group-append" @click="btnClick('DN')">
                                    <div class="input-group-text down-icon"></div>
                                </div>   
                                
                            </div>

                        </div>   
                        
                        <div class="form-group mb-0 form-control-sm pl-0 form-group-no-arrows form-group-number-2" v-if="this.builded_config.mode===2">     
                            
                            <div class="input-group input-group-sm pl-0">

                                <input type="number" 
                                    :disabled="!status_ability" 
                                    autocomplete="off" 
                                    :name="name+'_'+fieldUid" 
                                    :value="value" 
                                    v-expression.validation="i_validations" 
                                    v-expression.behaviour="i_behaviours" 
                                    @input="updateElement($event,$event.target.value);"
                                    @change="checkNumber($event)"  
                                    @keyup="checkNumber($event)" 
                                    @wheel="rollNumber($event)" 
                                    :min="this.builded_config.minValue" 
                                    :max="this.builded_config.maxValue"
                                    :step="this.builded_config.step" 
                                    :placeholder="i_labels['PLACEHOLDER']" 
                                    class="form-control form-control-sm numberNoArrows" 
                                    :class="[validation_error , requireClass() ? 'require' : '']">

                                <div v-if="status_ability" class="clear" @click="clearContent()" :class="[fadeIn, fadeOut]"></div>

                                <div class="input-group-append" >
                                    <div class="input-group-text" style="display: inline-block;padding:0px">
                                        <span class="plus-icon b-icon" @click="btnClick('UP')">&#160;</span>
                                        <div class="b-sep">&#160;</div>
                                        <span class="less-icon b-icon" @click="btnClick('DN')">&#160;</span>
                                    </div>
                                </div>   
                                
                            </div>

                        </div>   

                    </template>

                    <template v-if="isHelper()">
                        <Helper_extra :helper="i_labels['HELPER']" hclass=""></Helper_extra>                
                    </template>

                </template>

                <template v-else>

                    <div class="card col-sm-12 display-mode-input">
                        <div class="card-body pl-0 pr-0" v-if="value!==''">{{value}}</div>
                        <div class="card-body pl-0 pr-0" v-else>{{i_labels["LABEL_SD_EMPTY"]}}</div>
                    </div> 

                </template>                  

            </div>
            
            <template v-if="isNotDisplayMode()">

                <template v-if="isGuideLine()">
                    <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid"></Guideline_extra>
                </template>

            </template>

        </div>				  					
    */
}.toString();

// Number_template = Number_template.slice(13, -1).trim().slice(2, -2).trim();
Number_template = Number_template.prepareTemplate();