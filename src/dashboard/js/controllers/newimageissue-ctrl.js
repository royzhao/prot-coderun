/**
 * Created by zpl on 15-5-7.
 */
angular
    .module('RDash')
    .controller('NewImageIssueCtrl', ['SessionService','$scope', '$stateParams','CodeAPIService', NewImageIssueCtrl]);

function NewImageIssueCtrl(SessionService,$scope,$stateParams,CodeAPIService) {
    var imageid =parseInt($stateParams.imageid);
    if(imageid == NaN){
        return;
    }
    var user =SessionService.getUserinfo();
    var userid = parseInt(user.userid);
    $scope.issue={
        image_id:imageid,
        author:userid,
        content:"",
        title:"",
        status:1,
        reply_to:0
    }
    $scope.flag={
        is_show:true,
        msg:'正在提交中'
    }
    //window.um = UE.getEditor('newissue');

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
    $scope.newIssue = function(){
        $scope.issue.content=$scope.getPostContent();
        var user = SessionService.getUserinfo();
        CodeAPIService.addImageIssue(user.userid,imageid,$scope.issue)
            .then(function(data){
                console.log(data);
                $scope.setPostContent("");
                window.location.href="/dashboard.html#/image/"+imageid+"/issue/"+data.id
            },function(err){
                console.log(err);
                alert('创建失败！请重试')
            })
    };
    $scope.ready = function(editor){
        $scope.editor = editor
    }
}