var DropUpload_template = function()
{
    /*
        <div class="form-group row form-group-drop-upload" v-if="status_visibility" :class="[ isDisplayMode() ? 'form-group-drop-upload-display' : '' , styles.formGroup]">

            <label v-if="fieldMode === 'full'" class="col-sm-2 col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <template v-if="isNotDisplayMode()">

                    <div 
                        v-expression.validation="i_validations" 
                        v-expression.behaviour="i_behaviours" 
                        :name="name+'_'+fieldUid+'_drop'" 
                        class="drop_zone" 
                        :class="[status_ability===false ? 'disabled' : '', over===true ? 'over' : '' , validation_error]" 
                        @dragover="handleDragOver($event)" @drop="handleFileSelect($event)" @dragleave="handleDragLeave($event)">{{i_labels["DROPZONE"][0]}}</div>

                </template>
                        
                <table v-if="files.length!=0" class="table table-bordered table-striped w-100 table-files">
                    <thead>
                        <tr>
                            <th></th>
                            <th>{{i_labels["DROPZONE"][1]}}</th>
                            <th>{{i_labels["DROPZONE"][2]}}</th>
                            <th colspan="2">{{i_labels["DROPZONE"][3]}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in files">
                            <td><span class="badge badge-secondary font-weight-normal">#{{index | increment}}/{{builded_config.maxFiles}}</span></td>
                            <td>{{row.name}}</td>
                            <td class="text-right">{{row.size}} Kb</td>
                            <td>{{row.type}}</td>
                            <td><button v-if="isNotDisplayMode()" class="btn btn-xs btn-danger btn-remove" @click="remove(index)"></button></td>
                        </tr>
                    </tbody>
                </table>

                <div v-if="files.length===0" class="no-files" :class="status_ability===false ? 'disabled' : ''" >
                    <template v-if="isNotDisplayMode()">{{i_labels["DROPZONE"][4]}}</template>
                    <template v-else>{{i_labels["LABEL_MD_EMPTY"]}}</template>
                </div>

                <div class="alert alert-warning mb-0" role="alert" v-if="rejected.length!==0">
                    <ul class="mb-0">
                        <li v-for="(row, index) in rejected"><template v-if="row.name!==''">{{row.name}} - </template>{{row.error}}</li>
                    </ul>
                </div>

                <template v-if="isNotDisplayMode()">
                
                    <template v-if="isHelper()">    
                        <Helper_extra :helper="i_labels['HELPER']" hclass=""></Helper_extra>
                    </template>

                    <template v-if="isGuideLine()">
                        <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid+'_drop'"></Guideline_extra>
                    </template>
                
                </template>
                
            </div>

        </div>
  	*/
}.toString();

// DropUpload_template = DropUpload_template.slice(13, -1).trim().slice(2, -2).trim();
DropUpload_template = DropUpload_template.prepareTemplate();