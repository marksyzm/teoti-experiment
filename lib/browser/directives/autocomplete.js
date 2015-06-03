"use strict";

var angular = require("angular");
require("jquery-ui/autocomplete");

angular.module("teoti.directives").directive("autocomplete", [
    "$http",
    function ($http) {
        function linker (scope, element, attrs) {
            element.find("input[type=text]").autocomplete({
                source: function( request, res ) {
                    var params = {};
                    params[attrs.filter || "filter"] = request.term;

                    $http.get(attrs.url, { params: params })
                        .then(function (response) {
                            var items = response.data;

                            if (!items) { return; }

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
                appendTo: element,
                select: function (event, ui) {
                    scope.$apply(function () {
                        $http.get(attrs.url+"/"+ui.item.id)
                            .then(function (response) {
                                scope.$emit("autocomplete-select", response.data, attrs.url);
                            });
                    });
                }
            });
        }

        return {
            restrict: "A",
            link: linker,
            scope: {}
        };
    }
]);