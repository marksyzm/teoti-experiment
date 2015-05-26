/* jshint quotmark: false */
"use strict";

var React = require("react"),
    Default = require("../public/views/components/layouts/default"),
    ErrorComponent = require("../public/views/components/partials/error");

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