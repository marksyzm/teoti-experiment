require.config({

    paths: {
        lodash: "../components/lodash/dist/lodash",
        jquery: "../components/jquery/dist/jquery",
        jqueryui: "../components/jqueryui/jquery-ui",
        tweenmax: "../components/gsap/src/uncompressed/TweenMax",
        "jquery.gsap": "../components/gsap/src/uncompressed/jquery.gsap",
        "moment": "../components/moment/moment",
        "angular": "../components/angular/angular",
        "angular-file-upload-shim": "../components/ng-file-upload-shim/angular-file-upload-shim",
        "angular-file-upload": "../components/ng-file-upload/angular-file-upload",
        "angular-ui-router": "../components/angular-ui-router/release/angular-ui-router",
        "angular-mocks": "../components/angular-mocks/angular-mocks"
    },

    shim: {
        "jqueryui": {
            deps: [ "jquery" ],
            exports: "jQuery"
        },
        "jquery.gsap": {
            deps: [ "jquery", "tweenmax" ],
            exports: "jQuery.gsap"
        },

        "jqueryuitouchpunch": {
            deps: [ "jquery", "jqueryui" ],
            exports: "jQuery"
        },

        "d3": {
            exports: "d3"
        },

        "nvd3": {
            exports: "nv",
            deps: ["d3"]
        },

        "angular" : {
            exports : "angular",
            deps: ["jquery", "angular-file-upload-shim"]
        },

        "angular-translate" : {
            exports: "angular",
            deps: ["angular"]
        },

        "angular-file-upload": {
            exports: "angular",
            deps: [ "angular" ]
        },

        "angular-ui-router": {
            deps: ["angular"]
        },

        "angular-mocks": {
            deps: ["angular"],
            exports: "angular.mock"
        },

        "tweenmax": {
            exports: "TweenMax"
        },

        "config/component-loader": {
            deps: ["config/module-loader"]
        },

        "app": {
            deps: ["config/component-loader"]
        }
    }
});
