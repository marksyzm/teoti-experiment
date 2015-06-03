/* jshint quotmark: false */
"use strict";

var config = require("../../../config/browserified");

var React = require("react");
var template = require("../../templates/"+config.template+"/partials/error.jsx");

module.exports = React.createClass({
    render: function () {
        this.render = template.bind(this);
        return this.render();
    }
});