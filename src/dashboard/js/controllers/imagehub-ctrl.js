/**
 * Created by zpl on 15-2-2.
 * image hub
 */


angular
    .module('RDash')
    .controller('MyImageHubCtrl', ['$scope', MyImageHubCtrl]);

function MyImageHubCtrl($scope) {
    var myimagelist = [
        {
            'imageid':2,
            'imagename':'go语言测试',
            'description':'描述镜像内容',
            'status':1,
            'stars':40,
            'date':'9月20日',
            'forknum':50
        },
        {
            'imageid':2,
            'imagename':'go语言测试',
            'description':'描述镜像内容',
            'status':1,
            'stars':40,
            'date':'9月20日',
            'forknum':50
        },
        {
            'imageid':2,
            'imagename':'go语言测试',
            'description':'描述镜像内容',
            'status':1,
            'stars':40,
            'date':'9月20日',
            'forknum':50
        },
        {
            'imageid':2,
            'imagename':'go语言测试',
            'description':'描述镜像内容',
            'status':1,
            'stars':40,
            'date':'9月20日',
            'forknum':50
        },
        {
            'imageid':2,
            'imagename':'go语言测试',
            'description':'描述镜像内容',
            'status':2,
            'stars':40,
            'date':'9月20日',
            'forknum':50
        },
    ];
    $scope.imagedata = myimagelist;
}

