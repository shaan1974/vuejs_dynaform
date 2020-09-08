var Captcha_template = function()
{
    /*
        <div class="form-group row form-group-captcha" v-if="status_visibility" :class="[ isDisplayMode() ? 'd-none' : '' , styles.formGroup]">

            <template v-if="isNotDisplayMode()">

                <label v-if="fieldMode === 'full'" class="col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

                <div class="input-group input-group-sm" :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">

                    <div class="divCanvas" v-if="status_ability">
                        <canvas 
                        :name="name+'_'+fieldUid" 
                        :id="name+'_'+fieldUid"></canvas></div>

                    <div class="input-group input-group-sm col-sm-4">
                        <div class="input-group-prepend" @click="createCaptcha(true)" v-if="status_ability" ><div class="input-group-text"></div></div>                    
                        <input 
                            spellcheck="false" 
                            :disabled="!status_ability" 
                            type="text" 
                            class="form-control" 
                            @input="checkCode($event)" 
                            :class="[validation_error , requireClass() ? 'require' : '']" 
                            v-expression.validation="i_validations" 
                            v-expression.behaviour="i_behaviours" 
                            :placeholder="i_labels['PLACEHOLDER']">
                    </div>

                </div>                            

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

Captcha_template = Captcha_template.prepareTemplate();