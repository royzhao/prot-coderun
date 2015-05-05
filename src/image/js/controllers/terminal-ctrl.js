/**
 * Created by Administrator on 2015/3/26.
 */
angular.module('Image')
    .controller('TerminalCtrl', ['SessionService','$scope', '$cookies','$stateParams', '$location','sharedProperties','Image','$window','ngDialog','loginService', TerminalCtrl]);


function TerminalCtrl(SessionService,$scope,$cookies,$stateParams,$location,sharedProperties,Image,$window,ngDialog,loginService) {
    //$scope.apiUrl = "http://127.0.0.1:8080/user/";
    loginService.login();
    $scope.user = SessionService.getUserinfo();
    $scope.apiUrl = "http://vpn.peilong.me:8080/user/";
    //alert($scope.apiUrl);
    $scope.uid = parseInt($cookies.get("u_id"));
    $scope.baseimage = $stateParams.base;
    if(sharedProperties.isEdit()) {
        var image = sharedProperties.getImage();
        $scope.tag = image.Tag;
    } else if(sharedProperties.isCreate()) {
        $scope.tag = 'latest';
    } else {
        return;
    }
    $scope.commit = function() {
        var image = {};
        document.getElementById("console").style.display="none";
        document.getElementById("loading").style.display="block";
        //var dialog = ngDialog.open({template:'templates/dialog/loading.html'});
        if(sharedProperties.isEdit()) {
            image = sharedProperties.getImage();
            image.Tag += 1;
            Image.edit({action:'edit'},image).$promise.then(function(c){
                //$location.path("/term/"+ image.ImageName+"/"+image.basic.Tag);
            }, function(err){
                //$scope.hideLoader();
                //$scope.error = err.data;
                document.getElementById("text").innerHTML = "编辑失败！";
                return false;
            });
            sharedProperties.imageEdited();
        } else if(sharedProperties.isCreate()) {
            var ni = sharedProperties.getImage();
            image = {
                UserId:ni.UserId,
                ImageName:ni.ImageName,
                Tag:1,
                Descrip:ni.Descrip,
                ImageID:1,
                Star:0,
                Fork:0,
                Comm:0,
                Status:0,
                Date:''
            };
            sharedProperties.imageCreated();
        } else {
            $location.path("/");
        }
        Image.commit({action:'commit'},image).$promise.then(function(c){
            //$location.path("/term/"+ $scope.basic.ImageName);
            Image.push({action:'push'},image).$promise.then(function(c) {
                document.getElementById("text").innerHTML = "创建成功！";
                //alert("创建成功！");
                //dialog.close();
                $window.location.href = "http://" + $location.host()+":9000/dashboard.html#/myimage";
            }, function(err) {
                //console.log(err);
                //alert("failure");
                document.getElementById("text").innerHTML = "创建失败！";
                $window.location.href = "http://" + $location.host()+":9000/dashboard.html#/myimage";
                return false;
            });
        }, function(err){
            //$scope.hideLoader();
            //$scope.error = err.data;
            document.getElementById("text").innerHTML = "创建失败！";
            $window.location.href = "http://" + $location.host()+":9000/dashboard.html#/myimage";
            return false;
        });
    }
    $scope.reload = function() {
        var src = document.getElementById("console").src;
        document.getElementById("console").src = src;
    }

}
