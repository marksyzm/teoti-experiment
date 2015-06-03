/* jshint quotmark: false */
"use strict";

var React = require("react");
var Default = require("./components/layouts/default");
var Forum = require("./components/forum");
var Threads = require("./components/partials/threads");

module.exports = React.createClass({
    render: function () {
        if (this.props.partial) {
            return (
                <Forum forum={{}} threads={{}} partial={this.props.partial} />
            );
        }
        return (
            <Default>
                <Forum forum={this.props.forum} threads={this.props.threads} partial={this.props.partial}>
                    <Threads threads={this.props.threads.items} />
                </Forum>
            </Default>
        );
    }
});