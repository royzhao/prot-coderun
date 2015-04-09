/**
 * Created by zpl on 15-4-9.
 */
angular
    .module('RDash')
    .directive('steps', ['$compile',stepByStep]);
function stepByStep($compile){
    return {
        restrict : 'A',
        link : function(scope, element, attrs) {
            element.wrapInner('<div class="steps-wrapper">')
            var steps = element.children('.steps-wrapper').steps(scope.stepconfig);
            $compile(steps)(scope)
            scope.form = steps

        }
    }
}