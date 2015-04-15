/**
 * Created by zpl on 15-3-22.
 * 专门存储token
 */
angular.module('Editor').
    factory('SessionService',['$localStorage', function($localStorage){
        return {
            getUserinfo: function(){
                var user = $localStorage.user;
                if(user == null){
                    //TODO need login,mock login
                    this.login();
                    user = $localStorage.user;
                }
                return user;
            },
            isNeedAuth:function(uri,method){
                //check url is contain api
                if(uri.indexOf('api')){
                    if(method == 'POST' || method== 'PUT' ||method=='DELETE'){
                        return true;
                    }
                }
                return false;
            },
            isLogin:function(){
                //if($localStorage.token)
                //    return true;
                //return false;
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
                $localStorage.token= "xxjjskldifu";
                $localStorage.user = {
                    userid:2,
                    name : "培龙",
                    userimg : 'img/avatar.jpg'
                };
            },
            logout:function(){
                delete $localStorage.token;
                delete $localStorage.user;
            }
        }
    }]);
