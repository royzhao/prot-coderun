/**
 * Created by zpl on 15-2-2.
 * image hub
 */


angular
    .module('RDash')
    .controller('MyImageHubCtrl', ['$scope', '$resource','Images','$stateParams', MyImageHubCtrl]);

function MyImageHubCtrl($scope,$resource,Images,$stateParams) {
    //var myimagelist = $resource('/dockerapi/images/json?all=0', {}, {}).query();
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
    var page = ($stateParams.page == undefined) ? 1 : $stateParams.page;
    var num = 16;
    Images.query({}).$promise.then(function(data){
        var start = (page-1)*num;
        var end = start + num;
        console.log(start);
        console.log(end);
        if(end > data.length) {
            $scope.imagedata = data.slice(start);
        } else {
            $scope.imagedata = data.slice(start,end);
        }
        $scope.pagenum = [];
        var length = Math.ceil(data.length / num);
        for(var i = 0;i < length;i++) {
            $scope.pagenum.push(i+1);
        }
        //$scope.imagenum = $scope.imagedata.length;
        //for (var i=0;i<$scope.imagedata.length;i++ ) {
        //    $scope.forknum += $scope.imagedata[i].Fork;
        //}
    });

    $scope.search = function() {
        alert(document.getElementById("searchfield").value);
    }
    //$scope.imagedata = myimagelist;
}

