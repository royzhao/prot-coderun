/**
 * Created by Administrator on 2015/4/21.
 */
angular.module('Editor')
    .factory('loginService',['User','$cookies','$window',function(User,$cookies,$window) {
        var verifyData = {
            App_id:null,
            App_key:null,
            Token:null
        }
        return {
            isLogin:function(){
                console.log('login service!')
                if(($cookies.get("token"))==undefined) {
                    $window.location.href = ssoUrl+window.location.href;
                }
            },
            login:function(){
                verifyData.Token = $cookies.get("token");
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