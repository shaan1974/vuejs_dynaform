var Table_Static_template = function()
{
    /*
        <div class="form-group row form-group-static-table" v-if="status_visibility" :class="styles.formGroup">

            <fieldset :disabled="!status_ability" class="w-100" :name="name+'_'+fieldUid">

              <label v-if="fieldMode === 'full'" class="col-sm-2 float-left col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

              <label v-if="fieldMode !== 'full' && builded_config.displayLabelAboveAnyway === true" class="col-form-label text-left col-sm-12" :class="[styles.label]">{{i_labels["LABEL"]}}</label>

              <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'" class="float-left">

                <div class="card text-center">
                    
                    <table class="table table-static">
                    
                      <thead>
                        <tr>
                          <th v-if="i_labels['PREFIXS'].length!==0">&#160;</th>
                          <th v-for="(tabName, parent_index) in i_labels['TABS']" class="text-left" :class="styles['tableHeader'][parent_index]">{{tabName}}</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr v-for="(row, parent_index) in values" >

                          <td v-if="i_labels['PREFIXS'].length!==0" :class="styles['tablePrefix'][parent_index]">{{i_labels["PREFIXS"][parent_index]}}</td>
                          <td v-for="(rowValue, key, index) in row[0]">
                            <FormGenerator_Repeater :rowValue="rowValue" :key3="key" :index="index" :fieldsFormat="fieldsFormat[parent_index]" :name="name" :parent_index="parent_index"></FormGenerator_Repeater>
                          </td> 

                        </tr>
                      </tbody>

                    </table>

                    <div class="clearfix"></div>
                    
              </div>

              <div class="clearfix"></div>

              <template v-if="isHelper()">
                <Helper_extra :helper="i_labels['HELPER']" hclass="col-sm-12"></Helper_extra>
              </template>

              <template v-if="isGuideLine()">
                  <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid"></Guideline_extra>
              </template>              

            </div>

          </fieldset>

        </div>
    */
}.toString();

// Table_Static_template = Table_Static_template.slice(13, -1).trim().slice(2, -2).trim();
Table_Static_template = Table_Static_template.prepareTemplate();