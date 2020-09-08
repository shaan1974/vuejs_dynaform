//	BTT
//
//  https://stackoverflow.com/questions/15935318/smooth-scroll-to-top/55926067

Btt_extra = Vue.component(
    'Btt_extra',
    {
        template: Btt_extra_template,
        data: function()
        {
            return {
                show: false,
                check: true
            };
        },
        mounted: function()
        {
            window.on("scroll.tt", this.switchVisibility);
        },
        methods:
        {
            "jumpToTop": function()
            {
                // var that = this;

                this.show = false;
                this.check = false;
                this.scrollToTop();
            },
            "scrollToTop": function()
            {
                var c = document.documentElement.scrollTop || document.body.scrollTop;

                if (c > 0)
                {
                    window.requestAnimationFrame(this.scrollToTop);
                    window.scrollTo(0, c - c / 8);
                }
                else
                {
                    this.check = true;
                    this.switchVisibility();
                }
            },
            "switchVisibility": function()
            {
                if (this.check === true)
                {
                    this.show = (window.scrollY !== 0) ? true : false;
                }
            }
        }
    }
);