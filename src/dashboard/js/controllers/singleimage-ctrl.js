/**
 * Created by ZJY on 2015/2/4.
 */
angular
    .module('RDash')
    .controller('MySingleImageCtrl', ['$scope', '$stateParams','Images','$location', 'Star', 'Fork', 'Image', '$cookies','loginService','$window','CodeAPIService',  MySingleImageCtrl]);

function MySingleImageCtrl($scope,$stateParams,Images,$location,Star, Fork, Image, $cookies,loginService,$window,CodeAPIService) {
    //loginService.login();
    $scope.flag = {};
    $scope.is_author = true;
    $scope.flag.is_show = true;
    $scope.pagination =new Array()
    $scope.flag.issue = {
        is_show : false,
        msg :"正在加载。。",
        page : {
            total:0,
            page:1,
            num:5
        },
        key:"",
        data:[]
    }
    $scope.flag.msg = "正在加载。。。";
    var star;
    var fork;
    var currentuid = parseInt($cookies.get("u_id"));
    var currentname = $cookies.get("u_name");
    Star.query({id:$stateParams.imageid,uid:currentuid}).$promise.then(function(data){
        star = parseInt(data.ID);
        if(data.ID > 0) {
            $scope.starcolor = "#808080";
        } else {
            $scope.starcolor = "";
        }
    });
    Fork.query({id:$stateParams.imageid,uid:currentuid}).$promise.then(function(data){
        fork = data.Forked;
        if(fork) {
            $scope.forkcolor = "#808080";
            document.getElementById("imageFork").style.disable = true;
        }
    });
    //console.log(starbool);
    //if(star > 0) {
    //    $scope.starcolor = "#808080";
    //    starbool = false;
    //} else {
    //    $scope.starcolor = "";
    //    starbool = true;
    //}
    //$scope.starcolor = "#808080";
    //$scope.forkcolor = "";
    var myimage;
    Images.get({id: $stateParams.imageid, action: 'log'}).$promise.then(function(data){
        //$scope.image = data;
        myimage = data;
        if(data.UserId  == currentuid){
            $scope.forkcolor = "#808080";
        }
        if(data.UserId == currentuid) {
            document.getElementById("editButton").style.display = "block";
        }
        $scope.image = {
            imagename : data.ImageName,
            star : data.Star,
            fork : data.Fork,
            description : data.Descrip,
            date : data.Date,
            id : data.ImageId
        };
        $scope.currentData(1,"");
    });
    //$scope.image = myimagelist[$stateParams.imageid];
    //$scope.deleteImage = function() {
    //    alert("http://" + $location.host()+":9000");
    //    $window.location.href = "http://" + $location.host()+":9000/dashboard.html#/image/1";
    //}
    $scope.newDiscuss = function(){
        alert('建立一个讨论,多人可以对这个进行交流');
    }
    $scope.starImage = function () {
        //$scope.image.star += 1;
        //myimage.Star += 1;
        var postData = {
            uid:currentuid,
            image:myimage
        }
        Image.star({action:'star'},postData).$promise.then(function(c){
            Star.query({id:$stateParams.imageid,uid:currentuid}).$promise.then(function(data){
                star = parseInt(data.ID);
                if(star > 0) {
                    $scope.starcolor = "#808080";
                } else {
                    $scope.starcolor = "";
                }
            });
            Images.get({id: $stateParams.imageid, action: 'log'}).$promise.then(function(data){
                $scope.image.star = data.Star;
            });
        }, function(err){
            //$scope.hideLoader();
            //$scope.error = err.data;
            alert("failure");
            return false;
        });
    }
    $scope.forkImage = function () {
        if(currentuid==myimage.UserId ||  ($scope.forkcolor == "#808080")) {
            return;
        }
        document.getElementById("imagePage").style.display = "none";
        document.getElementById("loading").style.display = "block";
        var postData = {
            uid:currentuid,
            uname:currentname,
            image:myimage
        }
        Image.fork({action:'fork'},postData).$promise.then(function(c){
            Fork.query({id:$stateParams.imageid,uid:currentuid}).$promise.then(function(data){
                fork = data.Forked;
                if(fork) {
                    $scope.forkcolor = "#808080";
                }
            });
            Images.get({id: $stateParams.imageid, action: 'log'}).$promise.then(function(data){
                $scope.image.fork = data.Fork;
            });
            document.getElementById("text").innerHTML = "创建成功！";
            $window.location.href = "http://" + $location.host()+":9000/dashboard.html#/myimage";
        }, function(err){
            //$scope.hideLoader();
            //$scope.error = err.data;
            document.getElementById("text").innerHTML = "创建失败！";
            document.getElementById("loading").style.display = "none";
            document.getElementById("imagePage").style.display = "block";
            return false;
        });
    }
    //$scope.editTerminal = function(){
    //}

    $scope.flag.search = function(){
        $scope.currentData(1);
    }
    $scope.currentData = function(index){
        if(index <1)
            return;
        $scope.flag.issue.page.page = index;
        $scope.flag.issue.is_show = true;
        $scope.flag.issue.msg = "正在加载。。。";
        CodeAPIService.getImageIssues($stateParams.imageid,$scope.flag.issue.page.page,$scope.flag.issue.page.num,$scope.flag.issue.key).
            then(function(data){
                $scope.flag.issue.page.total = data.total;
                $scope.flag.issue.page.page = data.page;
                $scope.flag.issue.page.num = data.num;
                $scope.flag.issue.data = data.list;
                $scope.flag.issue.is_show = true;
                for(var i =1;i<=(data.total/data.num)+1;i++){
                    var page = {
                        is_active:(data.page==i?true:false),
                        index :i
                    }
                    $scope.pagination.push(page);
                }
            },function(err){
                $scope.flag.issue.is_show = false;
                $scope.flag.issue.msg = err;
            })
    }
}
