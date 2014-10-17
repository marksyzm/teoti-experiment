require.config({

    paths: {
        lodash: "../components/lodash/dist/lodash",
        tweenmax: "../components/gsap/src/uncompressed/TweenMax",
        jquery: "../components/jquery/dist/jquery",
        jqueryui: "../components/jqueryui/jquery-ui",
        "jquery.gsap": "../components/gsap/src/uncompressed/jquery.gsap",
        "jqueryui-touchpunch": "../components/jquery-ui-touch-punch-improved/jquery.ui.touch-punch-improved",
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

        "jqueryui-touchpunch": {
            deps: [ "jquery", "jqueryui" ],
            exports: "jQuery"
        },

        "angular" : {
            exports : "angular",
            deps: ["jquery", "angular-file-upload-shim"]
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
