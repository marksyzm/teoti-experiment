/* jshint quotmark: false */
"use strict";

var React = require("react");
var config = require("../../../config/browserified");
var template = require("../../templates/"+config.template+"/layouts/default");

module.exports = React.createClass({
    render: function () {
        this.render = template.bind(this);
        return this.render();
    }
});