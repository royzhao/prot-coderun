/**
 * Created by Administrator on 2015/4/29.
 */
angular.module('RDash')
    .directive('ngEnter', function ($timeout) {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    //scope.$apply(function (){
                    //    scope.$eval(attrs.ngEnter);
                    //});
                    $timeout(function() {
                        // We must reevaluate the value in case it was changed by a subsequent
                        // watch handler in the digest.
                        scope.$eval(attrs.ngEnter);
                    }, 0, false);
                    event.preventDefault();
                }
            });
        };
    });