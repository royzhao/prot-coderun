/**
 * Created by zpl on 15-5-6.
 */
angular
    .module('RDash')
    .controller('IssuesCtrl', ['$sce','SessionService','$scope', '$stateParams','MyCodeService','CodeAPIService', IssuesCtrl]);

function IssuesCtrl($sce,SessionService,$scope,$stateParams,MyCodeService,CodeAPIService) {
    var codeid = $stateParams.codeid;
    var issueid =parseInt($stateParams.issueid);
    if(issueid == NaN){
        return;
    }
    $scope.flag = {};
    $scope.is_author = true;
    $scope.flag.is_show = true;
    $scope.pagination =new Array()
    $scope.newcomment={
        issue_id:issueid,
        author:0,
        content:"",
        status:1,
        reply_to:0
    }
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
    $scope.setPostContent = function(content){
        if($scope.editor == undefined || $scope.editor== null){
            return null;
        }
        $scope.editor.setContent(content);
    }
    $scope.getPostContent = function(){
        if($scope.editor == undefined || $scope.editor== null){
            return "";
        }
        var html =$scope.editor.getContent();
        return html;

    }
    $scope.newDiscuss = function(){
        $scope.newcomment.content=$scope.getPostContent();
        console.log($scope.newcomment);
        var user = SessionService.getUserinfo();
        CodeAPIService.addCodeIssueComment(user.userid,issueid,$scope.newcomment)
            .then(function(data){
                console.log(data);
                $scope.newcomment={
                    issue_id:issueid,
                    author:0,
                    content:"",
                    status:1,
                    reply_to:0
                }
                $scope.setPostContent("");
                $scope.currentData($scope.flag.issue.page.page,"");
            },function(err){
                console.log(err);
            })
    }

    $scope.replay_to_user = function(obj){
        if(typeof(obj.author) == "string"){
            $scope.newcomment.reply_to = parseInt(obj.author);
        }else{
            $scope.newcomment.reply_to = obj.author;
        }

        $scope.newcomment.content += '<div id="quote"><blockquote><font size="2"><a href="">' +
        '<font color="#999999">' +'test'+
        '发表于' +obj.create_date+
    '</font></a></font>' +
    '<br> ' +obj.content+
    '</blockquote></div><br/>&nbsp;&nbsp;';
        var user = SessionService.getUserinfo();
        if(typeof(user.userid) == "string"){
            $scope.newcomment.author = parseInt(user.userid);
        }else{
            $scope.newcomment.author = user.userid;
        }

        $scope.setPostContent($scope.newcomment.content);
    }
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
                if(data.list != null){
                    for(var i=0;i<data.list.length;i++){
                        data.list[i].content = $sce.trustAsHtml(data.list[i].content);
                        data.list[i].create_date = data.list[i].create_date.split('.')[0]
                    }

                }

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
    $scope.ready = function(editor){
        $scope.editor = editor
    }

    $scope.currentData(1,"");
}