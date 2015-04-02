/* jshint unused: false, quotmark: false */
"use strict";

var React = require("react");

module.exports = function () {
    return (
        <ul className="threads">
            {this.getThreads(this.props.threads)}
        </ul>
    );
};