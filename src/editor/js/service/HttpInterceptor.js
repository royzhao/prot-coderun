/**
 * Created by zpl on 15-3-22.
 * 拦截器
 */
angular.module('Editor').
    factory('httpInterceptor',['$q','$cookies', function($q,$cookies){
        var isNeedAuth=function(uri,method){
            //check url is contain api
            if(uri.indexOf('api')){
                if(method == 'POST' || method== 'PUT' ||method=='DELETE'){
                    return true;
                }
            }
            return false;
        };
        var httpInterceptor = {
            request: function(config) {
                if (isNeedAuth(config.url,config.method)) {
                    if(($cookies.token)==undefined) {
                        return $q.reject(config);
                    }
                    config.headers['x-session-token'] = $cookies.token;
                }
                return config;
            },
            response : function(response) {
                return response;
            },
            responseError : function(response) {
                if (response.status == 401) {
                    alert('must login');
                    return $q.reject(response);
                } else if (response.status === 404) {
                    alert("404!");
                    return $q.reject(response);
                }
            },
            requestError : function(config){
                return $q.reject(config);
            }
        };
        return httpInterceptor;
    }
    ]);
