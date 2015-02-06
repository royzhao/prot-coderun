/**
 * Created by ZJY on 2015/2/4.
 */
angular
    .module('RDash')
    .controller('MySingleImageCtrl', ['$scope', '$stateParams',MySingleImageCtrl]);

function MySingleImageCtrl($scope,$stateParams) {
    var myimagelist = [
        {
            'imageid':1,
            'imagename':'c++',
            'status':1,
            'description':'镜像描述',
            'stars':50,
            'forknum':50,
            'runnum':100,
            'type':1,
            'typename':'本地程序',
            'date':'6月18'
        },
        {
            'imageid':2,
            'imagename':'golang',
            'status':1,
            'description':'镜像描述',
            'stars':50,
            'forknum':50,
            'runnum':100,
            'type':1,
            'typename':'本地程序',
            'date':'6月18'
        },
        {
            'imageid':3,
            'imagename':'python',
            'status':1,
            'type':1,
            'description':'镜像描述',
            'stars':50,
            'forknum':50,
            'runnum':100,
            'typename':'本地程序',
            'date':'6月18'
        },
        {
            'imageid':4,
            'imagename':'java',
            'status':2,
            'type':2,
            'description':'镜像描述',
            'stars':50,
            'forknum':50,
            'runnum':100,
            'typename':'网络程序',
            'date':'6月18'
        },
        {
            'imageid':5,
            'imagename':'web',
            'status':2,
            'type':1,
            'description':'镜像描述',
            'stars':50,
            'forknum':50,
            'runnum':100,
            'typename':'本地程序',
            'date':'6月18'
        },
    ];
    $scope.image = myimagelist[$stateParams.imageid];
    $scope.newDiscuss = function(){
        alert('建立一个讨论,多人可以对这个进行交流');
    }
    $scope.editTerminal = function(){
        alert('嵌入tty.js');
    }
}
