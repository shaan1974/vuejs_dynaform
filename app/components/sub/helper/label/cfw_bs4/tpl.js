var Label_template = function()
{
    /*
        <div class="form-group-label form-group row mb-0" v-if="status_visibility" :disabled="!status_ability" :class="styles.formGroup">

            <label class="col-sm-12 col-form-label" :name="'label_'+fieldUid" :class="styles.label">{{i_labels["LABEL"]}}</label>

            <template v-if="isGuideLine()">
                <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="'label_'+fieldUid"></Guideline_extra>
            </template>

        </div>
  	*/
}.toString();

Label_template = Label_template.prepareTemplate();