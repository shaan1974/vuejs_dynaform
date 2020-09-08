var ImageCr_template = function()
{
    /*
        <div class="form-group row form-group-image-cr" v-if="status_visibility" :class="[ isDisplayMode() ? 'form-group-image-cr-display' : '' , styles.formGroup ]">

            <label v-if="fieldMode === 'full'" class="col-sm-2 col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div class="input-group input-group-sm" :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <template v-if="isNotDisplayMode()">

                    <div class="warning-message fade-out four" v-if="warning_message_display" @click="warning_message_display=false;" @animationend="animationOff()">___{{customLabels['INVALID_FORMAT']}} {{config.extensions}}</div>

                    <div class="input-group input-group-sm" :disabled="!status_ability">
                        <div class="custom-file">
                            <input 
                                :disabled="!status_ability" 
                                type="file" class="custom-file-input js-loadfile" 
                                :name="name+'_'+fieldUid+'_file'" 
                                :id="name+'_'+fieldUid+'_file'" 
                                v-expression.validation="i_validations" 
                                v-expression.behaviour="i_behaviours">
                            <label class="custom-file-label" :for="name+'_'+fieldUid+'_file'" :class="[validation_error, requireClass() ? 'require' : '']">{{tmp_label}}</label>
                        </div>
                        <div class="input-group-append input-group-append-sm" v-if="show_reset_btn">
                            <button class="btn btn-outline-secondary btn-sm btn-reset" type="button" @click="resetImage()">{{customLabels['BTN_RESET']}}</button>
                        </div>
                        <div class="input-group-append input-group-append-sm" v-if="show_crop_btn">
                            <button class="btn btn-outline-secondary btn-sm btn-crop" type="button"  @click="crop()"> {{customLabels['BTN_CROP']}}</button>
                        </div>
                    </div>

                    <span @click="remove($event)" class="icon-reset" v-if="notEmptyObject(value)"></span>
                
                </template>

                <template v-else>
                    <div class="card col-sm-12 display-mode">
                        <div class="card-body pl-0 pr-0" v-if="notEmptyObject(value)">{{value.name}}</div>
                        <div class="card-body pl-0 pr-0" v-else>{{i_labels["LABEL_SD_EMPTY"]}}</div>
                    </div>
                </template>
                    
                    <div class="crop-wrapper" v-if="status_ability">
                        <div class="top-overlay overlays"></div>
                        <div class="bottom-overlay overlays"></div>
                        <div class="left-overlay overlays"></div>
                        <div class="right-overlay overlays"></div>
                        <div class="overlay">
                            <div class="overlay-inner"></div>
                        </div>
                        <div class="resize-container">
                            <div class="resize-container-ontop" @mousedown="startMoving($event)" @touchstart="startMoving($event)"></div>
                            <span class="resize-handle resize-handle-nw" @mousedown="startResize($event)" @touchstart="startResize($event)"></span>
                            <span class="resize-handle resize-handle-ne" @mousedown="startResize($event)" @touchstart="startResize($event)"></span>
                            <template v-if="isNotDisplayMode()">
                            <img class="resize-image hidden" :src="this.builded_config.emptyImage">
                            </template>
                            <template v-else>
                            <img class="resize-image" :src="value.value">
                            </template>
                            <span class="resize-handle resize-handle-sw" @mousedown="startResize($event)" @touchstart="startResize($event)"></span>
                            <span class="resize-handle resize-handle-se" @mousedown="startResize($event)" @touchstart="startResize($event)"></span>
                        </div>
                    </div>
                    
                <template v-if="isNotDisplayMode()">

                    <div class="effects-row" v-if="showEffects">
                        <table class="w-100">
                            <tr>
                                <td><b><u>{{customLabels['EFFECT_TITLE']}} :</u></b></td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="col-md-12 pl-0 effect-td-1">
                                        <div class="select-warper">
                                            <select class="form-control form-control-sm" @input="setEffectValue($event)">
                                                <option value=""></option>
                                                <option :value="index" v-for="(row, index , key) in filters">{{getLabel($root, "EFFECT_"+index)}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                <td class="effect-td-2"><button @click="customEffect(effectValue)" type="button" class="btn btn-success btn-sm btn-apply-effect" :disabled="effectValue===''">{{customLabels['BTN_APPLY']}}</button></td>
                            </tr>
                            <tr>
                                <td><button type="button" class="btn btn-secondary btn-sm badge-rotate-left" @click="rotateEffect('r-90')"> {{customLabels['ROTATE']}} -90°</button></td>
                            </tr>
                            <tr>
                                <td><button type="button" class="btn btn-secondary btn-sm badge-rotate-right" @click="rotateEffect('r90')"> {{customLabels['ROTATE']}} +90°</button></td>
                            </tr>
                        </table>
                    </div>

                </template>

            </div>   

            <template v-if="isNotDisplayMode()">
            
                <template v-if="isHelper()">
                    <Helper_extra :helper="i_labels['HELPER']" :hclass="fieldMode === 'full' ? ''+css_config.helper+'' : 'col-sm-12'"></Helper_extra>
                </template>

                <template v-if="isGuideLine()">
                    <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid+'_file'"></Guideline_extra>
                </template>            

            </template>
            
        </div>    		
    */
}.toString();

ImageCr_template = ImageCr_template.prepareTemplate();