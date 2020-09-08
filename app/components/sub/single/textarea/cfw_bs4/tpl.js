var TextArea_template = function()
{
    /*
        <div class="form-group row form-group-textarea" v-if="status_visibility" :class="[isDisplayMode() ? 'form-group-textarea-display' : '' , styles.formGroup ]">

            <label v-if="fieldMode === 'full'" class="col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <template v-if="isNotDisplayMode()">

                    <div v-if="limit_warning" class="alert alert-warning" role="alert">{{getLabel($root, "TEXTAREA_LIMIT_REACH")}}</div>

                    <div class="textarea_clear_btn" v-on:click="clear()" v-if="builded_config.resetBtn">&#160;</div>
                    <textarea 
                        :disabled="!status_ability" 
                        autocomplete="off" 
                        spellcheck="false" 
                        class="form-control" 
                        :class="[validation_error , requireClass() ? 'require' : '']" 
                        v-autogrow="i_autogrow" 
                        v-maxLength="i_maxlength" 
                        :isMaxLength="maxlength ? 'true' : 'false'" 
                        :name="name+'_'+fieldUid" 
                        @input2="updateElement($event)" 
                        @input="updateTextArea($event)" 
                        @paste="pasteEvent($event)" 
                        v-expression.validation="i_validations" 
                        v-expression.behaviour="i_behaviours" 
                        :placeholder="i_labels['PLACEHOLDER']">{{value}}</textarea>

                </template>

                <template v-else>

                    <div class="card col-sm-12 display-mode-input">
                        <div class="card-body pl-0 pr-0" :inner-html.prop="value | textAreaToHtml"></div>
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

// TextArea_template = TextArea_template.slice(13, -1).trim().slice(2, -2).trim();
TextArea_template = TextArea_template.prepareTemplate();