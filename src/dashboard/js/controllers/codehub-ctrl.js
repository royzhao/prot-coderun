/**
 * Created by zpl on 15-2-2.
 * code hub
 */

angular
    .module('RDash')
    .controller('MyCodeHubCtrl', ['$scope','MyCodeService', MyCodeHubCtrl]);

function MyCodeHubCtrl($scope,MyCodeService) {
    $scope.flag = {};
    $scope.flag.is_show = true;
    $scope.flag.msg = "正在加载。。。";
    MyCodeService.getHotCodes(function(err,data){
        if(data){
            if(data.length == 0){
                $scope.flag.msg = "暂时没有数据。。您可以创建";
            }else{
                $scope.codedata = data;
                $scope.flag.is_show = false;
            }

        }else{
            $scope.flag.msg = "加载失败。。。！";
        }
    });
    //var mycodelist = [
    //    {
    //        'codeid':1,
    //        'codename':'测试专用',
    //        'description':'代码描述',
    //        'stars':50,
    //        'forknum':50,
    //        'runnum':100,
    //        'type':1,
    //        'typename':'本地程序',
    //        'imageid':2,
    //        'imagename':'go语言测试'
    //    },
    //    {
    //        'codeid':1,
    //        'codename':'测试专用',
    //        'description':'代码描述',
    //        'stars':50,
    //        'forknum':50,
    //        'runnum':100,
    //        'type':1,
    //        'imageid':2,
    //        'typename':'本地程序',
    //        'imagename':'go语言测试'
    //    },
    //    {
    //        'codeid':1,
    //        'codename':'测试专用2',
    //        'type':1,
    //        'description':'代码描述',
    //        'stars':50,
    //        'forknum':50,
    //        'runnum':100,
    //        'imageid':2,
    //        'typename':'本地程序',
    //        'imagename':'go语言测试'
    //    },
    //    {
    //        'codeid':1,
    //        'codename':'测试专用3',
    //        'type':2,
    //        'description':'代码描述',
    //        'stars':50,
    //        'forknum':50,
    //        'runnum':100,
    //        'imageid':2,
    //        'typename':'网络程序',
    //        'imagename':'go语言测试'
    //    },
    //    {
    //        'codeid':1,
    //        'codename':'测试专用4',
    //        'type':1,
    //        'description':'代码描述',
    //        'stars':50,
    //        'forknum':50,
    //        'runnum':100,
    //        'imageid':2,
    //        'typename':'本地程序',
    //        'imagename':'go语言测试'
    //    },
    //];

}
