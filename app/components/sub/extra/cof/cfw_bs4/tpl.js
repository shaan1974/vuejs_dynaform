var Cof_template = function()
{
    /*
        <div class="form-group row form-group-cof" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div class="input-group input-group-sm" :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <template v-if="isNotDisplayMode()">
                
                    <input                         
                            :disabled="!status_ability" 
                            type="text" 
                            spellcheck="false" 
                            autocomplete="off" 
                            :name="name+'_'+fieldUid" 
                            :value="value"
                            v-expression.validation="i_validations" 
                            v-expression.behaviour="i_behaviours" 
                            @input="updateElement($event,$event.target.value)"
                            mode="COF" 
                            :placeholder="i_labels['PLACEHOLDER']" class="form-control hover" :class="[validation_error , requireClass() ? 'require' : '']">  
                    
                    <div v-if="status_ability" class="clear" @click="clearContent();menu_status=false;" :class="[fadeIn, fadeOut]"></div> 

                    <div class="input-group-append" v-on:click="menu_status=!menu_status;cofEvents()">
                        <div class="input-group-text cof-icon"></div>
                    </div>
                    
                    <div class="list-group cof-choices" :class="menu_status === false ? 'd-none' : ''">
                        <a href="#" class="list-group-item list-group-item-action" v-for="(o,i) in i_options" :key="o.t" v-on:click="menu_status=false;set(o.t)">{{o.t}}</a>
                    </div>                                        

                </template>

                <template v-else>

                    <div class="card col-sm-12 display-mode">
                        <div class="card-body pl-0 pr-0" v-if="value!==''">{{value}}</div>
                        <div class="card-body pl-0 pr-0" v-else>{{i_labels["LABEL_SD_EMPTY"]}}</div>
                    </div> 

                </template>
                                
            </div>                            

            <template v-if="isNotDisplayMode()">

                <template v-if="isHelper()">
                    <Helper_extra :helper="i_labels['HELPER']" :hclass="[ fieldMode === 'full' ? ''+css_config.helper+'' : 'col-sm-12']"></Helper_extra>
                </template>

                <template v-if="isGuideLine()">
                    <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid"></Guideline_extra>
                </template>

            </template>
            
        </div>    		
    */
}.toString();

Cof_template = Cof_template.prepareTemplate();