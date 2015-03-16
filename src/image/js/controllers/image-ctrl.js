/**
 * Created by ZJY on 15-2-4.
 */
angular.module('Image')
    .controller('ImageCtrl', ['$scope', '$cookieStore','$resource', ImageCtrl]);

function ImageCtrl($scope,$cookieStore,$resource) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    //var codeid = $stateParams.codeid;
    //console.log('codeid:'+codeid);
    //mock data
    $scope.treedata =
        [
            { "label" : "c++", "id" : "role1", "children" : [] },
            { "label" : "python", "id" : "role2", "children" : [] },
            { "label" : "golang", "id" : "role3", "children" : [] }
        ];
    var test = $resource('/dockerapi/images/:id/:action', {id: '@id',action:'list' }, {});
    var params;
    $scope.basics = test.query({id:1}, function() {
        params = $scope.basics;
    });
    $scope.sBasic = 'ubuntu';
    $scope.newTerminal = function() {
        //alert($scope.basics[0].ImageName);
        var a = $resource('/dockerapi/images/star', {}, {'save': { isArray: false, method: 'POST' }});
        a.save({id: 1, uid: 1}, params).$promise.then(function(c){
        }, function(err){
        });
        //Container.save({count: $scope.count, pull: $scope.pull}, params).$promise.then(function(c){
        //    $location.path("/containers");
        //}, function(err){
        //    $scope.hideLoader();
        //    $scope.error = err.data;
        //    return false;
        //});
    }
}
