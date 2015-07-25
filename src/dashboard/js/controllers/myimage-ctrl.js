/**
 * Created by zpl on 15-2-2.
 * 我的镜像
 */

angular
    .module('RDash')
    .controller('MyImageCtrl', ['$scope','$resource','Images', '$cookies','Message','SessionService', MyImageCtrl]);

function MyImageCtrl($scope,$resource,Images,$cookies,Message,SessionService) {
    //var imagequery = $resource('/api/images/:id/:action', {id: '@id',action:'list' }, {});
    //$scope.imagedata = imagequery.query({id:1}, function() {
    //});
    //$cookieStore.put("token","aa");
    //alert($cookies.token);
    var currentid = parseInt(SessionService.getUserinfo().userid);
    var currentname = SessionService.getUserinfo().username;
    $scope.imagenum = 0;
    $scope.forknum = 0;
    Images.query({id: currentid, action: 'list'}).$promise.then(function(data){
        $scope.imagedata = data;
        $scope.imagenum = $scope.imagedata.length;
        for (var i=0;i<$scope.imagedata.length;i++ ) {
            $scope.forknum += $scope.imagedata[i].Fork;
        }
    });
    //Message.add({action:'add'},{'ReplyTo':currentid,'Author':1,'Content':"test2",'Level':1}).$promise.then(function(data){
    //
    //},function(err){
    //    console.log(err);
    //})
    //Message.query({action:'query',id:currentid}).$promise.then(function(data){
    //    for(var i=0;i<data.length;i++){
    //        data[i].Content= $sce.trustAsHtml(data[i].Content);
    //    }
    //    $scope.messages = data;
    //});
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

