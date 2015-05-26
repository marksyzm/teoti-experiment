"use strict";

module.exports = {

    isYouTube: function (media) {
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11,})(?:\S+)?$/;
        return media.match(p) ? RegExp.$1 : false;
    },

    getYouTubeCodedUrl: function (code) {
        return { type: "youtube", url: "https://www.youtube.com/embed/"+code };
    },

    isVine: function (media) {
        var p = /^(?:https?:\/\/)?(?:www\.)?vine.co\/v\/([a-z0-9]{10,})$/i;
        return media.match(p) ? RegExp.$1 : false;
    },

    getVineCodedUrl: function (code) {
        return { type: "vine", url: "https://vine.co/v/"+code+"/embed/simple" };
    }
};