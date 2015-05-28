/* jshint unused: false, quotmark: false */
"use strict";

var React = require("react");

module.exports = function () {
    return (
        <article className="error">
            <h1 data-ng-bind="error.error || 'Error :('">Error :(</h1>
            <p data-ng-bind="error.message">{this.props.error ? this.props.error.message : "There was an issue displaying this page."}</p>
        </article>
    );
};