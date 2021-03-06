/**
 * Created by zpl on 15-3-22.
 * 拦截器
 */
angular.module('Show').
    factory('httpInterceptor',['$q','$cookies', function($q,$cookies){
        var isNeedAuth=function(uri,method){
            //check url is contain api
            if(uri.indexOf('api')>0){
                if(uri.split('coderun')>1){
                    return false;
                }
                if(method == 'POST' || method== 'PUT' ||method=='DELETE'){
                    return true;
                }
            }
            return false;
        };
        var httpInterceptor = {
            request: function(config) {
                if(config.url.indexOf('api')>0){
                    config.url =apiService + config.url;
                }
                if (isNeedAuth(config.url,config.method)) {
                    if(($cookies.get("token"))==undefined) {
                        return $q.reject(config);
                    }
                    config.headers['x-session-token'] = $cookies.get("token");
                }
                return config;
            },
            response : function(response) {
                return response;
            },
            responseError : function(response) {
                if (response.status == 401) {
                    alert('must login');
                    window.location.href = ssoUrl+window.location.href;
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
