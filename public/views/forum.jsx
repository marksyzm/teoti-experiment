/* jshint unused: false, quotmark: false */
"use strict";

var React = require("react");

module.exports = function () {
    return (
        <section className="forum">
            <div data-ng-if="!error">
                <h1 data-ng-bind="forum.title">{this.props.forum.title}</h1>
                <div className="paginate">
                    <a href="/{{forum.slug}}/?page={{threads.pagination.previous}}" data-ng-show="threads.pagination.hasPrevPage">Previous</a>
                    <a href="/{{forum.slug}}/?page={{threads.pagination.next}}" data-ng-show="threads.pagination.hasNextPage">Next</a>
                </div>
                <div data-threads="threads">
                {this.props.children}
                </div>
                <div className="paginate">
                    <a href="/{{forum.slug}}/?page={{threads.pagination.previous}}" data-ng-show="threads.pagination.hasPrevPage">Previous</a>
                    <a href="/{{forum.slug}}/?page={{threads.pagination.next}}" data-ng-show="threads.pagination.hasNextPage">Next</a>
                </div>
            </div>
            <div data-ng-if="error" data-ng-include="'/view/error'"></div>
        </section>
    );
};