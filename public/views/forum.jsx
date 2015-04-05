/* jshint unused: false, quotmark: false */
"use strict";

var React = require("react");

module.exports = function () {
    return (
        <section className="forum">
            <h1 data-ng-bind="forum.title">{this.props.forum.title}</h1>
            <div className="paginate">
                <a data-ng-href="/{{forum.slug}}/?page={{page.previous}}" data-ng-show="hasPrevious">Previous</a>
                <a data-ng-href="/{{forum.slug}}/?page={{page.next}}" data-ng-show="hasNext">Next</a>
            </div>
            <div data-threads="threads">
                {this.props.children}
            </div>
            <div className="paginate">
                <a data-ng-href="/{{forum.slug}}/?page={{page.previous}}" data-ng-show="hasPrevious">Previous</a>
                <a data-ng-href="/{{forum.slug}}/?page={{page.next}}" data-ng-show="hasNext">Next</a>
            </div>
        </section>
    );
};