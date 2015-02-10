"use strict";

angular.module("teoti.services").factory("Utils", [
    function () {
        return {
            getObjectDifference: function (oldObject, newObject) {
                var difference = {},
                    change = false;

                angular.forEach(newObject, function (value, key) {
                    var oldValue = oldObject[key];

                    if (value !== oldValue) {
                        difference[key] = value;
                        change = true;
                    }
                });

                if (change) {
                    return difference;
                } else {
                    return null;
                }
            }
        };
    }
]);