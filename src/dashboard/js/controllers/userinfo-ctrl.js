/**
 * Created by zpl on 15-5-27.
 * UserInfoCtrl
 */
angular
    .module('RDash')
    .controller('UserInfoCtrl', ['PictureService','Info','SessionService','$scope', '$stateParams','CodeAPIService', UserInfoCtrl]);

function UserInfoCtrl(PictureService,Info,SessionService,$scope,$stateParams,CodeAPIService) {
    $scope.flag={
        is_show:false,
        msg:'读取数据中。。'
    }
    var userid =parseInt($stateParams.userid);
    if(isNaN(userid)){
        if (SessionService.isLogin() == false){
            alert('不存在该用户')
            window.location.href="/dashboard.html"
            return
        }
        user = SessionService.getUserinfo()
        userid = user.userid
    }

    $scope.user= {}
    CodeAPIService.getUserInfoById(userid)
        .then(function(data){
            console.log(data);
            $scope.flag={
                is_show:true,
                msg:'ok'
            }
            $scope.user= data
            $scope.user_pic = PictureService.ConvertKey2Src($scope.user.info.Avatar,150,200);
        },function(err){
            console.log(err);
            alert('不存在该用户')
            window.location.href="/dashboard.html"
        })

    //func
    //update user info
    $scope.updateUserInfo = function(){
        console.log($scope.user.info);
        $scope.flag={
            is_show:false,
            msg:'正在更新资料。。。。'
        }
        Info.update({action:"update",uid:userid},$scope.user.info).$promise.then(function(c){
            //$location.path("/term/"+ image.ImageName+"/"+image.basic.Tag);
            alert('更新完成')
            $scope.flag={
                is_show:true,
                msg:'ok'
            }
        }, function(err){
            $scope.flag={
                is_show:false,
                msg:'更新失败，请稍后重试'
            }
            return false;
        })
    };
    $scope.filefinished = function( $file, $message, $flow ){
        ret = JSON.parse($message);
        if(ret.code == 6){
            $scope.user.info.Avatar = ret.message;
        }else{
            alert('上传服务暂时无法使用')
            $flow.files = array()
        }
    }
    $scope.uploadFile = function($flow ){
        $flow.opts.headers={
            "x-session-token":SessionService.getToken()
        };
        $flow.opts.target = "/api/user/upload/"+userid;
        $flow.upload();
        //fd =FormDataObj($files[0]);
        //console.log(fd);
        //CodeAPIService.uploadFile(userid,$files[0])
        //    .then(function(data){
        //        console.log(data)
        //    },function(err){
        //        console.log(err)
        //    })
        //console.log($files[0])
    }
}