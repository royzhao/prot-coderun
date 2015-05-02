/**
 * Master Controller
 */

angular.module('Show')
    .controller('MasterCtrl', ['$scope', '$cookieStore','SessionService', MasterCtrl]);

function MasterCtrl($scope, $cookieStore,SessionService) {
    //用户信息
    $scope.user = SessionService.getUserinfo();
    $scope.logout = SessionService.logout();
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
}