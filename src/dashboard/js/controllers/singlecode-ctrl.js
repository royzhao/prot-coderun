/**
 * Created by zpl on 15-2-2.
 */


angular
    .module('RDash')
    .controller('MySingleCodeCtrl', ['SessionService','$scope', '$stateParams','MyCodeService','$localStorage',MySingleCodeCtrl]);

function MySingleCodeCtrl(SessionService,$scope,$stateParams,MyCodeService,$localStorage) {
    var codeid = $stateParams.codeid;

    MyCodeService.getMyOneCodeFromBack(codeid,function(data){
        $scope.code = data;
        MyCodeService.getMyCodeStep($scope.code.id,function(steps){
            console.log(steps);
            $scope.codesteps = steps;
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
