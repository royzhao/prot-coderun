/**
 * Created by zpl on 15-5-6.
 */
angular
    .module('RDash')
    .controller('IssuesCtrl', ['SessionService','$scope', '$stateParams','MyCodeService','CodeAPIService', IssuesCtrl]);

function IssuesCtrl(SessionService,$scope,$stateParams,MyCodeService,CodeAPIService) {
    var codeid = $stateParams.codeid;
    var issueid = $stateParams.issueid;
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
        data:[],
        issue:{}
    }
    $scope.flag.msg = "正在加载。。。";

    //func

    $scope.flag.search = function(){
        $scope.currentData(1);
    }
    $scope.currentData = function(index){
        if(index <1)
            return;
        $scope.flag.issue.page.page = index;
        $scope.flag.issue.is_show = true;
        $scope.flag.issue.msg = "正在加载。。。";
        CodeAPIService.getIssuesComments(issueid,$scope.flag.issue.page.page,$scope.flag.issue.page.num,$scope.flag.issue.key).
            then(function(data){
                $scope.flag.issue.page.total = data.total;
                $scope.flag.issue.page.page = data.page;
                $scope.flag.issue.page.num = data.num;
                $scope.flag.issue.data = data.list;
                $scope.flag.issue.issue = data.issue;
                $scope.flag.issue.is_show = true;
                $scope.pagination = [];
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

    $scope.currentData(1,"");
}