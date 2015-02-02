/**
 * Created by zpl on 15-2-2.
 * 我的镜像
 */

angular
    .module('RDash')
    .controller('MyImageCtrl', ['$scope', MyImageCtrl]);

function MyImageCtrl($scope) {
    var myimagelist = [
        {
            'imageid':2,
            'imagename':'go语言测试',
            'description':'描述镜像内容',
            'status':1
        },
        {
            'imageid':2,
            'imagename':'go语言测试',
            'description':'描述镜像内容',
            'status':1
        },
        {
            'imageid':2,
            'imagename':'go语言测试',
            'description':'描述镜像内容',
            'status':1
        },
        {
            'imageid':2,
            'imagename':'go语言测试',
            'description':'描述镜像内容',
            'status':1
        },
        {
            'imageid':2,
            'imagename':'go语言测试',
            'description':'描述镜像内容',
            'status':2
        },
    ];
    $scope.imagedata = myimagelist;
}

