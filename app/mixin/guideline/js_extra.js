var Guideline_Extra_Mixin = {

    methods:
    {
        isGuideLine: function()
        {
            if (typeof this.parent_index === "undefined")
            {
                return true;
            }

            if (typeof this.parent_index !== "undefined" && this.$parent.$parent.fieldType === "TableRepeater")
            {
                if (typeof this.labels === "undefined") return false;
                if (typeof this.labels.guideline === "undefined") return false;

                return (this.parent_index === 0) ? true : false;
            }

            if (typeof this.labels === "undefined")
            {
                return false;
            }

            if (typeof this.labels.guideline === "undefined")
            {
                return false;
            }

            return true;
        },
        isOutsideDocument: function(el)
        {
            var cel = el.getBoundingClientRect();

            return cel.x < 0 || cel.y < 0 || cel.y + cel.height > document.body.clientHeight || cel.x + cel.width > document.body.clientWidth;
        },
        collide: function(el1, el2)
        {
            var r1 = el1.getBoundingClientRect();
            var r2 = el2.getBoundingClientRect();

            var wgEl1 = window.getComputedStyle(el1);
            var r1TopAdd = parseInt(wgEl1.marginTop);
            var r1BottomAdd = parseInt(wgEl1.marginBottom);
            var r1RigthAdd = parseInt(wgEl1.marginRight);
            var r1LefttAdd = parseInt(wgEl1.marginLeft);

            var wgEl2 = window.getComputedStyle(el2);
            var r2TopAdd = parseInt(wgEl2.marginTop);
            var r2BottomAdd = parseInt(wgEl2.marginBottom);
            var r2RigthAdd = parseInt(wgEl2.marginRight);
            var r2LefttAdd = parseInt(wgEl2.marginLeft);

            return !(r1.top - r1TopAdd > r2.bottom + r2BottomAdd || r1.right + r1RigthAdd < r2.left - r2LefttAdd || r1.bottom + r1BottomAdd < r2.top - r2TopAdd || r1.left - r1LefttAdd > r2.right + r2RigthAdd);
        },
        setPositionGuideline: function(guidelineElement, m, mc, position, refElement)
        {
            var x = window.scrollX;
            var y = window.scrollY;
            var glHeight = guidelineElement.offsetHeight;
            var glWidth = guidelineElement.offsetWidth;
            var elHeight = refElement.offsetHeight;
            var elWidth = refElement.offsetWidth;
            var arHeight = guidelineElement.querySelector(".arrow").offsetHeight;
            var arWidth = guidelineElement.querySelector(".arrow").offsetWidth;
            var cLeft = parseInt(position.left) + x;
            var cTop = parseInt(position.top) + y;

            if (m[mc] === "bottom" || m[mc] === "top")
            {
                var cleft = cLeft + ((elWidth / 2) - (glWidth / 2));
                guidelineElement.style.left = "" + cleft + "px";

                if (m[mc] === "bottom")
                {
                    guidelineElement.style.top = "" + (cTop + elHeight) + "px";
                }
                else
                {
                    guidelineElement.style.top = "" + (cTop - glHeight - arHeight) + "px";
                }
            }
            else if (m[mc] == "left" || m[mc] === "right")
            {
                guidelineElement.style.top = "" + (cTop - (glHeight / 2) + arHeight) + "px";

                var d = (elWidth / 4);
                d = 0;
                if (m[mc] === "left")
                {
                    guidelineElement.style.left = "" + (cLeft - glWidth - arWidth + (d)) + "px";

                }
                else if (m[mc] === "right")
                {
                    guidelineElement.style.left = "" + (cLeft + elWidth + arWidth - (d)) + "px";
                }
            }
        }
    }
};

//  MERGE THIS MIXIN WITH THE MAIN ONE
//
Guideline_Mixin.methods = Object.assign(Guideline_Mixin.methods, Guideline_Extra_Mixin.methods);