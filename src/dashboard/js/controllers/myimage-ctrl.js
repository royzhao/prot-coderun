/**
 * Created by zpl on 15-2-2.
 * 我的镜像
 */

angular
    .module('RDash')
    .controller('MyImageCtrl', ['$scope','$resource','Images', '$cookies', MyImageCtrl]);

function MyImageCtrl($scope,$resource,Images,$cookies) {
    //var imagequery = $resource('/dockerapi/images/:id/:action', {id: '@id',action:'list' }, {});
    //$scope.imagedata = imagequery.query({id:1}, function() {
    //});
    //$cookieStore.put("token","aa");
    //alert($cookies.token);

    var currentid = parseInt($cookies.u_id);
    var currentname = $cookies.u_name;
    $scope.imagenum = 0;
    $scope.forknum = 0;
    Images.query({id: currentid, action: 'list'}).$promise.then(function(data){
        $scope.imagedata = data;
        $scope.imagenum = $scope.imagedata.length;
        for (var i=0;i<$scope.imagedata.length;i++ ) {
            $scope.forknum += $scope.imagedata[i].Fork;
        }
    });
    //var myimagelist = [
    //    {
    //        'imageid':2,
    //        'imagename':'go语言测试',
    //        'description':'描述镜像内容',
    //        'status':1
    //    },
    //    {
    //        'imageid':2,
    //        'imagename':'go语言测试',
    //        'description':'描述镜像内容',
    //        'status':1
    //    },
    //    {
    //        'imageid':2,
    //        'imagename':'go语言测试',
    //        'description':'描述镜像内容',
    //        'status':1
    //    },
    //    {
    //        'imageid':2,
    //        'imagename':'go语言测试',
    //        'description':'描述镜像内容',
    //        'status':1
    //    },
    //    {
    //        'imageid':2,
    //        'imagename':'go语言测试',
    //        'description':'描述镜像内容',
    //        'status':2
    //    },
    //    {
    //        'imageid':2,
    //        'imagename':'go语言测试',
    //        'description':'描述镜像内容',
    //        'status':2
    //    },
    //    {
    //        'imageid':2,
    //        'imagename':'go语言测试',
    //        'description':'描述镜像内容',
    //        'status':2
    //    },
    //];
    //$scope.imagedata = myimagelist;
}

