var CustomBtn_template = function()
{
    /*
        <div class="form-group-button form-group row mb-0" v-if="status_visibility" :disabled="!status_ability" :class="styles.formGroup">

            <div class="col-sm-12 col-form-label" :name="'label_'+fieldUid" :class="styles.label">                
                <button class="btn" :class="styles.button" @click="btnDo()"><template v-if="i_labels['LABEL']!==''"> {{i_labels["LABEL"]}}</template></button>
            </div>

            <template v-if="isGuideLine()">
                <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="'label_'+fieldUid"></Guideline_extra>
            </template>

        </div>
  	*/
}.toString();

CustomBtn_template = CustomBtn_template.prepareTemplate();