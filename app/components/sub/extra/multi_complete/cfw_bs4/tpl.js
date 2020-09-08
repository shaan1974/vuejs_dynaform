var MultiComplete_template = function()
{
    /*
        <div class="form-group row form-group-multi-complete" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-sm-2 col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div class="input-group input-group-sm" :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                    
                <template v-if="isNotDisplayMode()">

                    <div class="col-sm-12 pl-0">

                        <div class="alert alert-warning" role="alert" v-show="!maxReach()" v-html="builded_config.maxLabel"></div>

                        <input type="text"
                            v-show="maxReach()"
                            :disabled="!status_ability" 
                            autocomplete="off"
                            spellcheck="false" 
                            :name="name+'_'+fieldUid"  
                            :value="search_value"
                            @keyup="keyUp($event)" 
                            v-expression.validation="i_validations" 
                            v-expression.behaviour="i_behaviours" 
                            mode="M_COMPLETE"
                            :placeholder="i_labels['PLACEHOLDER']" class="form-control form-control-sm" :class="[validation_error , requireClass() ? 'require' : '']">  

                        <span v-if="builded_config.max != Number.MAX_SAFE_INTEGER" class="mc-counter" v-show="maxReach()">{{value.length}}/{{builded_config.max}}</span>

                        <div class="clear" @click="clearContent()" :class="[fadeIn, fadeOut]"></div>                    

                        <div class="card-body pl-0 pr-0" v-if="value.length!==0">
                            <ul class="mclist pl-0 mb-0">
                                <li v-for="(o,i) in i_options" :value="o.v" v-if="isChecked(o.v)">
                                    <span class="badge badge-secondary font-weight-normal value">{{o.t}}</span>
                                    <span class="badge badge-danger remove-icon" @click="removeItem(itemPosition(o.v),$event)">&#160;</span>
                                </li>
                            </ul>
                        </div>

                        <div class="search_result_content" :class="[menu_status === false ? 'd-none' : '' , search_value.length >= 3 ? 'search_result_content-bottom' : '']">
                            <a class="list-group-item" v-html="i_labels['NOTHING']" v-if="nothing_found"></a>
                            <a href="#" v-if="filterValue(o.t,o.v)" class="list-group-item list-group-item-action" v-for="(o,i) in i_options" :key="o.t" v-html="filterHtml(o.t)" @click.prevent="setChoice(o.v)"></a>
                        </div>                    
                        
                    </div>

                    <div class="card-body pl-0 pr-0" v-if="value.length===0">
                    {{i_labels["LABEL_MD_EMPTY"]}}
                    </div>                    

                </template>        

                <template v-else>

                    <div class="card col-sm-12 display-mode">
                        <div class="card-body pl-0 pr-0" v-if="value!==''">{{textValue}}</div>
                        <div class="card-body pl-0 pr-0" v-else>{{i_labels["LABEL_SD_EMPTY"]}}</div>
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

MultiComplete_template = MultiComplete_template.prepareTemplate();