/**
 * Created by zpl on 15-2-10.
 */
angular.module('Editor')
    .controller('ShowCtrl', ['$scope','$cookieStore',  '$stateParams', ShowCtrl]);

function ShowCtrl($scope,$stateParams,$cookieStore){
    $scope.codeid = $stateParams.codeid;
    $scope.stepid = $stateParams.stepid;

    console.log($scope.codeid);
    console.log($scope.stepid);

    /**
    * Sidebar Toggle & Cookie Control
    */
    var mobileView = 1024;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };
    window.onresize = function() {
        $scope.$apply();
    };
    $scope.runCode = function(){
        alert('点击这个运行代码,代码结果输出到下面的控制台!如果是网络程序,那么输出访问地址!hhh');
    }

}