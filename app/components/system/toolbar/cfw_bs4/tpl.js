var Toolbar_Template = function()
{
    /*
        <div class="form-group row ml-0 mr-0 form-group-toolbar" :class="topFixed===true ? 'fixedTb' : ''" v-if="isVisible">

            <div class="card col-sm-12">
                
                <div class="card-body pl-0 pr-0 text-right" :class="this.$root.config.debugMode ? 'debug' : ''">
                    
                    <template v-if="this.$root.config.toolbar.buttons.reset">
                        <button type="button" class="btn btn-sm btn-primary mr-1 btn-tb-reset" @click="resetForm">
                            <span class="d-none d-lg-inline-block" v-html="customLabels['BTN_RESET']"></span>
                        </button>
                    </template>

                    <template v-if="this.$root.config.toolbar.buttons.validation">

                        <div class="validation-status" :class="validationIconStatus">&#160;</div>
                        <button type="button" class="btn btn-sm btn-secondary ml-1 mr-1 btn-tb-validate" @click="validate">
                            <span class="d-none d-lg-inline-block" v-html="customLabels['BTN_VALIDATE']"></span>
                        </button>
                    </template>

                    <template v-if="this.$root.config.toolbar.buttons.submit">

                        <button type="button" class="btn btn-sm btn-success ml-1 btn-tb-submit" @click="submit" :disabled="disabledSubmit">
                            <span class="d-none d-lg-inline-block" v-html="customLabels['BTN_SUBMIT']"></span>
                        </button>

                    </template>

                    <template v-if="this.$root.config.toolbar.buttons.switchLanguages">

                        <!-- LG SWITCH -->
                        <div class="btn-group lg-btn-group" :class="showLg === true ? 'show' : ''" name="lg" v-if="this.$root.config.lg.multi">                            
                            <button 
                                type="button" class="btn btn-secondary dropdown-toggle btn-sm" 
                                data-toggle="dropdown" :aria-haspopup="showLg" aria-expanded="false" v-on:click="showLg=!showLg">
                                    <span class="flag-icon" :class="'flag-icon-'+this.$root.config.lg.short_icon"></span> {{this.$root.config.lg.short_lbl}}</button>
                            <div class="dropdown-menu dropdown-menu-right" :class="showLg === true ? 'show' : ''">
                                <a class="dropdown-item" href="#" @click="changeLg(o);" v-for="(o,i) in $root.config.lg.choices" :value="o.lg" v-if="o.lg!=$root.config.lg.short">
                                    <span class="flag-icon" :class="'flag-icon-'+o.icon"></span> {{o.lbl}}
                                </a> 
                            </div>
                        </div>            
                        <!-- /LG SWITCH -->       
                    
                    </template>
                        
                    <template v-if="this.$root.config.toolbar.buttons.switchGuidelines">

                        <label class="switch" v-if="switchButtonVisible" v-tooltip="{'label': 'TT_0','flow': 'down'}" data-tt-off="TT_4" data-tt-on="TT_0">
                        <span class="guideline_txt"></span>
                            <input type="checkbox" @click="switchGuidelines($event)">
                            <div class="slider round"></div>
                        </label>

                        <label class="no-switch" v-if="!switchButtonVisible">&#160;</label>

                    </template>

                </div>         
                
            </div>   
            
            <!-- MODAL RESET -->
            <div class="modal-backdrop fade show" v-if="modalReset"></div>

            <div class="modal-reset modal fade show " :class="modalReset === true ? 'd-block' : 'd-none'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" aria-modal="true">
            
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLiveLabel">{{customLabels['MODAL_RESET_TITLE']}}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="modalReset=false">
                                <span aria-hidden="true">&#160;</span>
                            </button>
                        </div>

                        <div class="modal-body" v-html="customLabels['MODAL_RESET_CONTENT']"></div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-success btn-action" data-dismiss="modal" @click="actionReset();modalReset=false">{{customLabels['MODAL_RESET_BTN_ACTION']}}</button>
                            <button type="button" class="btn btn-sm btn-secondary btn-cancel" data-dismiss="modal" @click="modalReset=false">{{customLabels['MODAL_RESET_BTN_CANCEL']}}</button>
                        </div>
                        
                    </div>
                </div>
                
            </div>            
            <!-- /MODAL RESET -->

            <!-- MODAL LOAD -->
            <!--
            <div class="modal-backdrop-load modal-backdrop fade show" v-if="modalLoad" style="z-index: 1046!important;"></div>

            <div class="modal-load modal fade show" :class="modalLoad === true ? 'd-block' : 'd-none'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" aria-modal="true" style="z-index: 1046!important;"">
            
                <div class="modal-dialog" role="document">
                    <div class="modal-content">                        
                        <div class="modal-body" style=""><div class="loader"><div class="spinner"></div></div></div></div>                        
                    </div>
                </div>
                
            </div>            
            -->
            <!-- /MODAL LOAD -->            

        </div>
  	*/
}.toString();

// Toolbar_Template = Toolbar_Template.slice(13, -1).trim().slice(2, -2).trim();
Toolbar_Template = Toolbar_Template.prepareTemplate();