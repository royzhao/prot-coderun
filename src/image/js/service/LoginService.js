/**
 * Created by Administrator on 2015/4/21.
 */
angular.module('Image')
    .service('loginService',['User','$cookies','$window',function(User,$cookies,$window) {
        var verifyData = {
            App_id:1,
            App_key:"Ei1F4LeTIUmJeFdO1MfbdkGQpZMeQ0CUX3aQD4kMOMVsRz7IAbjeBpurD6LTvNoI",
            Token:null
        }
        return {
            isLogin:function(){
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
            }
        }
    }])