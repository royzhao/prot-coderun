/**
 * Created by Administrator on 2015/4/21.
 */
angular.module('Image')
    .service('loginService',['User','$cookies','$window',function(User,$cookies,$window) {
        var verifyData = {
            App_id:null,
            App_key:null,
            Token:null
        }
        return {
            isLogin:function(){
                console.log('login service!')
                if(($cookies.token)==undefined) {
                    $window.location.href = ssoUrl+window.location.href;
                }
            }
        }
    }])