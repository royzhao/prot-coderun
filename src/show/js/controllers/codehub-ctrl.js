/**
 * Created by zpl on 15-2-2.
 * code hub
 */

angular
    .module('Show')
    .controller('MyCodeHubCtrl', ['$scope','MyCodeService', MyCodeHubCtrl]);

function MyCodeHubCtrl($scope,MyCodeService) {
    $scope.flag = {};
    $scope.flag.is_show = true;
    $scope.flag.msg = "正在加载。。。";
    MyCodeService.getHotCodes(function(err,data){
        if(data){
            if(data.length == 0){
                $scope.flag.msg = "暂时没有数据。。您可以创建";
            }else{
                $scope.codedata = data;
                $scope.flag.is_show = false;
            }

        }else{
            $scope.flag.msg = "加载失败。。。！";
        }
    });
}
