var Footer_Template = function()
{
    /*
        <footer class="page-footer font-small blue fixed-bottom" v-if="display">

            <div class="footer-copyright text-right py-3">{{customLabels['FOOTER_TEXT']}}&copy; {{year}}</div>

        </footer>
  	*/
}.toString();

// Footer_Template = Footer_Template.slice(13, -1).trim().slice(2, -2).trim();
Footer_Template = Footer_Template.prepareTemplate();