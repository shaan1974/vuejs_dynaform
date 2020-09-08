var Modal_Validation_template = function()
{
    /*
        <div>
            <div class="modal fade show modal-error" :class="visible === true ? '' : 'd-none'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" aria-modal="true">
            
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        
                        <div class="modal-header">
                            <h6 class="modal-title"><b>{{customLabels[0]}}</b></h6>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="visible=false">
                                <span aria-hidden="true">&#160;</span>
                            </button>
                        </div>

                        <div class="modal-body" v-if="visible">

                            <template v-if="errorMessages.length!==0">
                                <div class="alert alert-danger mb-0">
                                    <b v-if="errorMessages.length >=2">{{customLabels[3]}}</b>
                                    <b v-if="errorMessages.length === 1">{{customLabels[4]}}</b>
                                    <ul class="pt-2 pl-0 errors mb-0">
                                        <li v-for="fruit in errorMessages">{{fruit | removeUid}}</li>
                                    </ul>
                                </div>
                            </template>

                            <template v-if="errorMessages.length===0" >
                                <div class="alert alert-primary mb-0">
                                {{customLabels[2]}}
                                </div>
                            </template>

                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-secondary btn-close" data-dismiss="modal" @click="visible=false">{{customLabels[1]}}</button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            
            <div class="modal-backdrop fade show" :class="visible === true ? '' : 'd-none'"></div>

        </div>
    */
}.toString();

// Modal_Validation_template = Modal_Validation_template.slice(13, -1).trim().slice(2, -2).trim();
Modal_Validation_template = Modal_Validation_template.prepareTemplate();