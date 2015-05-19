/**
 * Created by zpl on 15-3-22.
 * http发射器
 */

angular.module('Editor').
    factory('RestfulService',['$http','$q',function($http,$q){
        return {
            restfulOp:function(config){
                return $http(
                    config
                ).then(function(response) {
                        console.log(response);
                        if(typeof response != 'object'){
                            return $q.reject({error:"server error"});
                        }
                        if (typeof response.data === 'object') {
                            var data = response.data;
                            if (data == null) {
                                return $q.reject(response.data);
                            } else {
                                // invalid response
                                return response.data;
                            }
                        } else {
                            // invalid response
                            return $q.reject(response.data);
                        }

                    }, function(response) {
                        // something went wrong
                        return $q.reject(response.data);
                    });
            }
        }
    }
    ]);
