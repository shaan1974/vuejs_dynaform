var Timepicker_template = function()
{
    /*
        <div class="form-group row form-group-time-picker" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <template v-if="isNotDisplayMode()">

                    <div class="form-group mb-0 form-control-sm pl-0">     
                        
                        <div class="input-group input-group-sm pl-0">

                            <input 
                                :data-clocklet="'class-name: clocklet-color-example; format: '+builded_config.format+''" 
                                autocomplete="off" 
                                spellcheck="false"                             
                                :name="name+'_'+fieldUid"
                                :disabled="!status_ability" 
                                mode="TIME" 
                                type="text" 
                                :value="value" 
                                @focus="tpFocus($event)" 
                                @blur="tpBlur($event)" 
                                :placeholder="i_labels['PLACEHOLDER']" 
                                v-expression.validation="i_validations" 
                                v-expression.behaviour="i_behaviours"                     
                                @input="updateElement($event,$event.target.value)" 
                                class="form-control form-control-sm" 
                                :class="[validation_error , requireClass() ? 'require' : '']">

                            <div v-if="status_ability" class="clear" @click="clearContent()" :class="[fadeIn, fadeOut]"></div>

                            <div class="input-group-append" @click="focus($event)">
                                <div class="input-group-text time-icon"></div>
                            </div>   
                            
                        </div>

                    </div>

                    <template v-if="isHelper()">
                        <Helper_extra :helper="i_labels['HELPER']" hclass=""></Helper_extra>
                    </template>
                
                    <template v-if="isGuideLine()">
                        <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid"></Guideline_extra>
                    </template>

                </template>

                <template v-else>

                    <div class="card col-sm-12 display-mode-input">
                        <div class="card-body pl-0 pr-0" v-if="value!==''">{{value}}</div>
                        <div class="card-body pl-0 pr-0" v-else>{{i_labels["LABEL_SD_EMPTY"]}}</div>
                    </div> 

                </template>                 

            </div>

        </div>
  	*/
}.toString();

Timepicker_template = Timepicker_template.prepareTemplate();