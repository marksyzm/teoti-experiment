/* jshint unused: false, quotmark: false */
"use strict";
var React = require("react"),
    svgSearch = require("./svg/search");

module.exports = (
    <form name="formSearch" noValidate data-ng-submit="submit()">
        <input type="text" placeholder="Search"
            data-ng-model="search"
            data-ng-init="setForm(formSearch)"
            data-focus-element="searchActive"
            data-ng-class="{ searchActive: searchActive }" />
        <button data-ng-class="{ searchActive: searchActive }">{svgSearch} Search</button>
    </form>
);
