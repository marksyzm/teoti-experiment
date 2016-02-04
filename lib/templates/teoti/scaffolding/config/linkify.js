var angular = require('angular');

module.exports = angular.module('teoti.scaffolding').config([
  'linkifyProvider',
  function (linkifyProvider) {
    linkifyProvider.setOptions({
      formatHref: function (value, type) {
        if (type === 'hashtag') {
          value = 'search?q=' + encodeURIComponent(value);
        }
        if (type === 'mention') {
          value = 'member/' + value.substring(1);
        }
        return value;
      }
    });
  }
]);