/* jshint quotmark: false */
"use strict";

var React = require("react");
var Default = require("./components/layouts/default");
var ErrorComponent = require("./components/partials/error");

module.exports = React.createClass({
    render: function () {
        if (this.props.partial) {
            return (
                <ErrorComponent error={this.props.error} />
            );
        }

        return (
            <Default account={{}}>
                <ErrorComponent error={this.props.error} />
            </Default>
        );
    }
});