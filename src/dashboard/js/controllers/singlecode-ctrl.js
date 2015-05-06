/**
 * Created by zpl on 15-2-2.
 */


angular
    .module('RDash')
    .controller('MySingleCodeCtrl', ['SessionService','$scope', '$stateParams','MyCodeService','CodeAPIService',MySingleCodeCtrl]);

function MySingleCodeCtrl(SessionService,$scope,$stateParams,MyCodeService,CodeAPIService) {
    var codeid = $stateParams.codeid;
    $scope.flag = {};
    $scope.is_author = true;
    $scope.flag.is_show = true;
    $scope.pagination =new Array()
    $scope.flag.issue = {
        is_show : false,
        msg :"正在加载。。",
        page : {
            total:0,
            page:1,
            num:5
        },
        key:"",
        data:[]
    }
    $scope.flag.msg = "正在加载。。。";

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
    };
    $scope.flag.search = function(){
        $scope.currentData(1);
    }
    $scope.currentData = function(index){
        if(index <1)
            return;
        $scope.flag.issue.page.page = index;
        $scope.flag.issue.is_show = true;
        $scope.flag.issue.msg = "正在加载。。。";
        CodeAPIService.getCodeIssues(codeid,$scope.flag.issue.page.page,$scope.flag.issue.page.num,$scope.flag.issue.key).
            then(function(data){
                $scope.flag.issue.page.total = data.total;
                $scope.flag.issue.page.page = data.page;
                $scope.flag.issue.page.num = data.num;
                $scope.flag.issue.data = data.list;
                $scope.flag.issue.is_show = true;
                for(var i =1;i<=(data.total/data.num)+1;i++){
                    var page = {
                        is_active:(data.page==i?true:false),
                        index :i
                    }
                    $scope.pagination.push(page);
                }
            },function(err){
                $scope.flag.issue.is_show = false;
                $scope.flag.issue.msg = err;
            })
    }
    $scope.newDiscuss = function(){
        alert('建立一个讨论,多人可以对这个进行交流');
    }

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
        $scope.currentData(1,"");
    });


}
