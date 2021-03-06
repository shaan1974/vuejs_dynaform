var FormatInput_template = function()
{
    /*
        <div class="form-group row form-group-format" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <template v-if="isNotDisplayMode()">

                    <div 
                        :name="name+'_'+fieldUid+'_container'"
                        :disabled="!status_ability" 
                        :style="'width :'+cwidth+''" 
                        :placeholder="builded_config.empty" 
                        spellcheck="false" 
                        class="form-control text-left input-mask" 
                        :class="[validation_error , requireClass() ? 'require' : '']" 
                        :contenteditable="status_ability" 
                        @keydown="functionKeydown($event)" 
                        @blur="functionBlur($event)">{{div_content}}</div>

                    <div v-if="status_ability" class="input-mask-clear" @click="clearFormatInput()"></div>

                    <div class="clearfix pt-1"></div>
                    
                    <input type="text"
                        disabled
                        autocomplete="off"
                        :name="name+'_'+fieldUid" 
                        :value="value"
                        v-expression.validation="i_validations" 
                        v-expression.behaviour="i_behaviours" 
                        @input="updateElement($event,$event.target.value)" 
                        mode="FORMAT" 
                        class="form-control form-control-sm d-none" :class="[validation_error]">  

                </template>

                <template v-else>

                    <div class="card col-sm-12 display-mode-input">
                        <div class="card-body pl-0 pr-0 " v-if="value!==''">{{value}}</div>
                        <div class="card-body pl-0 pr-0 " v-else>{{i_labels["LABEL_SD_EMPTY"]}}</div>
                    </div> 

                </template>                    

                <template v-if="isNotDisplayMode()">

                    <template v-if="isHelper()">
                        <Helper_extra :helper="i_labels['HELPER']" hclass=""></Helper_extra>
                    </template>

                    <template v-if="isGuideLine()">
                        <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid+'_container'"></Guideline_extra>
                    </template>                

                </template>
               
            </div>

        </div>
  	*/
}.toString();


// FormatInput_template = FormatInput_template.slice(13, -1).trim().slice(2, -2).trim();
FormatInput_template = FormatInput_template.prepareTemplate();