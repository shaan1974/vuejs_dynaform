//	MIXIN MAP_FULLSCREEN

var Map_Fs_Mixin = {

    methods:
    {
        /*  **************************************************************************************************************************************************
            SET FULLSCREEN
        */
        "setFullScreen": function(map)
        {
            // CREATE FULLSCREEN CONTROLER AND ADD IT
            map.addControl(
                L.control.fullscreen(
                {
                    title: '' + this.getLabel(this.$root, "MAP_ENTER_FS") + '',
                    titleCancel: '' + this.getLabel(this.$root, "MAP_EXIT_FS") + ''
                })
            );

            // EVENTS FULLSCREEN TOGGLIN
            map.on('enterFullscreen', this.enterFullScreen);
            map.on('exitFullscreen', this.exitFullScreen);
        },
        /*  **************************************************************************************************************************************************
            EVENT - ENTER FULLSCREEN
        */
        "enterFullScreen": function(e)
        {
            _Qs(".fullscreen-icon")._addClass("full");
        },
        /*  **************************************************************************************************************************************************
            EVENT - EXIT FULLSCREEN
        */
        "exitFullScreen": function(e)
        {
            _Qs(".fullscreen-icon")._removeClass("full");

            this.exitFullScreenTotaly = true;
            var that = this;

            setTimeout(
                function(t)
                {
                    t.map_fit();
                    t.exitFullScreenTotaly = false;

                    //  IN CASE MAP POPUP EDIT IS OPEN AND THE FULLSCREEN IS EXITED BY PRESSING THE BIG CROSS BUTTON WE REMOVE IT
                    //
                    t.modalUpdate = false;

                }, 100, that
            );
        }
    }
};