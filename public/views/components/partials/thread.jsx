/* jshint quotmark: false */
"use strict";

var React = require("react"),
    template = require("../../partials/thread.jsx");

module.exports = React.createClass({
    render: function () {
        this.render = template.bind(this);
        return this.render();
    }
});