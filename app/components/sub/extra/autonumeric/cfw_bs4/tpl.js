var AutoNumericInput_template = function()
{
    /*
        <div class="form-group row form-group-input-autonumeric" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <template v-if="isNotDisplayMode()">

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
                        mode="AN" 
                        :placeholder="i_labels['PLACEHOLDER']" class="form-control form-control-sm d-none" :class="[validation_error , requireClass() ? 'require' : '']">  

                    <input 
                        type="text" 
                        :disabled="!status_ability" 
                        class="form-control form-control-sm autonumeric" :class="[validation_error , requireClass() ? 'require' : '']"
                        :name="name+'_'+fieldUid+'_an'" 
                        :id="name+'_'+fieldUid+'_an'" 
                        :value="an_value" @blur="setAn()">

                    <template v-if="isHelper()">
                        <Helper_extra :helper="i_labels['HELPER']" hclass=""></Helper_extra>
                    </template>

                    <template v-if="isGuideLine()">
                        <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid+'_an'"></Guideline_extra>
                    </template>

                </template>

                <template v-else>

                    <input 
                        type="text" 
                        :disabled="!status_ability" 
                        class="form-control form-control-sm autonumeric d-none"
                        :name="name+'_'+fieldUid+'_an'" 
                        :id="name+'_'+fieldUid+'_an'" 
                        :value="an_value" @blur="setAn()">                

                    <div class="card col-sm-12 display-mode-input">
                        <div class="card-body pl-0 pr-0" v-if="value!==''">{{d_value}}</div>
                        <div class="card-body pl-0 pr-0" v-else>{{i_labels["LABEL_SD_EMPTY"]}}</div>
                    </div> 

                </template>                 
                
            </div>

        </div>
  	*/
}.toString();

AutoNumericInput_template = AutoNumericInput_template.prepareTemplate();