/* jshint quotmark: false */
"use strict";

var React = require("react");
var config = require("../../../config/browserified");
var template = require("../../templates/"+config.template+"/partials/thread.jsx");

module.exports = React.createClass({
    render: function () {
        this.render = template.bind(this);
        return this.render();
    }
});