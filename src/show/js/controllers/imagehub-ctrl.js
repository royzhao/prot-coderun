/**
 * Created by zpl on 15-2-2.
 * image hub
 */


angular
    .module('Show')
    .controller('MyImageHubCtrl', ['$scope', '$resource','Images', MyImageHubCtrl]);

function MyImageHubCtrl($scope,$resource,Images) {
    //var myimagelist = $resource('/api/images/json?all=0', {}, {}).query();
    //var myimagelist = [
    //    {
    //        'imageid':2,
    //        'imagename':'go语言测试',
    //        'description':'描述镜像内容',
    //        'status':1,
    //        'stars':40,
    //        'date':'9月20日',
    //        'forknum':50
    //    },
    //    {
    //        'imageid':2,
    //        'imagename':'go语言测试',
    //        'description':'描述镜像内容',
    //        'status':1,
    //        'stars':40,
    //        'date':'9月20日',
    //        'forknum':50
    //    },
    //    {
    //        'imageid':2,
    //        'imagename':'go语言测试',
    //        'description':'描述镜像内容',
    //        'status':1,
    //        'stars':40,
    //        'date':'9月20日',
    //        'forknum':50
    //    },
    //    {
    //        'imageid':2,
    //        'imagename':'go语言测试',
    //        'description':'描述镜像内容',
    //        'status':1,
    //        'stars':40,
    //        'date':'9月20日',
    //        'forknum':50
    //    },
    //    {
    //        'imageid':2,
    //        'imagename':'go语言测试',
    //        'description':'描述镜像内容',
    //        'status':2,
    //        'stars':40,
    //        'date':'9月20日',
    //        'forknum':50
    //    },
    //];
    Images.query({}).$promise.then(function(data){
        $scope.imagedata = data;
        $scope.imagenum = $scope.imagedata.length;
        //for (var i=0;i<$scope.imagedata.length;i++ ) {
        //    $scope.forknum += $scope.imagedata[i].Fork;
        //}
    });
    //$scope.imagedata = myimagelist;
}

