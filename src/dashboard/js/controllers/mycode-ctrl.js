/**
 * Created by zpl on 15-2-2.
 * 我的代码
 */
angular
    .module('RDash')
    .controller('MyCodeCtrl', ['$scope', MyCodeCtrl]);

function MyCodeCtrl($scope) {
    var mycodelist = [
        {
            'codeid':1,
            'codename':'测试专用',
            'type':1,
            'typename':'本地程序',
            'imageid':2,
            'imagename':'go语言测试'
        },
        {
            'codeid':2,
            'codename':'测试专用',
            'type':1,
            'imageid':2,
            'typename':'本地程序',
            'imagename':'go语言测试'
        },
        {
            'codeid':3,
            'codename':'测试专用2',
            'type':1,
            'imageid':2,
            'typename':'本地程序',
            'imagename':'go语言测试'
        },
        {
            'codeid':4,
            'codename':'测试专用3',
            'type':2,
            'imageid':2,
            'typename':'网络程序',
            'imagename':'go语言测试'
        },
        {
            'codeid':5,
            'codename':'测试专用4',
            'type':1,
            'imageid':2,
            'typename':'本地程序',
            'imagename':'go语言测试'
        },
    ];
    $scope.codedata = mycodelist;
    $scope.newCode = function(){
        alert('点击这个按钮就可以新建一个代码!代码页面没写,意思意思');
    }
}
