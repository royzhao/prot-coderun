/**
 * Created by Administrator on 2015/3/26.
 */
angular.module('Image')
    .controller('TerminalCtrl', ['$scope', '$cookieStore','$stateParams', TerminalCtrl]);

function TerminalCtrl($scope,$cookieStore,$stateParams) {
    $scope.apiUrl = "http://localhost:8080/user/";
    $scope.uid = 1;
    $scope.baseimage = $stateParams.base;

}
