/**
 * Created by ZJY on 15-2-4.
 */
angular.module('Image',['ngResource'])
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
    $scope.basics = ['ubuntu','centos','coreos'];
    $scope.sType = 'golang';
    $scope.sBasic = 'ubuntu';
    $scope.test;
    $scope.newTerminal = function() {
        alert($scope.test);
    }
    $scope.test = $resource('http://121.41.89.212:9000/dockerapi/images/ubuntu/json', {}, {}).query();
}
