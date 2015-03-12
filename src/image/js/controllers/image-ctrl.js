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
    $scope.types = ['golang','web','java'];
    $scope.sType = 'golang';
    var test = $resource('/dockerapi/images/list/:id', {id: '@id' }, {});
    $scope.basics = test.query({id:1}, function() {});
    $scope.sBasic = 'ubuntu';
    $scope.newTerminal = function() {
        alert($scope.basics[0].ImageName);
        //Container.save({count: $scope.count, pull: $scope.pull}, params).$promise.then(function(c){
        //    $location.path("/containers");
        //}, function(err){
        //    $scope.hideLoader();
        //    $scope.error = err.data;
        //    return false;
        //});
    }
}
