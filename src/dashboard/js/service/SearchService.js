/**
 * Created by Administrator on 2015/5/4.
 */
angular.module('RDash').
    factory('CodeAPIService',['$http','$q','RestfulService',function($http,$q,RestfulService){
        return {
            getHotImages: function(){
                return RestfulService.restfulOp({
                    url:baseUrl+"/code/",
                    method:"GET"
                });
            }

        }
    }])