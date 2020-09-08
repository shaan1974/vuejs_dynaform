var ChartsJS_template = function()
{
    /*
        <div class="form-group row form-group-charts" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
        
                <template v-if="isNotDisplayMode()">

                    <canvas :id="'myChart_'+fieldUid" :name="'myChart_'+fieldUid"></canvas>

                    <button id="changeCircleSize" @click="circleToogle()">Semi/Full Circle</button>

                    <template v-if="isHelper()">
                        <Helper_extra :helper="i_labels['HELPER']" hclass=""></Helper_extra>
                    </template>

                    <template v-if="isGuideLine()">
                        <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="'myChart_'+fieldUid"></Guideline_extra>
                    </template>

                </template>

                <template v-else>


                </template>                 
                
            </div>

        </div>
  	*/
}.toString();

ChartsJS_template = ChartsJS_template.prepareTemplate();