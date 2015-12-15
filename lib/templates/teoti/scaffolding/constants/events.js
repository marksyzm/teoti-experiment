'use strict';

var angular = require('angular');

angular.module('teoti.scaffolding').constant('Events', {
    DOCUMENT_CLICK: 'document-click',
    DOCUMENT_SCROLL_DOWN: 'document-scroll-down',
    DOCUMENT_SCROLL_UP: 'document-scroll-up',
    WINDOW_RESIZE: 'window-resize',
    WINDOW_FOCUS: 'window-focus',
    WINDOW_BLUR: 'window-blur'
});