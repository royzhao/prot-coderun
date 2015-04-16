angular.module('RDash').
   .factory('Star', ['$resource',function($resource){
        return $resource('/dockerapi/star/:uid/:id',{uid:'@uid',id:'@id'},{
            //'star':{isArray:false,method:'POST'},
            //'unstar':{isArray:false,method:'POST'},
            'query':{isArray:false,method:'GET'}
        })
    }])
