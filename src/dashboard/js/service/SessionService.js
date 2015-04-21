/**
 * Created by zpl on 15-3-22.
 * 专门存储token
 */
angular.module('RDash').
    factory('SessionService',['$localStorage','$cookies','User','$window', function($localStorage,$cookies,User,$window){
        var verifyData = {
            App_id:1,
            App_key:"Ei1F4LeTIUmJeFdO1MfbdkGQpZMeQ0CUX3aQD4kMOMVsRz7IAbjeBpurD6LTvNoI",
            Token:null
        }
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
                var token = $localStorage.token;
                if(token == null){
                    //TODO need login,mock login
                    this.login();
                    token = $localStorage.token;
                }
                return token;
            },
            login:function(){
                if(($cookies.token)==undefined) {
                    $window.location.href = "http://sso.peilong.me/html/baigoSSO/mypage/login.php?refer=http://image.peilong.me:9000";
                }
                verifyData.Token = $cookies.token;
                User.login({action:'islogin'},verifyData,function(c){
                    if(!c.is_login) {
                        $window.location.href = "http://sso.peilong.me/html/baigoSSO/mypage/login.php?refer=http://image.peilong.me:9000";
                    }
                },function(err){
                    $window.location.href = "http://sso.peilong.me/html/baigoSSO/mypage/login.php?refer=http://image.peilong.me:9000";
                });
            },
            logout:function(){
                delete $localStorage.token;
                delete $localStorage.user;
            }
        }
    }]);
