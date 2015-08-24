"use strict";

var angular = require("angular");

angular.module("teoti.directives").directive("media", [
    function () {
        function getType (media) {
            if (!media) { return; }
            var code;
            switch (true) {
                case code = isYouTube(media): return getYouTubeCodedUrl(code);
                case code = isVine(media): return getVineCodedUrl(code);
            }
        }

        function isYouTube (media) {
            var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11,})(?:\S+)?$/;
            return media.match(p) ? RegExp.$1 : false;
        }

        function getYouTubeCodedUrl (code) {
            return { type: "youtube", url: "https://www.youtube.com/embed/"+code };
        }

        function isVine (media) {
            var p = /^(?:https?:\/\/)?(?:www\.)?vine.co\/v\/([a-z0-9]{10,})$/i;
            return media.match(p) ? RegExp.$1 : false;
        }

        function getVineCodedUrl (code) {
            return { type: "vine", url: "https://vine.co/v/"+code+"/embed/simple" };
        }

        function linker (scope) {
            scope.media = getType(scope.url);
        }

        return {
            link: linker,
            templateUrl: "views/directives/media.html",
            restrict: "A",
            scope: {
                url: "="
            }
        };
    }
]);