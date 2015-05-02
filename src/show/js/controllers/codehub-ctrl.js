/**
 * Created by zpl on 15-2-2.
 * code hub
 */

angular
    .module('Show')
    .controller('MyCodeHubCtrl', ['$scope', MyCodeHubCtrl]);

function MyCodeHubCtrl($scope) {
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
            'imagename':'go语言测试'
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
            'imagename':'go语言测试'
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
            'imagename':'go语言测试'
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
            'imagename':'go语言测试'
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
            'imagename':'go语言测试'
        },
    ];
    $scope.codedata = mycodelist;
}
