/**
 * Created by zpl on 15-3-22.
 * 专门存储token
 */
angular.module('Editor').
    factory('SessionService',['$localStorage','$cookies','User','$window', function($localStorage,$cookies,User,$window){
        return {
            getUserinfo: function(){
                this.login();
                var user ={
                    userid: $cookies.u_id,
                    name:$cookies.u_name
                }
                //if(user == null){
                //    //TODO need login,mock login
                //    user = $localStorage.user;
                //}
                return user;
            },
            isLogin:function(){
                //if($localStorage.token)
                //    return true;
                //return false;
                if(($cookies.token)==undefined) {
                    return false;
                }
                return true;
            },
            getToken:function(){
                return $cookies.token;
            },
            login:function(){
                console.log($cookies.token)
                if(($cookies.token)==undefined) {
                    alert("请先登陆")
                    $window.location.href = "http://sso.peilong.me/html/baigoSSO/mypage/login.php?refer=http://image.peilong.me:9000";
                }
            },
            logout:function(){
                //delete $cookies.token;
            }
        }
    }]);
