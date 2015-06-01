/**
 * Created by zpl on 15-3-22.
 * 专门存储token
 */
angular.module('Image').
    factory('SessionService',['$cookies','User','$window', function($cookies,User,$window){
        return {
            getUserinfo: function(){
                this.login();
                var user ={
                    userid: $cookies.get("u_id"),
                    name:$cookies.get("u_name"),
                    avatar:$cookies.get("u_avatar")
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
                if(($cookies.get("token"))==undefined) {
                    return false;
                }
                return true;
            },
            getToken:function(){
                return $cookies.get("token");
            },
            login:function(){
                console.log($cookies.get("token"))
                if(($cookies.get("token"))==undefined) {
                    alert("请先登陆")
                    $window.location.href = ssoUrl+window.location.href;
                }
            },
            logout:function(){
                $cookies.remove('token',{
                    domain:'.learn4me.com'
                });
                $cookies.remove('u_id',{
                    domain:'.learn4me.com'
                });
                $window.location.href = "/";
            }
        }
    }]);
