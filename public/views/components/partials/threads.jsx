/* jshint quotmark: false */
"use strict";

var React = require("react"),
    _ = require("lodash"),
    template = require("../../partials/threads.jsx"),
    Thread = require("./thread.jsx");

module.exports = React.createClass({

    getThreads: function () {
        return _.map(this.props.threads, function (thread) {
            return <Thread thread={thread} scope={this.props.scope} key={thread._id} />;
        }, this);
    },

    render: function () {
        this.render = template.bind(this);
        return this.render();
    }
});