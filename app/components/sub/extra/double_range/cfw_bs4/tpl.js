var DoubleRange_template = function()
{
    /*
        <div class="form-group row form-group-double-range position-relative" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-sm-2 col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">

                <template v-if="isNotDisplayMode()">

                    <input type="text"
                        :disabled="!status_ability" 
                        autocomplete="off"
                        :name="name+'_'+fieldUid" 
                        :value="value"
                        mode="DS" 
                        v-expression.validation="i_validations" 
                        v-expression.behaviour="i_behaviours" 
                        @input="updateElement($event,$event.target.value)"
                        @change="updateElement($event,$event.target.value)"
                        class="form-control form-control-sm d-none" :class="[validation_error , requireClass() ? 'require' : '']">              

                    <div class="top_range">
                        <div class="range" :id="name+'_'+fieldUid+'_range'" :name="name+'_'+fieldUid+'_range'">
                            <div class="range__between" :class="status_ability ? '' : 'disabled'"></div>
                            <button class="range__button_1" @mousedown="moveButton($event,1)" @dragstart.stop :disabled="!status_ability" ></button>
                            <button class="range__button_2" @mousedown="moveButton($event,2)" @dragstart.stop :disabled="!status_ability" ></button>
                            <hr class="range_hr" />
                            <input autocomplete="off" class="range_inpt1" type="number" :min="builded_config.min" :max="builded_config.max" :value="value | split(0)" @change="changeValue(1)" :disabled="!status_ability" >
                            <input autocomplete="off" class="range_inpt2" type="number" :min="builded_config.min" :max="builded_config.max" :value="value | split(1)" @change="changeValue(2)" :disabled="!status_ability" >
                        </div>
                    </div>

                </template>

                <template v-else>

                    <div class="card col-sm-12 display-mode-input">
                        <div v-if="value!==''" class="card-body pl-0 pr-0 ">{{value |split(0)}} <span class="bewteen"></span> {{value |split(1)}}</div>
                        <div v-if="value===''">{{i_labels["LABEL_SD_EMPTY"]}}</div>
                    </div> 

                </template>                  

                <template v-if="isNotDisplayMode()">

                    <template v-if="isHelper()">
                        <Helper_extra :helper="i_labels['HELPER']" hclass=""></Helper_extra>
                    </template>

                    <template v-if="isGuideLine()">
                        <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid+'_range'"></Guideline_extra>
                    </template>

                </template>

            </div>

        </div>
  	*/
}.toString();

// DoubleRange_template = DoubleRange_template.slice(13, -1).trim().slice(2, -2).trim();
DoubleRange_template = DoubleRange_template.prepareTemplate();