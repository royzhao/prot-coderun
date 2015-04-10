/**
 * Created by zpl on 15-4-9.
 */
angular
    .module('RDash')
    .directive('steps', ['$compile',stepByStep]);
function stepByStep($compile){
    return {
        restrict : 'A',
        //compile: function (tEl) {
        //    return function(scope, element, attrs) {
        //        //var stepsEl;
        //        //
        //        //element.wrapInner('<div class="steps-wrapper">');
        //        //element.children('.steps-wrapper').append(tEl.context.innerHTML);
        //        //var content = $compile(element.contents())(scope);
        //        //$timeout(function () {
        //        //    element.children('.steps-wrapper').steps(scope.stepconfig);
        //        //})
        //        element.wrapInner('<div class="steps-wrapper">')
        //        var steps = element.children('.steps-wrapper').steps(scope.stepconfig);
        //
        //        scope.form = $compile(steps)(scope)
        //    }
        //},
        link : function(scope, element, attrs) {
            element.wrapInner('<div class="steps-wrapper">')
            var steps = element.children('.steps-wrapper').steps(scope.stepconfig);

            scope.form = $compile(steps)(scope)

        }
    }
}