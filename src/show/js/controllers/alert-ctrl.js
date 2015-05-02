/**
 * Alerts Controller
 */

angular
    .module('Show')
    .controller('AlertsCtrl', ['$scope','$rootScope', AlertsCtrl]);

function AlertsCtrl($scope,$rootScope) {
    //$scope.alerts = [{
    //    type: 'success',
    //    msg: '欢迎来到码上跑!你可以随时随地运行你的代码,祝你玩的愉快!'
    //}, {
    //    type: 'danger',
    //    msg: '你有一个镜像被fork了!.'
    //}];
    //AlertOnceService.getAlert(function(data){
    //     $scope.alerts = data;
    //});
    $scope.alerts = [];
    $rootScope.$watch('data',function(){
        $scope.alerts = $rootScope.data;
    });


    $scope.addAlert = function() {
        $scope.alerts.push({
            msg: 'Another alert!'
        });
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
}