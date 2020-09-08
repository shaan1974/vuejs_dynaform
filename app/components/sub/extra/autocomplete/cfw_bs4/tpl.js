var Autocomplete_template = function()
{
    /*
        <div class="form-group row form-group-autocomplete" @mouseleave="mouseLeaveComponent($event)" v-if="status_visibility" :class="styles.formGroup">
            
            <input                 
                type="text"
                autocomplete="off" 
                :name="name+'_'+fieldUid" 
                :value="value"
                v-expression.validation="i_validations" 
                v-expression.behaviour="i_behaviours" 
                @input="updateElement($event,$event.target.value)"
                mode="AUTOCOMPLETE" 
                class="d-none" 
                :class="[validation_error]">  

                <label v-if="fieldMode === 'full'" class="col-sm-2 col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <template v-if="isNotDisplayMode()">

                <div class="input-group input-group-sm" :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'" v-if="switch_input==='OFF'">
                
                    <span class="icon-reset" v-if="status_ability" @click="setEmptyValue()"></span>

                    <input 
                        :name="name+'_'+fieldUid+'_container'"
                        :id="name+'_'+fieldUid+'_container'"
                        :disabled="!status_ability" 
                        type="text"
                        autocomplete="off" 
                        :value="textualValue"
                        readonly="readonly"                        
                        :placeholder="i_labels['START']" class="form-control input-autocomplete border-right-0" :class="[validation_error , requireClass() ? 'require' : '']">  

                    <div class="input-group-append">
                        <div class="input-group-text autocomplete-icon" @click="initAutocomplete()"></div>
                    </div>
                    
                </div>    
                
                <div class="input-group input-group-sm" :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'" v-if="switch_input==='ON'">

                    <div class="input-group-prepend">
                        <div class="input-group-text"></div>
                    </div>

                    <input 
                        :name="name+'_'+fieldUid+'_container_edit'"
                        type="text"
                        autocomplete="off" 
                        :value="search_value"
                        @keyup="keyUp($event)"  
                        :placeholder="i_labels['PLACEHOLDER']" class="form-control" :class="[validation_error , requireClass() ? 'require' : '']">  

                    <div class="input-group-append">
                        <div class="input-group-text autocomplete-icon-clear" @click="reset"></div>
                    </div>

                    <div class="list-group autocomplete-choices" :class="[menu_status === false ? 'd-none' : '' , search_value.length >= 3 ? 'autocomplete-choices-bottom' : '']">
                        <a class="list-group-item" v-html="i_labels['NOTHING']" v-if="nothing_found"></a>
                        <a href="#" v-if="filterValue(o.t)" class="list-group-item list-group-item-action" v-for="(o,i) in i_options" :key="o.t" v-html="filterHtml(o.t)" @click.prevent="setChoice(o.v)"></a>
                    </div>

                </div>

            </template>

            <template v-else>

                <div class="input-group input-group-sm" :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                    <div class="card col-sm-12 display-mode-input">
                        <div class="card-body pl-0 pr-0" v-if="value!==''">{{textualValue}}</div>
                        <div class="card-body pl-0 pr-0" v-if="value===''">{{i_labels["LABEL_SD_EMPTY"]}}</div>
                    </div> 
                </div>

            </template>                 

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

Autocomplete_template = Autocomplete_template.prepareTemplate();