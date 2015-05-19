/**
 * Created by Administrator on 2015/4/21.
 */
angular.module('Home')
.factory('User', ['$resource',function($resource) {
        return $resource('/api/sso/:action',{},{
            'login':{isArray:false,method:'POST'},
            'logout':{isArray:false,method:'POST'}
        })
    }])