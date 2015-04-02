/**
 * Created by ZJY on 2015/2/4.
 */
angular
    .module('RDash')
    .controller('MySingleImageCtrl', ['$scope', '$stateParams','Images',  MySingleImageCtrl]);

function MySingleImageCtrl($scope,$stateParams,Images) {
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
    Images.get({id: $stateParams.imageid, action: 'log'}).$promise.then(function(data){
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
    $scope.deleteImage = function() {

    }
    $scope.newDiscuss = function(){
        alert('建立一个讨论,多人可以对这个进行交流');
    }
    $scope.starImage = function () {
        alert('a');
    }
    $scope.forkImage = function () {
        alert('a');
    }
    //$scope.editTerminal = function(){
    //}
}
