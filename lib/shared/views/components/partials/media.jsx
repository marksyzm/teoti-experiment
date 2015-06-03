/* jshint quotmark: false */
"use strict";

var React = require("react");
var config = require("../../../config/browserified");
var template = require("../../templates/"+config.template+"/partials/thread.jsx");
var mediaString = require("../../../string/media");

module.exports = React.createClass({
    getType: function (media) {
        var code;
        switch (true) {
            case code = mediaString.isYouTube(media):
                return mediaString.getYouTubeCodedUrl(code);
            case code = mediaString.isVine(media):
                return mediaString.getVineCodedUrl(code);
        }
    },

    render: function () {
        this.render = template.bind(this);
        return this.render();
    }
});