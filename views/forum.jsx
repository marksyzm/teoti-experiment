/* jshint quotmark: false */
"use strict";

var React = require("react"),
    Default = require("../public/views/components/layouts/default"),
    Forum = require("../public/views/components/forum"),
    Threads = require("../public/views/components/partials/threads");

module.exports = React.createClass({
    render: function () {
        return (
            <Default account={this.props.account || {}}>
                <Forum forum={this.props.forum} threads={this.props.threads}>
                    <Threads threads={this.props.threads} />
                </Forum>
            </Default>
        );
    }
});