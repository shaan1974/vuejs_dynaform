/*	
    CHARTJS
    
    https://www.chartjs.org/

    Supported with example : 
        
        Line            :   "line"
        Other charts    :   "pie","doughnut".
        Bar charts      :   "line","horizontalBar"
*/
ChartsJS = Vue.component(
    'ChartsJS',
    {
        template: ChartsJS_template,
        mixins: [DynaForm_Mixin, Labels_Mixin, Validation_Mixin, Require_Mixin, Behaviour_Mixin, Prop_Status_Mixin, Guideline_Mixin, Event_Mixin, Value_Mixin, Helper_Mixin, Config_Mixin, Watchers_Mixin],
        props: ['labels', 'name', 'value', 'fieldMode', 'parent_index', 'key2', 'fieldType', 'validations', 'behaviours', 'defaultValue', 'propStatus', 'config', 'styles'],
        data: function()
        {
            return {
                "default_config": "empty_config",
                "chart":
                {}
            };
        },
        mounted: function()
        {
            // console.log(this);
            var that = this;

            //  BASE CONFIG
            //
            var base_config = JSON.parse(JSON.stringify(this.builded_config.chart));

            //  GET CONFIG PART FROM DATA
            //
            base_config.data.datasets = this.value;

            //  REPLACE LABELS
            //        
            base_config.data.labels = base_config.data.labels.map(function(o)
            {
                return that.getLabel(that.$root, "" + o + "");
            });

            //  BUILD IT
            //
            var chartData = JSON.parse(JSON.stringify(base_config));
            // console.log(chartData);

            var ctx = document.getElementById("myChart_" + this.fieldUid).getContext('2d');

            this.chart = new Chart(ctx, chartData);
        },
        methods:
        {
            "circleToogle": function()
            {
                if (this.chart.options.circumference === Math.PI)
                {
                    this.chart.options.circumference = 2 * Math.PI;
                    this.chart.options.rotation = -Math.PI / 2;
                }
                else
                {
                    this.chart.options.circumference = Math.PI;
                    this.chart.options.rotation = -Math.PI;
                }

                this.chart.update();
            }
        }
    }
);