/**
 * Master Controller
 */

angular.module('Show')
    .controller('MasterCtrl', ['PictureService','$scope', '$cookieStore','SessionService', MasterCtrl]);

function MasterCtrl(PictureService,$scope, $cookieStore,SessionService) {

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
        $scope.user_avatar = PictureService.ConvertKey2Src($scope.user.avatar,40,40);
    }else{
        $scope.flag.loged = false;
    }
}