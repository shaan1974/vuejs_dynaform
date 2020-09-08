var Guideline_extra_template = function()
{
    /*
        <small class="d-none guideline" :guideline="reff">
        
            <div class="popover custom" style="top:0px;left:0px" :reff="reff" :ndx="col">
                <div class="arrow"></div>
                <h3 class="popover-header"></h3>
                <div class="popover-body" v-html="guideline"></div>
            </div> 

        </small>
    */
}.toString();

// Guideline_extra_template = Guideline_extra_template.slice(13, -1).trim().slice(2, -2).trim();
Guideline_extra_template = Guideline_extra_template.prepareTemplate();