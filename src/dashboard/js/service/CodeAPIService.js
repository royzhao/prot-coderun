/**
 * Created by zpl on 15-3-16.
 */
angular.module('RDash').
    factory('CodeAPIService',['$http',function($http){
        return {
            hehe: function(){ return 'hehe';}
        }
    }])