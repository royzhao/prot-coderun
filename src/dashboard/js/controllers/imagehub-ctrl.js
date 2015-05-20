/**
 * Created by zpl on 15-2-2.
 * image hub
 */


angular
    .module('RDash')
    .controller('MyImageHubCtrl', ['$scope', '$resource','$stateParams','ImagehubService','Info', MyImageHubCtrl]);

function MyImageHubCtrl($scope,$resource,$stateParams,ImagehubService,Info) {
    alert("a");
    var test = {"Id":0,"UserId":1,"Avatar":"aaaa","Discrip":"my discription"}
    Info.update({action:'update'},test,function(data){

    })
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


    //var page = ($stateParams.page == undefined) ? 1 : $stateParams.page;
    //var num = 8;
    //Images.query({}).$promise.then(function(data){
    //    var start = (page-1)*num;
    //    var end = start + num;
    //    console.log(start);
    //    console.log(end);
    //    if(end > data.length) {
    //        $scope.imagedata = data.slice(start);
    //    } else {
    //        $scope.imagedata = data.slice(start,end);
    //    }
    //    $scope.pagenum = [];
    //    var length = Math.ceil(data.length / num);
    //    for(var i = 0;i < length;i++) {
    //        $scope.pagenum.push(i+1);
    //    }
    //});

    $scope.flag = {};
    $scope.pagination =new Array()
    $scope.page = {
        total:0,
        page:1,
        num:8
    };
    $scope.flag.key= "";

    //func
    $scope.flag.search = function(){
        $scope.currentData(1);
    }
    $scope.currentData = function(index){
        if(index <1)
            return;
        $scope.page.page = index;
        $scope.flag.is_show = true;
        $scope.flag.msg = "正在加载...";
        ImagehubService.getHotImages($scope.page.page,$scope.page.num,$scope.flag.key,function(err,data){
            if(data){
                if(data.length == 0){
                    $scope.flag.msg = "暂时没有数据,您可以创建";
                }else{
                    $scope.imagedata = data.list;
                    $scope.page.total = data.total;
                    $scope.page.page = data.page;
                    $scope.page.num = data.num;
                    $scope.pagination =new Array()
                    for(var i =1;i<=(data.total/data.num)+1;i++){
                        var page = {
                            is_active:(data.page==i?true:false),
                            index :i
                        }
                        $scope.pagination.push(page);
                    }
                    $scope.flag.is_show = false;
                }
            }else{
                $scope.flag.msg = "加载失败！";
            }
        });
    }

    //init
    $scope.currentData(1,"");


    //$scope.search = function() {
    //    var key = document.getElementById("searchfield").value;
    //    //alert(document.getElementById("searchfield").value);
    //}
    //$scope.imagedata = myimagelist;
}

