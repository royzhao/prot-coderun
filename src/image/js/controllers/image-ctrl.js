/**
 * Created by ZJY on 15-2-4.
 */
angular.module('Image')
    .controller('ImageCtrl', ['SessionService','$scope', '$cookies','$stateParams','Images','Image', '$location','sharedProperties','loginService','$window', ImageCtrl]);

function ImageCtrl(SessionService,$scope,$cookies,$stateParams,Images,Image,$location,sharedProperties,loginService,$window) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    //var codeid = $stateParams.codeid;
    //console.log('codeid:'+codeid);
    //mock data
    //loginService.isLogin();
    loginService.login();
    $scope.user = SessionService.getUserinfo();
    var adminid = 1;
    var currentid = parseInt($cookies.get("u_id"));
    var username = $cookies.get("u_name");
    $scope.username = username;
    $scope.treedata = [];
    Images.query({id: currentid, action: 'list'}).$promise.then(function(data){
        var treedata = data;
        for (var i=0;i<treedata.length;i++ ) {
            $scope.treedata.push({
                "label": treedata[i].ImageName,
                "id": treedata[i].ImageId,
                "children": []
            })
        }
    });
    $scope.formData = {};
    //$scope.treedata =
    //    [
    //        { "label" : "c++", "id" : "role1", "children" : [] },
    //        { "label" : "python", "id" : "role2", "children" : [] },
    //        { "label" : "golang", "id" : "role3", "children" : [] }
    //    ];
    Images.query({id: adminid, action: 'list'}).$promise.then(function(data){
        $scope.basics = data;
        $scope.formData.bm = $scope.basics[0];
        //$scope.bm = $scope.basics[0].ImageName;
        //alert( $scope.basics[0].ImageName);
    });
    //var test = $resource('/dockerapi/images/:id/:action', {id: '@id',action:'list' }, {});
    //var params;
    //$scope.basics = test.query({id:1}, function() {
    //    params = $scope.basics;
    //});
    //$scope.sBasic = 'ubuntu';
    //if ($stateParams.id == undefined) {
    //    alert('ok');
    //};
    $scope.processForm = function() {
        //alert($scope.basics[0].ImageName);
        //var a = $resource('/dockerapi/images/star', {}, {'save': { isArray: false, method: 'POST' }});
        //a.save({id: 1, uid: 1}, params).$promise.then(function(c){
        //}, function(err){
        //});
        var newimage = {
            UserId:currentid,
            ImageName:username + "-" + $scope.formData.imageName,
            BaseImage:$scope.formData.bm.ImageName,
            Tag:1,
            Descrip:$scope.formData.description
        };
        sharedProperties.createImages(newimage);
        //alert($scope.formData.imageName);
        //alert($scope.formData.description);
        //var c.Bimage = "ubuntu";
        Image.save({action:'create'},newimage).$promise.then(function(c){
            //$location.path("/");
            //var c={Bimage:"ubuntu"};
            $location.path("/term/"+ c.Bimage);
            //alert(c.Bimage);
        }, function(err){
            //$scope.hideLoader();
            //$scope.error = err.data;
            alert("failure");
            return false;
        });
    }
}
