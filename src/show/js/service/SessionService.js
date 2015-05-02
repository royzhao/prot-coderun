/**
 * Created by zpl on 15-3-22.
 * 专门存储token
 */
angular.module('Show').
    factory('SessionService',['$localStorage','$cookies','User','$window', function($localStorage,$cookies,User,$window){
        return {
            getUserinfo: function(){
                this.login()
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
                var token = $cookies.token;
                if(token == null){
                    //TODO need login,mock login
                    this.login();
                    token = $cookies.token;
                }
                return token;
            },
            login:function(){

                if(($cookies.token)==undefined) {
                    alert('请先登陆')
                    $window.location.href = ssoUrl+window.location.href;
                }
            },
            logout:function(){
                //delete $cookies.token;
            }
        }
    }]);
