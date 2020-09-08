var CustomBtnGroup_template = function()
{
    /*
        <div class="form-group-button-grp form-group row mb-0" v-if="status_visibility" :disabled="!status_ability" :class="styles.formGroup">

            <div class="col-sm-12 col-form-label pt-0 pb-0" :name="'label_'+fieldUid" :class="styles.label">                
                
                <div class="btn-group btn-group-sm" role="group">
                    <button v-for="(o,i) in labels.label" type="button" class="btn btn-secondary" :class="styles.buttons[i]" @click="btnDo(i)"> {{getLabel($root, o)}}</button>
                </div>

            </div>

            <template v-if="isGuideLine()">
                <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="'label_'+fieldUid"></Guideline_extra>
            </template>

        </div>
  	*/
}.toString();

// Label_template = Label_template.slice(13, -1).trim().slice(2, -2).trim();
CustomBtnGroup_template = CustomBtnGroup_template.prepareTemplate();