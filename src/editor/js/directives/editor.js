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
                element:tmps,
                toolbar:[
                    {name: 'bold'},
                    {name: 'italic'},
                    '|',

                    {name: 'quote'},
                    {name: 'unordered-list'},
                    {name: 'ordered-list'},
                    '|',

                    {name: 'link'},
                    {name: 'image'},
                    '|',

                    {name: 'info', action: 'http://lab.lepture.com/editor/markdown'},
                    {name: 'preview'},
                    {name: 'switchit',className: 'ttt glyphicon glyphicon-arrow-left',action:scope.switchIt}
                ]
            })
            scope.editor = editor;

        }
    }
}