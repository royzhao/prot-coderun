/**
 * Created by zpl on 15-2-2.
 * 我的代码
 */
angular
    .module('RDash')
    .controller('MyCodeCtrl', ['$scope','MyCodeService','$localStorage', MyCodeCtrl]);

function MyCodeCtrl($scope,MyCodeService,$localStorage) {
    $scope.$storage = $localStorage.$default({
        x: 42
    });
    //$scope.codedata = CodeAPIService.one('code',1).getList();
    $scope.codedata = [];

    MyCodeService.getMyCode(function(data){
        $scope.codedata = data;
    });
    console.log($scope.codedata)
    $scope.newCode = function(){
        alert('点击这个按钮就可以新建一个代码!代码页面没写,意思意思');
    }
}
