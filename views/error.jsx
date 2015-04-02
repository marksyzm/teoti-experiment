/* jshint quotmark: false */
"use strict";

var React = require("react"),
    Default = require("../public/views/components/layouts/default");

module.exports = React.createClass({
    render: function () {
        var account = {};
        return (
            <Default account={account}>
                <h1>ERROR</h1>
            </Default>
        );
    }
});