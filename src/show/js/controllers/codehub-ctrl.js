/**
 * Created by zpl on 15-2-2.
 * code hub
 */

angular
    .module('Show')
    .controller('MyCodeHubCtrl', ['$scope','MyCodeService', MyCodeHubCtrl]);

function MyCodeHubCtrl($scope,MyCodeService) {
    $scope.flag = {};
    $scope.pagination =new Array()
    $scope.page = {
        total:0,
        page:1,
        num:5
    };
    $scope.flag.key= "";

    //func
    $scope.flag.search = function(){
        $scope.currentData(1);
    }
    $scope.currentData = function(index){
        if(index <1)
            return;
        $scope.page.page = index;
        $scope.flag.is_show = true;
        $scope.flag.msg = "正在加载。。。";
        MyCodeService.getHotCodes($scope.page.page,$scope.page.num,$scope.flag.key,function(err,data){
            if(data){
                if(data.length == 0){
                    $scope.flag.msg = "暂时没有数据。。您可以创建";
                }else{
                    $scope.codedata = data.list;
                    $scope.page.total = data.total;
                    $scope.page.page = data.page;
                    $scope.page.num = data.num;
                    $scope.pagination =new Array()
                    for(var i =1;i<=(data.total/data.num)+1;i++){
                        var page = {
                            is_active:(data.page==i?true:false),
                            index :i
                        }
                        $scope.pagination.push(page);
                    }
                    $scope.flag.is_show = false;
                }
            }else{
                $scope.flag.msg = "加载失败。。。！";
            }
        });
    }

    //init
    $scope.currentData(1,"");
}
