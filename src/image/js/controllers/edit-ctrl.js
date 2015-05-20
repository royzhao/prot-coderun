/**
 * Created by Administrator on 2015/3/18.
 */
angular.module('Image')
    .controller('EditCtrl', ['SessionService','$scope', '$cookieStore','$stateParams','Images', 'Image', '$location', 'sharedProperties','$cookies','loginService', EditCtrl]);

function EditCtrl(SessionService,$scope,$cookieStore,$stateParams,Images,Image,$location,sharedProperties,$cookies,loginService) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    $scope.flag = {}
    $scope.flag.loged = false;
    if(SessionService.isLogin()== true) {
        $scope.flag.loged = true;
        $scope.user = SessionService.getUserinfo();
    }

    //loginService.login();
    $scope.user = SessionService.getUserinfo();
    var currentid = parseInt($cookies.get("u_id"));
    $scope.treedata = [];
    Images.query({id: currentid, action: 'list'}).$promise.then(function (data) {
        var treedata = data;
        for (var i = 0; i < treedata.length; i++) {
            $scope.treedata.push({
                "label": treedata[i].ImageName,
                "id": treedata[i].ImageId,
                "children": []
            })
        }
    });
    Images.get({id: $stateParams.id, action: 'log'}).$promise.then(function (data) {
        $scope.basic = data;
    });
    $scope.processEdit = function () {
        //alert($scope.basic.Descrip);
        //alert($scope.basic.Fork)
        sharedProperties.editImages($scope.basic);
        $location.path("/term/"+ $scope.basic.ImageName);
        //Image.edit({action:'edit'},$scope.basic).$promise.then(function(c){
        //    $location.path("/term/"+ $scope.basic.ImageName+"/"+$scope.basic.Tag);
        //}, function(err){
        //    //$scope.hideLoader();
        //    //$scope.error = err.data;
        //    alert("failure");
        //    return false;
        //});
    }
}