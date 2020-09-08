var Field_Set_template = function()
{
    /*
        <div class="form-group row form-group-fieldset" :class="[fieldMode==='block' ? 'form-group-fieldset-block' : '' , styles.formGroup ]" v-if="status_visibility">

            <div class="col-sm-12">
          
                <fieldset class="scheduler-border" :disabled="!status_ability" :name="name+'_'+fieldUid"">
                    
                    <legend class="scheduler-border" :class="styles.label">{{i_labels["LABEL"]}}</legend>
                    
                    <div class="control-group">
                        
                      <template v-for="(row, parent_index) in values" >
                        
                        <template v-for="(rowValue, key, index) in row[0]">
                            
                            <FormGenerator_Repeater :rowValue="rowValue" :key3="key" :index="index" :fieldsFormat="fieldsFormat[parent_index]" :name="name" :parent_index="parent_index"></FormGenerator_Repeater>

                         </template>                

                      </template>   

                    </div>

                </fieldset>

            </div>

            <template v-if="isHelper()">
                <Helper_extra :helper="i_labels['HELPER']" hclass="col-sm-12"></Helper_extra>
            </template>

            <template v-if="isGuideLine()">
                <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid"></Guideline_extra>
            </template>
                        
        </div>
    */
}.toString();

// Field_Set_template = Field_Set_template.slice(13, -1).trim().slice(2, -2).trim();
Field_Set_template = Field_Set_template.prepareTemplate();