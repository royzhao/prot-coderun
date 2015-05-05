/**
 * Created by zpl on 15-2-2.
 */


angular
    .module('Show')
    .controller('MySingleCodeCtrl', ['$scope', '$stateParams','MyCodeService','$localStorage','SessionService',MySingleCodeCtrl]);

function MySingleCodeCtrl($scope,$stateParams,MyCodeService,$localStorage,SessionService) {
    var codeid = $stateParams.codeid;
    $scope.flag = {};
    $scope.is_author = false;
    $scope.flag.is_show = true;
    $scope.flag.msg = "正在加载。。。";
    MyCodeService.getMyOneCodeFromBack(codeid,function(data){
        $scope.code = data;
        MyCodeService.getMyCodeStep($scope.code.id,function(steps){
            console.log(steps);
            $scope.codesteps = steps;
            if(steps == null || steps == undefined){
                $scope.flag.is_show = true;
                $scope.flag.msg = "对不起没有内容，您可以新建。。。";
            }else{
                if(steps instanceof Array){
                    if(steps.length == 0){
                        $scope.flag.is_show = true;
                        $scope.flag.msg = "对不起没有内容，您可以新建。。。";
                    }else{
                        $scope.flag.is_show = false;
                    }
                }else{
                    $scope.flag.is_show = true;
                    $scope.flag.msg = "对不起没有内容，您可以新建。。。";
                }
            }
        });
    });

    //func
    $scope.starIt = function(){
        var user = SessionService.getUserinfo();
        if(user == null || user == undefined){
            return;
        }
        MyCodeService.updateCodeStar(user.userid,codeid,function(err,data){
            if(err){
                console.log(err);
            }
            if(data){
                $scope.code = data;
            }
        })
    }
    $scope.newDiscuss = function(){
        alert('建立一个讨论,多人可以对这个进行交流');
    }
}
