/**
 * Created by Administrator on 2015/3/18.
 */
angular.module('Image')
    .controller('EditCtrl', ['$scope', '$cookieStore','$stateParams','Images', 'EImage', '$location', EditCtrl]);

function EditCtrl($scope,$cookieStore,$stateParams,Images,EImage,$location) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var currentid = 1;
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
        EImage.edit({},$scope.basic).$promise.then(function(c){
            $location.path("/term/"+ $scope.basic.ImageName);
        }, function(err){
            //$scope.hideLoader();
            //$scope.error = err.data;
            alert("failure");
            return false;
        });
    }
}