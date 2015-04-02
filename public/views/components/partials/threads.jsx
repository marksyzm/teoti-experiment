/* jshint quotmark: false */
"use strict";

var React = require("react"),
    _ = require("lodash"),
    template = require("../../partials/threads"),
    Thread = require("./thread");

module.exports = React.createClass({
    getThreads: function () {
        return _.map(this.props.threads, function (thread) {
            return <Thread thread={thread} key={thread._id} />;
        });
    },
    render: function () {
        this.render = template.bind(this);
        return this.render();
    }
});