/**
 * Created by Administrator on 2015/5/4.
 */
angular.module('RDash').
    factory('ImagehubService',['SearchService',function(SearchService){
        return {
            getHotImages:function(page,num,key,cb){
                SearchService.getHotImages(page,num,key).then(function(data){
                    cb(null,data)
                },function(err){
                    cb(err,null)
                })
            }
        }
    }])