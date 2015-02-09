"use strict";

var angular = require("angular");
var $ = require("jquery");
require("jquery-ui/autocomplete");

angular.module("teoti.directives").directive("autocomplete", [
    "$http",
    function ($http) {
        function linker (scope, element, attrs) {
            $(element[0]).autocomplete({
                source: function( request, res ) {
                    var params = {};
                    params[attrs.filter || "filter"] = request.term;

                    $http.get(attrs.url, { params: params })
                        .then(function (response) {
                            var items = response.data;

                            if (!items) {
                                return;
                            }

                            var parsedItems = [];
                            angular.forEach(items, function (item) {
                                parsedItems.push({
                                    label: item[attrs.item || "label"],
                                    value: item[attrs.value || "value"],
                                    id: item[attrs.id || "id"]
                                });
                            });

                            res(parsedItems);
                        });
                },
                minLength: 2,
                select: function (event, ui) {
                    $http.get(attrs.url+"/"+ui.item.id)
                        .then(function (response) {
                            scope.output = response.data;
                        });
                }
            });
        }

        return {
            restrict: "A",
            link: linker,
            scope: {
                output: "="
            }
        };
    }
]);