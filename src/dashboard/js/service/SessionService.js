/**
 * Created by zpl on 15-3-22.
 * 专门存储token
 */
angular.module('RDash').
    factory('SessionService',['$localStorage', function($localStorage){
        return {
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
                if($localStorage.token)
                    return true;
                return true;
            },
            getToken:function(){
                var token = $localStorage.token;
                if(token == null){
                    this.login();
                    token = $localStorage.token;
                }
                return token;
            },
            login:function(){
                $localStorage.token= "xxjjskldifu";
            },
            logout:function(){
                delete $localStorage.token;
            }
        }
    }]);
