var Tab_Static_template = function()
{
    /*
        <div class="form-group row form-group-static-tab" v-if="status_visibility" :class="styles.formGroup">

            <!--<button @click="set_OFF">Set Off-x</button><button @click="set_ON">Set On-x</button> ({{status_ability}})-->
            
            <fieldset class="w-100" :disabled="!status_ability" :name="name+'_'+fieldUid">

              <label v-if="fieldMode === 'full'" class="col-form-label float-left" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

              <label v-if="fieldMode !== 'full' && builded_config.displayLabelAboveAnyway === true" class="col-form-label text-left col-sm-12" :class="[styles.label]">{{i_labels["LABEL"]}}</label>

              <div :class="fieldMode === 'full' ? ''+css_config.group+' float-right' : 'col-sm-12'">                            

                <div class="card text-center">
                    
                    <div class="card-header card-tab-header">
              
                      <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item" v-for="(tabName, parent_index) in i_labels['TABS']" >
                          <a class="nav-link" href="javascript:void(0)" :class="{ 'active': parent_index === vtab }" @click="vtab=parent_index">{{tabName}}</a>
                        </li>
                      </ul>

                    </div>
                  
                    <template v-for="(row, parent_index) in values" >
                    <div class="card-body" :class=" (parent_index === vtab ? '' : 'd-none')">
                      
                      <template v-for="(rowValue, key, index) in row[0]">
                          
                          <FormGenerator_Repeater :rowValue="rowValue" :key3="key" :index="index" :fieldsFormat="fieldsFormat[parent_index]" :name="key" :parent_index="parent_index"></FormGenerator_Repeater>

                      </template>                

                      <div class="clearfix"></div>
                      
                    </div>
                    </template>
                    
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

// Tab_Static_template = Tab_Static_template.slice(13, -1).trim().slice(2, -2).trim();
Tab_Static_template = Tab_Static_template.prepareTemplate();