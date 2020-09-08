var MapInput_template = function()
{
    /*
        <div class="form-group row form-group-map" v-if="status_visibility" :class="[styles.formGroup , this.builded_config.displayZoomValue === true ? 'd-zoom' : 'h-zoom' ]">

            <label v-if="fieldMode === 'full'" class="col-sm-2 col-form-label" :class="[styles.label,css_config.label]">{{i_labels["LABEL"]}}</label>

            <div class="input-group input-group-sm" :class="fieldMode === 'full' ? ''+css_config.group+'' : 'col-sm-12'">
                
                <template v-if="isNotDisplayMode()">

                    <span class="icon-reset" v-if="status_ability" @click="emptyMap($event)" :class="this.builded_config.inline===true ? 'icon-inline' : ''"></span>

                    <input 
                        @paste.prevent 
                        @keydown.prevent 
                        :disabled="!status_ability" 
                        :readonly="this.builded_config.inline" 
                        type="text"
                        autocomplete="off" 
                        :name="name+'_'+fieldUid" 
                        :value="precalculated"
                        v-expression.validation="i_validations" 
                        v-expression.behaviour="i_behaviours" 
                        @input2="updateElement($event,$event.target.value)" 
                        mode="MAP"
                        :placeholder="i_labels['PLACEHOLDER']" class="form-control" :class="[validation_error , requireClass() ? 'require' : '']">  
                    
                    <div class="input-group-append" :class="this.builded_config.inline===true ? 'd-none' : ''">
                        <div class="input-group-text map-icon" @click="showMap()"></div>
                    </div>

                    <div class="map" :class="this.builded_config.inline===true ? 'map-inline' : ''" @mouseleave="mouseLeaveMap($event)">&#160;
                        
                        <!-- CUSTOM MODAL FOR POPOVER UPDATE -->

                        <div :class="modalUpdate === true ? 'd-block' : 'd-none'" class="popup-update-overlay"></div>

                        <div :class="modalUpdate === true ? 'd-block' : 'd-none'" class="popup-update-content">
                            
                            <div class="popup-update-content-inside">
                                
                                <div class="form-group">
                                    
                                    <label class="col-form-label">
                                        {{getLabel($root, 'MODAL_MAP_UPDATE_TITLE')}}
                                        <div class="popup-update-close-btn" @click="updatePopupFromModal('reset')">&#160;</div>
                                    </label> 
                                    
                                    <div class="form-group form-group-textarea">
                                        
                                        <div class="btn-group btn-group-sm" role="group">
                                            <template v-for="(o,i) in bb_code_data">
                                                <button v-if="o.mode==='BUTTON'" :title="getLabel($root, o.title)" type="button" class="btn btn-light" :class="o.className" :value="o.v" v-on:click="BBCodeEditorCommand($event,o.tags, o.p)"></button> 
                                                <button v-if="o.mode==='SEPARATOR'" class="btn btn-light btn-sep">|</button>
                                                <button v-if="o.mode==='CUSTOM'" :title="getLabel($root, o.title)" class="btn btn-light" :class="o.className" v-on:click="BBCodeEditorExecCommand($event,o.action)"></button>
                                            </template>
                                        </div>
                                        <textarea class="form-control popup-update-content-textarea"  spellcheck="false"></textarea>

                                        <div v-if="previewHtml!=''" v-html="previewHtml" class="previewHtml" @click="previewHtml=''"></div>

                                    </div>

                                    <div class="form-group form-group-button">

                                        <div class="select-warper selectIcon" :class="tmpIcon" v-if="instanceOf() === 'Marker' " @change="setMarkerIcon($event)">
                                            <select name="iconMarker" class="form-control form-control-sm">
                                                <option value=""></option>
                                                <option v-for="(o,i) in getDico(this.$root, 'MAP_ICONS')" :value="o.v" :selected="isCurrentIcon(o.v)">{{o.t}}</option> 
                                            </select>
                                        </div>

                                        <button class="btn btn-sm btn-success" @click="updatePopupFromModal('update');">{{getLabel($root, 'MODAL_MAP_UPDATE_TITLE_BTN_ACTION')}}</button>
                                        <button class="btn btn-sm btn-secondary" @click="updatePopupFromModal('reset')">{{getLabel($root, 'MODAL_MAP_UPDATE_TITLE_BTN_CANCEL')}}</button>
                                    </div>

                                </div>

                            </div>

                        </div>
                        
                        <!-- /CUSTOM MODAL FOR POPOVER UPDATE -->

                        <div class="reminder" v-if="currentOs().windows===true">{{getLabel($root, 'MAP_SCROLL_W_S')}}</div>
                        <div class="reminder" v-if="currentOs().mac_os===true">{{getLabel($root, 'MAP_SCROLL_M_S')}}</div>
                        <div class="reminder" v-if="currentOs().android===true">{{getLabel($root, 'MAP_SCROLL_A_S')}}</div>

                    </div>

                </template>

                <template v-else>

                    <input 
                        type="hidden"
                        autocomplete="off" 
                        :name="name+'_'+fieldUid" 
                        :value="precalculated"
                        mode="MAP">                
                    <div class="map display-mode" :class="this.builded_config.inline===true ? 'map-inline' : ''">&#160;</div>

                    <div class="card col-sm-12 display-mode-input" v-if="typeOf(value)==='string'"> 
                        <div class="card-body pl-0 pr-0" v-if="value!==''">{{value}}</div>
                        <div class="card-body pl-0 pr-0" v-else>{{i_labels["LABEL_SD_EMPTY"]}}</div>
                    </div> 

                    <div class="card col-sm-12 display-mode-input" v-else> 
                        <div class="card-body pl-0 pr-0" v-if="value.length!==0">
                            
                            <template v-if="value.polygons.length!==0">
                                <b>{{getLabel(this.$root, "MAP_POLYGONS")}}:</b>
                                <ul class="noneList pl-0 mb-0 taglist"><li v-for="(o,i) in value.polygons">{{o}}</li></ul>
                            </template>

                            <template v-if="value.markers.length!==0">
                                <b>{{getLabel(this.$root, "MAP_MARKERS")}}:</b>
                                <ul class="noneList pl-0 mb-0 taglist"><li v-for="(o,i) in value.markers">{{o}}</li></ul>
                            </template>

                            <template v-if="value.polylines.length!==0">
                                <b>{{getLabel(this.$root, "MAP_POLYLINES")}}:</b>
                                <ul class="noneList pl-0 mb-0 taglist"><li v-for="(o,i) in value.polylines">{{o}}</li></ul>
                            </template>

                        </div>
                        <div class="card-body pl-0 pr-0" v-else>{{i_labels["LABEL_MD_EMPTY"]}}</div>
                    </div> 

                </template>                  

            </div>   

            <template v-if="isNotDisplayMode()">

                <template v-if="isHelper()">
                    <Helper_extra :helper="i_labels['HELPER']" :hclass="fieldMode === 'full' ? ''+css_config.helper+'' : 'col-sm-12'"></Helper_extra>
                </template>

                <template v-if="isGuideLine()">
                    <Guideline_extra :guideline="i_labels['GUIDELINE']" :reff="name+'_'+fieldUid"></Guideline_extra>
                </template>            

            </template>
                    
        </div>    		
    */
}.toString();

MapInput_template = MapInput_template.prepareTemplate();