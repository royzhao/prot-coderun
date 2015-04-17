angular.module('RDash')
   .factory('Star', ['$resource',function($resource){
        return $resource('/dockerapi/star/:uid/:id',{uid:'@uid',id:'@id'},{
            'query':{isArray:false,method:'GET'}
        })
    }])
