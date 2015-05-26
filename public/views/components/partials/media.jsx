/* jshint quotmark: false */
"use strict";

var React = require("react"),
    template = require("../../partials/thread.jsx"),
    mediaString = require("../../../../lib/shared/string/media");

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