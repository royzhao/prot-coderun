/**
 * Created by zpl on 15-3-22.
 * 专门存储token
 */
angular.module('RDash').
    factory('SessionService',['$localStorage','$cookies','User','$window',function($localStorage,$cookies,User,$window){
        return {
            getUserinfo: function(){
                this.login()
                var user ={
                    //userid:1,
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
                //return true;
                if(($cookies.get("token"))==undefined) {
                    return false;
                }
                return true;
            },
            getToken:function(){
                var token = $cookies.get("token");
                if(token == null){
                    //TODO need login,mock login
                    this.login();
                    token = $cookies.get("token");
                }
                return token;
            },
            login:function(){
                if(($cookies.get('token'))==undefined) {
                    alert('请先登陆')
                    $window.location.href = ssoUrl+window.location.href;
                    exit;
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
                //delete $cookies.token;
                //delete $cookies.u_id;
            }
        }
    }]);
