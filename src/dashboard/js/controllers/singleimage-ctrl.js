/**
 * Created by ZJY on 2015/2/4.
 */
angular
    .module('RDash')
    .controller('MySingleImageCtrl', ['$scope', '$stateParams','Images','$location', 'Star', 'Fork', 'Image', '$cookieStore',  MySingleImageCtrl]);

function MySingleImageCtrl($scope,$stateParams,Images,$location,Star, Fork, Image, $cookieStore) {
    //var myimagelist = [
    //    {
    //        'imageid':1,
    //        'imagename':'c++',
    //        'status':1,
    //        'description':'镜像描述',
    //        'stars':50,
    //        'forknum':50,
    //        'runnum':100,
    //        'type':1,
    //        'typename':'本地程序',
    //        'date':'6月18'
    //    },
    //    {
    //        'imageid':2,
    //        'imagename':'golang',
    //        'status':1,
    //        'description':'镜像描述',
    //        'stars':50,
    //        'forknum':50,
    //        'runnum':100,
    //        'type':1,
    //        'typename':'本地程序',
    //        'date':'6月18'
    //    },
    //    {
    //        'imageid':3,
    //        'imagename':'python',
    //        'status':1,
    //        'type':1,
    //        'description':'镜像描述',
    //        'stars':50,
    //        'forknum':50,
    //        'runnum':100,
    //        'typename':'本地程序',
    //        'date':'6月18'
    //    },
    //    {
    //        'imageid':4,
    //        'imagename':'java',
    //        'status':2,
    //        'type':2,
    //        'description':'镜像描述',
    //        'stars':50,
    //        'forknum':50,
    //        'runnum':100,
    //        'typename':'网络程序',
    //        'date':'6月18'
    //    },
    //    {
    //        'imageid':5,
    //        'imagename':'web',
    //        'status':2,
    //        'type':1,
    //        'description':'镜像描述',
    //        'stars':50,
    //        'forknum':50,
    //        'runnum':100,
    //        'typename':'本地程序',
    //        'date':'6月18'
    //    },
    //];
    //$scope.image = [];
    //alert($stateParams.imageid);
    var star;
    var fork;
    var currentuid = 1;
    var currentname="dylan";
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
        } else {
            $scope.forkcolor = "";
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
        $scope.image = {
            imagename : data.ImageName,
            star : data.Star,
            fork : data.Fork,
            description : data.Descrip,
            date : data.Date,
            id : data.ImageId
        };
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
        Image.star({action:'star'},myimage).$promise.then(function(c){
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
                } else {
                    $scope.forkcolor = "";
                }
            });
            Images.get({id: $stateParams.imageid, action: 'log'}).$promise.then(function(data){
                $scope.image.fork = data.Fork;
            });
        }, function(err){
            //$scope.hideLoader();
            //$scope.error = err.data;
            alert("failure");
            return false;
        });
    }
    //$scope.editTerminal = function(){
    //}
}
