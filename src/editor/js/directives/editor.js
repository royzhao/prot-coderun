/**
 * Created by zpl on 15-4-13.
 */
angular
    .module('Editor')
    .directive('mdeditor', [md_editor]);
function md_editor(){
    return {
        restrict: 'EA',
        link : function(scope, element, attrs) {
            //element.wrapInner('<textarea class="md-text-editor">')
            var tmps = document.getElementById('md-text-editor')
            var editor = new Editor({
                element:tmps
            })
            scope.editor = editor;

        }
    }
}