var Rte_template = function()
{
    /*
        <div class="form-group row form-group-rte" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <template v-if="isNotDisplayMode()">

                    <span :name="name+'_'+fieldUid+'_container'" class="d-block">
                        <textarea 
                            :disabled="!status_ability" 
                            autocomplete="off" 
                            class="form-control" 
                            :class="[validation_error , requireClass() ? 'require' : '']" 
                            :name="name+'_'+fieldUid" 
                            @input="updateElement($event)" 
                            v-expression.validation="i_validations" 
                            v-expression.behaviour="i_behaviours">{{value}}</textarea>
                    </span>

                </template>

                <template v-else>

                    <div class="card col-sm-12 display-mode-input">
                        <div class="card-body pl-0 pr-0" :inner-html.prop="value" v-if="value!==''"></div>
                        <div class="card-body pl-0 pr-0" v-else>{{i_labels["LABEL_SD_EMPTY"]}}</div>
                    </div> 

                </template>                  

            </div>

            <template v-if="isNotDisplayMode()">

                <template v-if="builded_config.counter">
                    <label v-if="fieldMode === 'full'" class="col-counter col-sm-2 col-form-label">&#160;</label>
                    <div :class="[fieldMode === 'full' ? 'col-sm-10' : 'col-sm-12']" class="col-counter">
                        <div class="data-rte-counter" :class="updateContent === false ? 'warning-counter' : ''"><span>{{binaryLength}}</span>/{{builded_config.max}}</div>
                    </div>
                </template>

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

Rte_template = Rte_template.prepareTemplate();