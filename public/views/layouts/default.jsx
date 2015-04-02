/* jshint unused: false, quotmark: false */
"use strict";

var React = require("react"),
    PageHeader = require("../components/partials/page-header");

module.exports = function () {
    return (
        <html id="ng-app" data-ng-app="teoti" data-html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width" />
                <base href="/" />
                <title data-ng-bind="(pageTitle ? pageTitle+' | ' : '')+ 'TEOTI - The End Of The Internet'">
                    TEOTI - The End Of The Internet
                </title>
                <link type="text/css" href="css/style.css" rel="stylesheet" />
            </head>
            <body>
                <PageHeader account={this.props.account} />
                <main data-ng-view>
                    {this.props.children}
                </main>
                {/*<script src="js/app.js"></script>*/}
            </body>
        </html>
    );
};
