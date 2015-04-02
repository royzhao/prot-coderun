/**
 * Created by Administrator on 2015/3/26.
 */
angular.module('Image')
    .controller('TerminalCtrl', ['$scope', '$cookieStore','$stateParams', '$location','sharedProperties','Image', TerminalCtrl]);

function TerminalCtrl($scope,$cookieStore,$stateParams,$location,sharedProperties,Image) {
    $scope.apiUrl = $location.host()+ ":8080/user/";
    //alert($scope.apiUrl);
    $scope.uid = 1;
    $scope.baseimage = $stateParams.base;
    $scope.commit = function() {
        Image.commit({action:'commit'},$scope.baseimage).$promise.then(function(c){
            //$location.path("/term/"+ $scope.basic.ImageName);
            $window.location.href = $location.host();
        }, function(err){
            //$scope.hideLoader();
            //$scope.error = err.data;
            console.log(err);
            alert("failure");
            return false;
        });
    }

}
