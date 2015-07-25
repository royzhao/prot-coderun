/**
 * Created by Administrator on 2015/4/21.
 */
angular.module('Image')
    .directive('isUnique',['$http', function($http){
        var name;
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                //ctrl.$parsers.push(function(viewValue) {
                scope.$watch(attrs.ngModel, function (viewValue) {
                    //elm.bind('blur',function (evt) {
                    name = scope.username + '-' + viewValue;
                });
                elm.bind('blur',function(evt) {
                    $http({
                        method: 'GET',
                        url: '/api/images/' + name + '/verify'
                    }).success(function(data, status, headers, cfg) {
                        ctrl.$setValidity('unique', data.IsUnique);
                    }).error(function(data, status, headers, cfg) {
                        ctrl.$setValidity('unique', false);
                    });
                });
                //element.bind('focus', function(evt) {
                //    element.addClass(FOCUS_CLASS);
                //    scope.$apply(function() {ctrl.$focused = true;});
                //}).bind('blur', function(evt) {
                //    element.removeClass(FOCUS_CLASS);
                //    scope.$apply(function() {ctrl.$focused = false;});
                //});
            }
        };
    }])