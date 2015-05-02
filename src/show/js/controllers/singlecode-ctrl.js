/**
 * Created by zpl on 15-2-2.
 */


angular
    .module('Show')
    .controller('MySingleCodeCtrl', ['$scope', '$stateParams','MyCodeService','$localStorage',MySingleCodeCtrl]);

function MySingleCodeCtrl($scope,$stateParams,MyCodeService,$localStorage) {
    //var mycodelist = [
    //    {
    //        'codeid':1,
    //        'codename':'测试专用1',
    //        'description':'代码描述',
    //        'stars':50,
    //        'forknum':50,
    //        'runnum':100,
    //        'type':1,
    //        'typename':'本地程序',
    //        'imageid':2,
    //        'imagename':'go语言测试',
    //        'date':'6月18'
    //    }
    //];
    //$scope.code = mycodelist[$stateParams.codeid-1];
    var codeid = $stateParams.codeid;
    MyCodeService.getMyOneCodeFromBack(codeid,function(data){
        $scope.code = data;
        MyCodeService.getMyCodeStep($scope.code.id,function(steps){
            console.log(steps);
            $scope.codesteps = steps;
        });
    });

    $scope.newDiscuss = function(){
        alert('建立一个讨论,多人可以对这个进行交流');
    }
}
