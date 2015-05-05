/**
 * Created by Administrator on 2015/3/18.
 */
angular.module('Image')
    .controller('EditCtrl', ['$scope', '$cookieStore','$stateParams','Images', 'Image', '$location', 'sharedProperties','$cookies','loginService', EditCtrl]);

function EditCtrl($scope,$cookieStore,$stateParams,Images,Image,$location,sharedProperties,$cookies,loginService) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    loginService.login();
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