var DynamicTable_Paginate_Mixin = {

    methods:
    {
        /*
            https://jasonwatmore.com/post/2018/08/07/javascript-pure-pagination-logic-in-vanilla-js-typescript
        */
        "paginate": function(totalItems, currentPage, pageSize, maxPages)
        {
            // calculate total pages
            var totalPages = Math.ceil(totalItems / pageSize);

            // ensure current page isn't out of range
            if (currentPage < 1)
            {
                currentPage = 1;
            }
            else if (currentPage > totalPages)
            {
                currentPage = totalPages;
            }

            var startPage, endPage;
            if (totalPages <= maxPages)
            {
                // total pages less than max so show all pages
                startPage = 1;
                endPage = totalPages;
            }
            else
            {
                // total pages more than max so calculate start and end pages
                var maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
                var maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
                if (currentPage <= maxPagesBeforeCurrentPage)
                {
                    // current page near the start
                    startPage = 1;
                    endPage = maxPages;
                }
                else if (currentPage + maxPagesAfterCurrentPage >= totalPages)
                {
                    // current page near the end
                    startPage = totalPages - maxPages + 1;
                    endPage = totalPages;
                }
                else
                {
                    // current page somewhere in the middle
                    startPage = currentPage - maxPagesBeforeCurrentPage;
                    endPage = currentPage + maxPagesAfterCurrentPage;
                }
            }

            // calculate start and end item indexes
            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

            // create an array of pages to ng-repeat in the pager control
            // var pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
            var pages = Array.from(Array(endPage + 1 - startPage).keys()).map(function(i)
            {
                return startPage + i;
            });

            // return object with all pager properties required by the view
            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
        },
        /*
            TO CHECK IF PAGE IS FIRST OR LAST
        */
        "indexOfPage": function(v)
        {
            if (v === 'first')
            {
                return this.builded_config.dynamic.array_pager.pages.indexOf(1) !== -1 ? true : false;
            }
            else if (v === 'last')
            {
                return this.builded_config.dynamic.array_pager.pages.indexOf(this.builded_config.dynamic.array_pager.totalPages) !== -1 ? true : false;
            }
        },
        /*
            CHANGE PER PAGE
        */
        "changePerPage": function(e)
        {
            // var v = parseInt(e.target.value);
            // this.builded_config.dynamic.per_page = v;
            this.builded_config.dynamic.per_page = parseInt(e.target.value);

            //  LOAD DATA FROM PAGE 1 AND ALSO GET FILTERS
            //
            this.loadExternalData(1);
        }
    }
};

//  MERGE THIS MIXIN WITH THE MAIN ONE
//
DynamicTable_Mixin.methods = Object.assign(DynamicTable_Mixin.methods, DynamicTable_Paginate_Mixin.methods);