var Helper_template = function()
{
    /*
        <small class="form-text text-muted text-left" :class="[base_css , hclass]">{{helper}}</small>
    */
}.toString();

// Helper_template = Helper_template.slice(13, -1).trim().slice(2, -2).trim();
Helper_template = Helper_template.prepareTemplate();