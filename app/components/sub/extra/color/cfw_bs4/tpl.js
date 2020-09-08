var Colorpicker_template = function()
{
    /*
        <div class="form-group row form-group-color-picker" v-if="status_visibility" :class="styles.formGroup">

            <label v-if="fieldMode === 'full'" class="col-sm-2 col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">

                <div class="input-group input-group-sm">
                    
                    <template v-if="isNotDisplayMode()">

                        <!--<span class="icon-reset" v-if="status_ability" @click="emptyColor($event)"></span>-->

                        <input                                         
                                :disabled="!status_ability" 
                                type="hidden"
                                autocomplete="off" 
                                :name="name+'_'+fieldUid" 
                                :value="value"
                                v-expression.validation="i_validations" 
                                v-expression.behaviour="i_behaviours" 
                                @input="updateElement($event,$event.target.value)"
                                mode="CP" 
                                :placeholder="i_labels['PLACEHOLDER']" class="form-control hover" :class="[validation_error , requireClass() ? 'require' : '']">                  
                        
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <label :for="'color-input_'+fieldUid+''" class="color-label" :style="{ 'background-color' : d_color }"></label>
                            </div>
                        </div>
                        <input :name="name+'_'+fieldUid+'_add'" type="text" spellcheck="false" autocomplete="off" placeholder="Select..." class="form-control color-input-value" :value="d_color" @keydown.prevent>
                        <div v-if="status_ability" class="clear" @click="clearContent()" :class="[fadeIn, fadeOut]"></div>
                        <div class="input-group-append">
                            <div class="input-group-text color-icon"></div>
                        </div>

                        <input autocomplete="off" type="checkbox" :id="'color-input_'+fieldUid+''" class="color-input" />

                        <div class="color-picker">
                            <canvas class="color-block" height="150" width="150" @mousedown="colorBlockMouseDown($event)" @mousemove="colorBlockMouseMove($event)" @mouseup="colorBlockMouseUp($event)"></canvas>
                            <canvas class="color-strip" height="150 " width="30 " @click="colorStripClick($event)"></canvas>
                            <button class="btn btn-success btn-xs btn-select" @click="selectColor()"></button>
                            <button class="btn btn-secondary btn-xs btn-cancel" @click="cancelColor()"></button>
                        </div>

                        <div class="col-12 m-0 p-0"></div>

                        <template v-if="isHelper()">
                            <Helper_extra :helper="i_labels['HELPER']" hclass=""></Helper_extra>
                        </template>
                    
                        <template v-if="isGuideLine()">
                            <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid+'_add'"></Guideline_extra>
                        </template>

                    </template>

                    <template v-else>

                        <div class="card col-sm-12 display-mode-input">
                            <div class="card-body pl-0 pr-0" v-if="value!==''">{{value}}</div>
                            <div class="card-body pl-0 pr-0" v-else>{{i_labels["LABEL_SD_EMPTY"]}}</div>
                        </div> 

                    </template>  
            
                </div>

            </div>

        </div>
  	*/
}.toString();

Colorpicker_template = Colorpicker_template.prepareTemplate();