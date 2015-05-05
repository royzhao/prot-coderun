/**
 * Master Controller
 */

angular.module('Show')
    .controller('MasterCtrl', ['$scope', '$cookieStore','SessionService', MasterCtrl]);

function MasterCtrl($scope, $cookieStore,SessionService) {

    //func
    $scope.logout = function(){
        SessionService.logout();
    }
    //init
    $scope.flag = {};
    $scope.flag.loged = false;
    if(SessionService.isLogin() == true){
        $scope.user = SessionService.getUserinfo();
        $scope.flag.loged = true;
    }else{
        $scope.flag.loged = false;
    }
}