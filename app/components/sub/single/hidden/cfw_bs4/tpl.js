var HiddenInput_template = function()
{
    /*
        <div v-if="status_visibility" class="form-group-hidden">

            <input type="hidden"
                :disabled="!status_ability"
                autocomplete="off"
                :value="value" 
                :name="name+'_'+fieldUid"
                @input="updateElement($event)" 
                v-expression.validation="validations" 
                v-expression.behaviour="i_behaviours">  

        </div>
    */
}.toString();

HiddenInput_template = HiddenInput_template.prepareTemplate();