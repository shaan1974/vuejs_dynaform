var Container_Template = function()
{
    /*
        <div class="form-group row ml-0 mr-0 form-group-container" v-if="status_visibility" :disabled="!status_ability" :class="styles.formGroup">

            <div class="card col-sm-12">
                
                <div class="card-body pl-0 pr-0" v-if="!builded_config.html" v-tooltip="builded_config.tooltip">
                   {{i_labels["LABEL"]}}
                </div>

                <div class="card-body pl-0 pr-0" v-else v-html="i_labels['LABEL']" v-tooltip="builded_config.tooltip"></div>

            </div>            

        </div>
  	*/
}.toString();

Container_Template = Container_Template.prepareTemplate();