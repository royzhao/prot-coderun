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
    $scope.basics = ['ubuntu','centos','coreos'];
    $scope.sType = 'golang';
    $scope.sBasic = 'ubuntu';
    $scope.test = $resource('/dockerapi/images/list/:id', {id: 1 }, {}).query();
    $scope.newTerminal = function() {
        alert($scope.test[0].ImageName);
    }
}
