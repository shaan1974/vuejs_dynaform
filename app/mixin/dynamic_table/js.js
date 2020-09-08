//	MIXIN - CLEAR

var DynamicTable_Mixin = {

    data: function()
    {
        return {
            tableDynaLoader: false
        };
    },
    methods:
    {
        "loadExternalData": function(page)
        {
            //  LAST SEARCH URL
            //
            this.builded_config.dynamic.last_search_url = (typeof this.builded_config.dynamic.last_search_url === "undefined") ? "" : this.builded_config.dynamic.last_search_url;

            //  SET PAR ORDER WITH EMPTY BY DEFAULT
            //
            this.builded_config.dynamic.parm_order = (typeof this.builded_config.dynamic.parm_order === "undefined") ? "" : this.builded_config.dynamic.parm_order;

            //  SET PAR FILTER WITH EMPTY BY DEFAULT
            //
            this.builded_config.dynamic.parm_filter = (typeof this.builded_config.dynamic.parm_filter === "undefined") ? "" : this.builded_config.dynamic.parm_filter;

            //  VARIABLES
            //
            var per_page = this.builded_config.dynamic.per_page;
            var url = this.builded_config.dynamic.url;
            this.builded_config.dynamic.page = page;

            //  PARAMETERS
            //
            var parms = [];

            //  BASE
            //
            parms.push("page=" + page + "", "per_page=" + per_page + "");

            //   IF PARM ORDER IS NOT EMPTY WE ADD IT TO PASS PARAMETERS
            //
            if (this.builded_config.dynamic.parm_order !== "")
            {
                parms.push(this.builded_config.dynamic.parm_order);
            }

            //  IF PARM FILTER IS NOT EMPTY
            //
            if (this.builded_config.dynamic.parm_filter != "")
            {
                parms.push(this.builded_config.dynamic.parm_filter);
            }

            //  BUILD FULL URL
            //
            url = url + "?" + parms.join("&");

            //	--DEBUG_[ display url ]
            if (this.$root.config.debugMode === true)
            {
                console.log(url);
            }
            //  --/DEBUG_[ display url ]

            //  SET BY DEFAULT EXECUTE SEARCH TO FALSE AND COMPARE IF BUILD URL IS DIFFERENT AS THE PREVIOUS ONE
            //
            var execute_search = false;
            if (url !== this.builded_config.dynamic.last_search_url)
            {
                this.builded_config.dynamic.last_search_url = url;
                execute_search = true;
            }

            //  IF WE HAVE TO EXECUTE THE QUERY
            //
            if (execute_search === true)
            {
                //  SHOW LOADER
                this.tableDynaLoader = true;

                axios(
                    {
                        method: 'get',
                        url: url,
                        responseType: 'stream',
                    })
                    .then(this._getData);
            }
        },
        /*
            RESPONSE FROM AXIOS
        */
        "_getData": function(response)
        {
            var j = response.data;
            var exp, len4, cnt, regex, co, vv, cnt3, len3;

            this.builded_config.dynamic.total = j.total;
            this.builded_config.dynamic.grand_total = j.grand_total;
            this.builded_config.dynamic.last_page = j.last_page;

            //  EMPTY TABLE, USE SLICE TO AVOID MUTATION ERROR
            //
            this.values.splice(0, this.values.length);

            //  IF RETURN DATA LENGTH IS LOWER THAN ELEMENT PER PAGE, WE SET IT AS MAXIUM
            len4 = (j.data.length < this.builded_config.dynamic.per_page) ? j.data.length : this.builded_config.dynamic.per_page;

            //  LOOP ON RECORDS
            for (cnt = 0; cnt < len4; cnt++)
            {
                //  LOOP ON EACH ENTRY OF THE RECORD TO CHECK IF FILTER IS ACTIF
                for (cnt3 = 0, len3 = this.builded_config.dynamic.headerFiltering.actif.length; cnt3 < len3; cnt3++)
                {
                    //  IF YES WE AND IF THE VALUE IS NO EMPTY WE CHECK THE VALUE INTO THE RECORD AND WE REPLACE IT WITH A DEDICATE TAG [F]xxx[/F]
                    if (this.builded_config.dynamic.headerFiltering.actif[cnt3] === true)
                    {
                        co = Object.keys(j.data[cnt])[cnt3];
                        vv = this.builded_config.dynamic.headerFiltering.values[cnt3];

                        //  IF HEADER INSIDE TABLE IS VISIBLE SO WE HAVE TO TAKE IN COUNT LENGHT OF VALUES WITH MINCHARS
                        //
                        exp = true;
                        if (this.builded_config.dynamic.headerFiltering.visible === true)
                        {
                            exp = false;
                            if (this.builded_config.dynamic.headerFiltering.values[cnt3].length >= this.builded_config.dynamic.headerFiltering.minChars[cnt3])
                            {
                                exp = true;
                            }
                        }

                        if (exp === true)
                        {
                            if (vv !== "")
                            {
                                regex = new RegExp('(' + vv + ')', "gi");
                                j.data[cnt][co] = j.data[cnt][co].replace(regex, "[f]$1[/f]");
                            }
                        }
                    }
                }

                //  SET REMOVE DATA INTO LOCAL DATA
                //
                this.values.push(j.data[cnt]);
            }


            //	--DEBUG_[ stringify json ]
            if (this.$root.config.debugMode === true)
            {
                console.log(JSON.stringify(this.values));
            }
            //	--/DEBUG_[ stringify json ]

            //  BUILD PAGINATION
            this.builded_config.dynamic.array_pager = this.paginate(j.total, this.builded_config.dynamic.page, this.builded_config.dynamic.per_page, this.builded_config.dynamic.paging);

            //  HIDE LOADER
            //
            setTimeout(
                function(tt)
                {
                    var endTransition = function(t)
                    {
                        t.tableDynaLoader = false;
                    };

                    tt.$el.querySelector(".dynamicTableLoader").once(["transitionend"], endTransition.bind(null, tt));
                    tt.$el.querySelector(".dynamicTableLoader").classList.add("m-fadeOut");
                }, 500, this);
        }
    }
};