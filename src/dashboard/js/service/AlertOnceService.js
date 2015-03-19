/**
 * Created by zpl on 15-3-18.
 */
angular.module('RDash').
    factory('AlertOnceService',['$rootScope',function($rootScope){
        return {
                addNotify:function(type,msg){
                    $rootScope.data.push({
                        type:type,
                        msg:msg
                    });
                },
                getAlert:function(callback){
                    callback($rootScope.data);
                }
            }
        }
    ]);