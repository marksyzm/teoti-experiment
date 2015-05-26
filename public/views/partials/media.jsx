/* jshint unused: false, quotmark: false */
"use strict";

var React = require("react");

module.exports = function () {
    var element = false,
        media = this.getType(this.props.url);

    switch (media.type) {
        case "youtube":
            element = (
                <iframe className={'media '+media.type} src={media.src} frameBorder="0" allowFullScreen />
            );
            break;
        case "vine":
            element = (
                <iframe className={'media '+media.type} src={media.src} frameBorder="0" allowFullScreen />
            );
            break;
        case "vimeo":
            element = (
                <iframe className={'media '+media.type} src={media.src} frameBorder="0" allowFullScreen />
            );
            break;
        case "gif":
            element = false;
            break;
    }

    return element;
};