"use strict";

var angular = require("angular");
var $ = require("jquery");
require("sceditor/src/jquery.sceditor");
require("sceditor/src/plugins/bbcode");
var stylePath = require("../css/editor-theme.css");

module.exports = angular.module("teoti.bbcode").directive("tEditor", [
    "$document", "Events", "$timeout",
    function ($document, Events, $timeout) {
        function injectCSS (id, href) {
            var link = angular.element("<link href=\""+href+"\" rel=\"stylesheet\" type=\"text/css\" media=\"all\" id=\""+id+"\">")
            $document.find("head").append(link);
            return link;
        }

        function link (scope, element) {
            var editor;
            var link;

            function init () {
                //inject the CSS if the ID doesn't exist
                var id = scope.themeId || "editorTheme";
                if (!$document[0].getElementById(id)) {
                    link  = injectCSS(id, stylePath);
                }

                configure();
                initEditor();
                initScopeEvents();
                initScopeWatchers();
            }

            function configure () {
                $.sceditor.plugins.bbcode.bbcode
                    .set("list", {
                        html: function(element, attrs, content) {
                            var type = (attrs.defaultattr === '1' ? 'ol' : 'ul');

                            return '<' + type + '>' + content + '</' + type + '>';
                        },
                        breakAfter: false
                    })
                    .set("ul", { format: function($elm, content) { return '[list]' + content +'[/list]'; }})
                    .set("ol", { format: function($elm, content) { return '[list=1]' + content +'[/list]'; }})
                    .set("li", { format: function($elm, content) { return '[*]' + content; }})
                    .set("*", { excludeClosing: true, isInline: false });

                $.sceditor.command
                    .set("bulletlist", { txtExec: ["[list]\n[*]", "\n[/list]"] })
                    .set("orderedlist", { txtExec: ["[list=1]\n[*]", "\n[/list]"] });
            }

            function initScopeEvents() {
                scope.$on("$destroy", function () {
                    editor.destroy();
                    link.remove();
                });

                scope.$on(Events.WINDOW_RESIZE, setEditorSize);
            }

            function initScopeWatchers () {
                scope.$watch("update", function (update) {
                    if (!update) { return; }
                    scope.update = false;
                    editor.val(scope.model);
                });
            }

            function initEditor () {
                var toolbar = scope.toolbar || 'source|bold,italic,underline|font,size,color,removeformat|' +
                    'bulletlist,orderedlist|code,quote|image,link,unlink';
                element.sceditor({ plugins: "bbcode", style: stylePath, resizeEnabled: false, toolbar: toolbar });

                editor = element.sceditor("instance");
                editor.bind("keyup", function (ev, instance) {
                    scope.$apply(function () {
                        scope.model = editor.val();
                    });
                });

                $timeout(setEditorSize);
            }

            function setEditorSize () {
                editor.width(element.parent().width());
                editor.height(element.height());
            }

            init();
        }

        return {
            scope: {
                themeId: "=?tEditorThemeId",
                model: "=tEditorModel",
                update: "=?tEditorUpdate",
                button: "=?toolbar"
            },
            link: link,
            restrict: "A"
        };
    }
]);