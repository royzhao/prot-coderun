/**
 * Created by zpl on 15-3-18.
 * 新建代码
 */

angular
    .module('Show')
    .controller('NewCodeCtrl', ['$location','$scope','MyCodeService','AlertOnceService','$stateParams', 'ngDialog',NewCodeCtrl]);
function NewCodeCtrl($location,$scope,MyCodeService,AlertOnceService,$stateParams,ngDialog){
    // Injector
    $scope.newcodes = {
        name:"",
        description:""
    };
    var codeid = $stateParams.codeid;
    if(codeid != null){
        MyCodeService.getCodeInfoById(codeid,function(data){
            if(data == null){
                AlertOnceService.addNotify('danger',"添加失败,请稍后重试");
                $location.path('/code/'+data.id);
                return;
            }
            $scope.newcodes = data;

        })
    }
    $scope.submit2 = function(){
        console.log($scope.newcodes);
        if ($scope.code.$invalid) {
            return;
        }
        //创建新对象
        var dig = ngDialog.open({template:'templates/pop/wait4add.html'});
        MyCodeService.addCode2User($scope.newcodes,function(data){
            dig.close();
            if(data == null){
                AlertOnceService.addNotify('danger',"添加失败,请稍后重试");
                return;
            }
            $location.path('/code/'+data.id);
        });
    };
    $scope.reset2 = function(){
        $scope.newcodes ={
            name:"",
            description:""
        }
    };

}

