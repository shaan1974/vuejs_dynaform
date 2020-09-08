var Debug_template = function()
{
    /*
        <div v-if="this.$root.config.debugMode" class="col-sm-12" @click="display=!display">
            <div class="debugBar text-center">D-E-B-U-G</div>
            <div :class="[display === true ? '' : 'd-none']">
                <pre v-html="this.prettyJSON(dvar)" ></pre>
            </div>
        </div>

    */
}.toString();

Debug_template = Debug_template.prepareTemplate();