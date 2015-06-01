/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['PictureService','CodeAPIService','$sce','$scope', '$cookieStore','SessionService','Message', 'ImagehubService','Images',MasterCtrl]);

function MasterCtrl(PictureService,CodeAPIService,$sce,$scope, $cookieStore,SessionService,Message,ImagehubService,Images) {
    //用户信息
    $scope.user = SessionService.getUserinfo();
    $scope.user_pic = PictureService.ConvertKey2Src($scope.user.avatar,40,40);

    $scope.alertData = [];
    //$scope.list = [];
    Message.query({action:'query',id:$scope.user.userid}).$promise.then(function(data){
        for(var i=0;i<data.length;i++){
            //$scope.list.push(data[i]);
            data[i].Content= $sce.trustAsHtml(data[i].Content);
            if(data[i].Level == 2) {
                $scope.alertData.push(data[i]);
            }
        }
        $scope.messages = data;
    });

    Images.query({id: $scope.user.userid, action: 'list'}).$promise.then(function(data){
        $scope.imagedata = data;
        $scope.imagenum = $scope.imagedata.length;
        for (var i=0;i<$scope.imagedata.length;i++ ) {
            $scope.forknum += $scope.imagedata[i].Fork;
        }
    });

    ImagehubService.getHotImages(1,5,"",function(err,data){
        if(data){
            if(data.length == 0){
                $scope.flag.msg = "暂时没有数据,您可以创建";
            }else{
                $scope.imagelist = data.list;
            }
        }else{
            $scope.flag.msg = "加载失败！";
        }
    });

    $scope.logout = function(){
        SessionService.logout();
    }

    $scope.read = function(i) {
        //alert(i);
        //alert($scope.messages[i].Id);
        Message.read({action:'read',id:$scope.messages[i].Id}).$promise.then(function(data){
            //$scope.messages.splice(i,1);
        })
        //$location.href = href;
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