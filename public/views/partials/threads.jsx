/* jshint unused: false, quotmark: false */
"use strict";

var React = require("react/addons"),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = function () {
    return (
        <ReactCSSTransitionGroup component="ul" className="threads" transitionName="threadToggle">
            {this.getThreads(this.props.threads)}
        </ReactCSSTransitionGroup>
    );
};