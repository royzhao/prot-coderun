/**
 * Created by zpl on 15-5-19.
 */
HeaderCtrl

angular
    .module('Editor')
    .controller('HeaderCtrl', ['PictureService','$scope','SessionService', HeaderCtrl]);

function HeaderCtrl(PictureService,$scope,SessionService){

    $scope.flag = {}
    $scope.flag.loged = false;
    if(SessionService.isLogin()== true) {
        $scope.flag.loged = true;
        $scope.user = SessionService.getUserinfo();
        $scope.user_avatar = PictureService.ConvertKey2Src($scope.user.avatar,40,40);

    }

}