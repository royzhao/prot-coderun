/**
 * Created by zpl on 15-5-19.
 */
HeaderCtrl

angular
    .module('Editor')
    .controller('HeaderCtrl', ['$scope','SessionService', HeaderCtrl]);

function HeaderCtrl($scope,SessionService){

    $scope.flag = {}
    $scope.flag.loged = false;
    if(SessionService.isLogin()== true) {
        $scope.flag.loged = true;
        $scope.user = SessionService.getUserinfo();
    }

}