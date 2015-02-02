/**
 * Created by zpl on 15-2-2.
 */
angular.module('Editor')
    .controller('EditorCtrl', ['$scope', '$cookieStore', EditorCtrl]);

function EditorCtrl($scope,$cookieStore) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    //var codeid = $stateParams.codeid;
    //console.log('codeid:'+codeid);
    //mock data
    $scope.treedata =
        [
            { "label" : "代码文件夹1", "id" : "role1", "children" : [
                { "label" : "代码文件1-1", "id" : "role11", "children" : [] },
                { "label" : "代码文件夹1-1", "id" : "role12", "children" : [
                    { "label" : "代码文件夹2-1", "id" : "role121", "children" : [
                        { "label" : "代码文件夹2-1-1", "id" : "role1211", "children" : [] },
                        { "label" : "代码文件夹2-1-2", "id" : "role1212", "children" : [] }
                    ]}
                ]}
            ]},
            { "label" : "hello.c", "id" : "role2", "children" : [] },
            { "label" : "world.c", "id" : "role3", "children" : [] }
        ];
    $scope.$watch( 'abc.currentNode', function( newObj, oldObj ) {
        if( $scope.abc && angular.isObject($scope.abc.currentNode) ) {
            console.log( 'Node Selected!!' );
            console.log( $scope.abc.currentNode );
        }
    }, false);

    $scope.code = {
        'codeid':1,
        'codename':'测试专用4',
        'type':1,
        'imageid':2,
        'typename':'本地程序',
        'imagename':'go语言测试'
    };

    $scope.runCode = function(){
        alert('点击这个运行代码,代码结果输出到下面的控制台!如果是网络程序,那么输出访问地址!');
    }

}