var Dropdown_template = function()
{
    /*
        <div class="form-group row form-group-dropdown" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-sm-2 col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <template v-if="isNotDisplayMode()">

                    <div class="btn-group" :class="show === true ? 'show' : ''" :name="name+'_'+fieldUid+'_dd'">
                        <button 
                            :disabled="!status_ability" 
                            type="button" class="btn btn-secondary dropdown-toggle btn-sm" 
                            :class="[validation_error , requireClass() ? 'require' : '']" 
                            data-toggle="dropdown" :aria-haspopup="show" aria-expanded="false" v-on:click="show=!show">
                            <template v-if="value==''">{{i_labels['PLACEHOLDER']}}</template>
                            <template v-if="value!=''">{{textValue}}</template>
                        </button>
                        <div class="dropdown-menu xdropdown-menu-right" :class="show === true ? 'show' : ''">
                            <button class="dropdown-item" type="button" v-for="(o,i) in i_options" :value="o.v" v-on:click="set(o.v)">{{o.t}}</button> 
                        </div>
                    </div>      

                    <input type="text"
                        autocomplete="off"
                        :name="name+'_'+fieldUid" 
                        :value="value"
                        v-expression.validation="i_validations" 
                        v-expression.behaviour="i_behaviours" 
                        @input="updateElement($event,$event.target.value)" 
                        mode="DROPDOWN" 
                        class="form-control form-control-sm d-none" :class="[validation_error]">  

                </template>
                

                <template v-else>

                    <div class="card col-sm-12 display-mode-input">
                        <div class="card-body pl-0 pr-0" v-if="value!==''">{{value}}</div>
                        <div class="card-body pl-0 pr-0" v-else>{{i_labels['LABEL_SD_EMPTY']}}</div>
                    </div> 

                </template>                  

                <template v-if="isNotDisplayMode()">

                    <template v-if="isHelper()">
                        <Helper_extra :helper="i_labels['HELPER']" hclass=""></Helper_extra>
                    </template>
                
                    <template v-if="isGuideLine()">
                        <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid+'_dd'"></Guideline_extra>
                    </template>                

                </template>
                
            </div>

        </div>
  	*/
}.toString();

// Dropdown_template = Dropdown_template.slice(13, -1).trim().slice(2, -2).trim();
Dropdown_template = Dropdown_template.prepareTemplate();