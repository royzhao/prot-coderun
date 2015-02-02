/**
 * Created by zpl on 15-2-2.
 */


angular
    .module('RDash')
    .controller('MySingleCodeCtrl', ['$scope', '$stateParams',MySingleCodeCtrl]);

function MySingleCodeCtrl($scope,$stateParams) {
    var mycodelist = [
        {
            'codeid':1,
            'codename':'测试专用',
            'description':'代码描述',
            'stars':50,
            'forknum':50,
            'runnum':100,
            'type':1,
            'typename':'本地程序',
            'imageid':2,
            'imagename':'go语言测试',
            'date':'6月18'
        },
        {
            'codeid':1,
            'codename':'测试专用',
            'description':'代码描述',
            'stars':50,
            'forknum':50,
            'runnum':100,
            'type':1,
            'imageid':2,
            'typename':'本地程序',
            'imagename':'go语言测试',
            'date':'6月18'
        },
        {
            'codeid':1,
            'codename':'测试专用2',
            'type':1,
            'description':'代码描述',
            'stars':50,
            'forknum':50,
            'runnum':100,
            'imageid':2,
            'typename':'本地程序',
            'imagename':'go语言测试',
            'date':'6月18'
        },
        {
            'codeid':1,
            'codename':'测试专用3',
            'type':2,
            'description':'代码描述',
            'stars':50,
            'forknum':50,
            'runnum':100,
            'imageid':2,
            'typename':'网络程序',
            'imagename':'go语言测试',
            'date':'6月18'
        },
        {
            'codeid':1,
            'codename':'测试专用4',
            'type':1,
            'description':'代码描述',
            'stars':50,
            'forknum':50,
            'runnum':100,
            'imageid':2,
            'typename':'本地程序',
            'imagename':'go语言测试',
            'date':'6月18'
        },
    ];
    $scope.code = mycodelist[$stateParams.codeid];
    $scope.newDiscuss = function(){
        alert('建立一个讨论,多人可以对这个进行交流');
    }
}
