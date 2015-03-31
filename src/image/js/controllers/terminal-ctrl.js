/**
 * Created by Administrator on 2015/3/26.
 */
angular.module('Image')
    .controller('TerminalCtrl', ['$scope', '$cookieStore','$stateParams', '$location', TerminalCtrl]);

function TerminalCtrl($scope,$cookieStore,$stateParams,$location) {
    $scope.apiUrl = $location.host()+ ":8080/user/";
    //alert($scope.apiUrl);
    $scope.uid = 1;
    $scope.baseimage = $stateParams.base;

}
