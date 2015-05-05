/**
 * Created by Administrator on 2015/5/4.
 */
angular.module('RDash').
    factory('SearchService',['$http','$q','RestfulService',function($http,$q,RestfulService){
        return {
            getHotImages: function(page,num,key){
                return RestfulService.restfulOp({
                    url:imageUrl+"/images?page="+page+"&num="+num+"&key="+key,
                    method:"GET"
                });
            }
        }
    }])