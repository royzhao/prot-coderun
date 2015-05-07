/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$sce','$scope', '$cookieStore','SessionService','Message', MasterCtrl]);

function MasterCtrl($sce,$scope, $cookieStore,SessionService,Message) {
    //用户信息
    $scope.user = SessionService.getUserinfo();


    Message.query({action:'query',id:$scope.user.userid}).$promise.then(function(data){
        for(var i=0;i<data.length;i++){
            data[i].Content= $sce.trustAsHtml(data[i].Content);
        }
        $scope.messages = data;
    });

    $scope.logout = function(){
        SessionService.logout();
    }
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