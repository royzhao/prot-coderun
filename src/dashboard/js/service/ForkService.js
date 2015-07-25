angular.module('RDash')
    .factory('Fork', ['$resource',function($resource){
        return $resource('/api/fork/:uid/:id',{uid:'@uid',id:'@id'},{
            'query':{isArray:false,method:'GET'}
        })
    }])