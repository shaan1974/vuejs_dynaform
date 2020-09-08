var Currency_template = function()
{
    /*
        <div class="form-group form-group-currency row" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-sm-2 col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <template v-if="isNotDisplayMode()">

                    <input 
                        :name="name+'_'+fieldUid+'_container'"
                        :disabled="!status_ability" 
                        type="text" 
                        autocomplete="off" 
                        spellcheck="false" 
                        class="form-control form-control-sm" 
                        :class="[formated_visible ? '' : 'd-none' , validation_error , requireClass() ? 'require' : '']" :value="formatNumber()" 
                        @click="buildUnformatted($event)"
                        @blur="buildUnformatted($event)">

                    <input 
                        type="text" 
                        autocomplete="off" 
                        spellcheck="false" 
                        class="form-control form-control-sm" 
                        :class="[unformated_visible ? '' : 'd-none' , validation_error , requireClass() ? 'require' : '']" :value="unformatted" 
                        @blur="blurFromUnformated($event)" @keydown="keyDown($event)">
                    
                    <input type="text"
                        autocomplete="off" 
                        spellcheck="false" 
                        :name="name+'_'+fieldUid" 
                        :value="value"                     
                        v-expression.validation="i_validations" 
                        v-expression.behaviour="i_behaviours"                     
                        @input="updateElement($event,$event.target.value)"
                        mode="CURRENCY" 
                        :placeholder="i_labels['PLACEHOLDER']" class="form-control form-control-sm d-none" :class="[validation_error , requireClass() ? 'require' : '']">  

                    <div class="clear" @click="clearContent()" :class="[fadeIn, fadeOut]"></div>  
                    
                    <template v-if="isHelper()">
                        <Helper_extra :helper="i_labels['HELPER']" hclass=""></Helper_extra>
                    </template>
                
                    <template v-if="isGuideLine()">
                        <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid+'_container'"></Guideline_extra>
                    </template>                

                </template>

                <template v-else>

                    <div class="card col-sm-12 display-mode-input">
                        <div class="card-body pl-0 pr-0" v-if="value!==''">{{formatNumber()}}</div>
                        <div class="card-body pl-0 pr-0" v-else>{{i_labels["LABEL_SD_EMPTY"]}}</div>
                    </div> 

                </template>                     
                
            </div>

        </div>
  	*/
}.toString();

Currency_template = Currency_template.prepareTemplate();