var PasswordInput_template = function()
{
    /*
        <div class="form-group row form-group-password" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-sm-2 col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div class="input-group input-group-sm" :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <template v-if="isNotDisplayMode()">

                    <input 
                            :disabled="!status_ability" 
                            :type="password_status === false ? 'password' : 'text'"
                            autocomplete="off" 
                            spellcheck="false" 
                            :name="name+'_'+fieldUid" 
                            :value="value"
                            v-expression.validation="i_validations" 
                            v-expression.behaviour="i_behaviours" 
                            @input="updateElement($event,$event.target.value)"
                            :placeholder="i_labels['PLACEHOLDER']" class="form-control" :class="[validation_error , requireClass() ? 'require' : '']">  

                    <div v-if="status_ability" class="clear" @click="clearContent()" :class="[fadeIn, fadeOut]"></div>                    
                    
                    <div class="input-group-append" v-on:click="password_status=!password_status">
                        <div class="input-group-text password-icon" :class="password_status === false ? 'password-off' : 'password-on'"></div>
                    </div>

                </template>

                <template v-else>

                    <div class="card col-sm-12 display-mode-input">
                        <div class="card-body pl-0 pr-0" v-if="value!==''">{{value | crypt}}</div>
                        <div class="card-body pl-0 pr-0" v-else>{{i_labels["LABEL_SD_EMPTY"]}}</div>
                    </div> 

                </template>                    

            </div>   

            <template v-if="this.builded_config.displayPasswordStength">

                <label v-if="fieldMode === 'full'" class="col-sm-2 col-form-label" :class="[styles.label,css_config.label]"></label>

                <div class="input-group input-group-sm" :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                    <div class="progress w-100">
                        <div class="progress-bar" :class="progress_class" role="progressbar" :style="'width: '+stength+'%'" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>                    
                </div>

            </template>
            
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

// PasswordInput_template = PasswordInput_template.slice(13, -1).trim().slice(2, -2).trim();
PasswordInput_template = PasswordInput_template.prepareTemplate();