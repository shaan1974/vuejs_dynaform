var FileInput_template = function()
{
    /*
        <div class="form-group form-group-input-file row" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">

                <template v-if="isNotDisplayMode()">

                    <div class="custom-file" :name="name+'_'+fieldUid+'_container'">
                        
                        <input 
                                :disabled="!status_ability" 
                                v-if="status" 
                                autocomplete="off" 
                                type="file" 
                                class="custom-file-input" 
                                :class="[validation_error]" 
                                :name="name+'_'+fieldUid" 
                                @change="handleFileSelect($event,$event.target.value)" 
                                v-expression.validation="i_validations" 
                                v-expression.behaviour="i_behaviours">
                        <div class="warning-message fade-out four" v-if="warning_message_display" @click="warning_message_display=false;" @animationend="animationOff()">{{warning_message}}</div>
                        <label class="custom-file-label text-left" :class="[fileName === '' ? '' : 'd-none' , requireClass() ? 'require' : '' ]">{{i_labels["LABEL_SD_EMPTY"]}}</label>
                        <label class="custom-file-label text-left" :class="[fileName === '' ? 'd-none' : '' , requireClass() ? 'require' : '']">{{fileName}}</label>
                        
                        <span @click="reset($event)" class="icon-reset" v-if="notEmptyObject(value)"></span>

                    </div>

                </template>

                <template v-else>

                    <div class="card col-sm-12 display-mode-input">
                        <div class="card-body pl-0 pr-0 " v-if="notEmptyObject(value)">{{value.name}}</div>
                        <div class="card-body pl-0 pr-0 " v-else>{{i_labels["LABEL_SD_EMPTY"]}}</div>
                    </div> 

                </template>                   

            </div>          
            
            <template v-if="isNotDisplayMode()">

                <template v-if="isHelper()">
                    <Helper_extra :helper="i_labels['HELPER']" :hclass="fieldMode === 'full' ? ''+css_config.helper+'' : 'col-sm-12'"></Helper_extra>
                </template>

                <template v-if="isGuideLine()">
                    <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid+'_container'"></Guideline_extra>
                </template>            

            </template>

        </div>
    */
}.toString();

// FileInput_template = FileInput_template.slice(13, -1).trim().slice(2, -2).trim();
FileInput_template = FileInput_template.prepareTemplate();