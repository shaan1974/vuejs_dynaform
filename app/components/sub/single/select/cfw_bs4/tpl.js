var Select_template = function()
{
    /*
        <div class="form-group row form-group-select" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <template v-if="isNotDisplayMode()">

                    <div class="select-warper" v-if="multi==false" >   
                        <select v-if="multi==false" 
                            :disabled="!status_ability" 
                            v-expression.validation="i_validations" 
                            v-expression.behaviour="i_behaviours" 
                            class="form-control form-control-sm"
                            :value="value"	
                            :name="name+'_'+fieldUid" 
                            @input="updateElement($event,$event.target.value)" :class="[validation_error , requireClass() ? 'require' : '']">
                            
                            <option v-for="(o,i) in i_options" :value="o.v">{{o.t}}</option> 
                            
                        </select>
                    </div>
                    
                    <select v-if="multi==true" multiple
                        :disabled="!status_ability" 
                        class="form-control form-control-sm" 
                        v-expression.validation="i_validations" 
                        v-expression.behaviour="i_behaviours" 
                        :name="name+'_'+fieldUid" 
                        :size="multi===true ? tsize : ''" 
                        @input="updateSelectValues($event,$event.target.value)" :class="[validation_error]">

                        <option v-for="(o,i) in i_options" :value="o.v" :selected="isSelected(o.v)">{{o.t}}</option>
                        
                    </select>

                    <div v-if="multi==true && requireClass()" class="required">&#160;</div>

                    <template v-if="isHelper()">
                        <Helper_extra :helper="i_labels['HELPER']" hclass=""></Helper_extra>
                    </template>

                </template>

                <template v-else>

                    <div class="card col-sm-12 display-mode-input">
                        
                        <div class="card-body pl-0 pr-0" v-if="multi==false">
                            <template v-if="value!==''">
                                <span v-for="(o,i) in i_options" v-if="o.v===value">{{o.t}}</span>
                            </template>
                            <template v-else>
                                <span>{{i_labels["LABEL_SD_EMPTY"]}}</span>
                            </template>
                        </div>

                        <div class="card-body pl-0 pr-0" v-else>
                            <template v-if="value.length!==0">
                                <ul class="taglist pl-0 mb-0"><li v-for="(o,i) in i_options" :value="o.v" v-if="isSelected(o.v)">{{o.t}}</li></ul>
                            </template>
                            <template v-else>
                                <span>{{i_labels["LABEL_MD_EMPTY"]}}</span>
                            </template>
                        </div>
                        
                    </div> 

                </template>                   
                
            </div>    

            <template v-if="isNotDisplayMode()">

                <template v-if="isGuideLine()">
                    <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid"></Guideline_extra>
                </template>
            
            </template>

        </div>    		            
    */
}.toString();

// Select_template = Select_template.slice(13, -1).trim().slice(2, -2).trim();
Select_template = Select_template.prepareTemplate();