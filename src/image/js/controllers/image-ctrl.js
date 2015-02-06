/**
 * Created by ZJY on 15-2-4.
 */
angular.module('Image')
    .controller('ImageCtrl', ['$scope', '$cookieStore', ImageCtrl]);

function ImageCtrl($scope,$cookieStore) {
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
    $scope.newTerminal = function() {
        alert('这里使用tty.js');
    }

}