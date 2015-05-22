/**
 * Created by Administrator on 2015/5/20.
 */
angular.module('Home')
.factory('Info',['$resource',function($resource){
        return $resource('/api/user/info/:action/:uid',{},{
            'update':{isArray:false,method:'POST'},
            'get':{isArray:false,method:'GET'}
        })
    }])