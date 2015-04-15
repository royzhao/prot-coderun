/**
 * Created by zpl on 15-3-22.
 * 拦截器
 */
angular.module('Editor').
    factory('httpInterceptor',['SessionService','$q', '$injector', function(SessionService,$q, $injector){
        var httpInterceptor = {
            request: function(config) {
                if (SessionService.isNeedAuth(config.url,config.method)) {
                    config.headers['x-session-token'] = SessionService.getToken();
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
