/* jshint quotmark: false */
"use strict";

var React = require("react"),
    template = require("../../layouts/default");

module.exports = React.createClass({
    render: function () {
        this.render = template.bind(this);
        return this.render();
    }
});