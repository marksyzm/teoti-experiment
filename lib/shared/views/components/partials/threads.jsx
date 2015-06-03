/* jshint quotmark: false */
"use strict";

var React = require("react");
var _ = require("lodash");
var config = require("../../../config/browserified");
var template = require("../../templates/"+config.template+"/partials/threads.jsx");
var Thread = require("./thread.jsx");

module.exports = React.createClass({

    getThreads: function () {
        return _.map(this.props.threads, function (thread) {
            return <Thread thread={thread} scope={this.props.scope} key={thread.created} />;
        }, this);
    },

    render: function () {
        this.render = template.bind(this);
        return this.render();
    }
});