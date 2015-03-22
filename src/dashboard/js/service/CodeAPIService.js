/**
 * Created by zpl on 15-3-16.
 */
angular.module('RDash').
    factory('CodeAPIService',['$http',function($http){
        return {
            getCodesByUser: function(userid,callback){
                $http({
                    url:baseUrl+"/code/"+userid,
                    method:"GET"
                }).
                    success(function(data,status,headers,config){
                        console.log(data);
                        if (data == null ||data.hasOwnProperty("code")){
                            // error
                            callback(array());
                        }else{
                            callback(data);
                        }
                    }).
                    error(function(data,status,headers,config){
                        console.log(data);
                        callback(array());
                })
            },
            getCodeById: function(userid,id,callback){
                $http({
                    url:baseUrl+"/code/"+userid+"/"+id,
                    method:"GET"
                }).
                    success(function(data,status,headers,config){
                        console.log(data);
                        if (data == null ||data.hasOwnProperty("code")){
                            // error
                            callback(array());
                        }else{
                            callback(data);
                        }
                    }).
                    error(function(data,status,headers,config){
                        console.log(data);
                        callback(array());
                    })
            },
            addCode2User: function(userid,codeinfo,callback){
                $http({
                    url:baseUrl+"/code/"+userid,
                    method:"POST",
                    data:codeinfo
                }).
                    success(function(data,status,headers,config){
                        console.log(data);
                        if (data == null ||data.hasOwnProperty("code")){
                            // error
                            callback(null);
                        }else{
                            callback(data);
                        }
                    }).
                    error(function(data,status,headers,config){
                        console.log(data);
                        callback(array());
                    })
            },
            updateCode:function(userid,codeinfo,callback){
                $http({
                    url:baseUrl+"/code/"+userid+"/"+codeinfo.Id,
                    method:"PUT",
                    data:codeinfo
                }).
                    success(function(data,status,headers,config){
                        console.log(data);
                        if (data == null ||data.hasOwnProperty("code")){
                            // error
                            callback(null);
                        }
                        callback(array());
                    }).
                    error(function(data,status,headers,config){
                        console.log(data);
                        callback(array());
                    })
            },
            deleteCode:function(userid,codeid,callback){
                $http({
                    url:baseUrl+"/code/"+userid+"/"+codeid,
                    method:"DELETE"
                }).
                    success(function(data,status,headers,config){
                        console.log(data);
                        if (data == null ||data.hasOwnProperty("code")){
                            // error
                            callback(false);
                        }
                        callback(true);
                    }).
                    error(function(data,status,headers,config){
                        console.log(data);
                        callback(false);
                    })
            },
            getCodeSteps:function(userid,codeid,callback){
                $http({
                    url:baseUrl+"/code/"+userid+"/"+codeid+"/step",
                    method:"GET"
                }).
                    success(function(data,status,headers,config){
                        console.log(data);

                        if (data == null || data.hasOwnProperty("code")){
                            // error
                            callback(null);
                        }else{
                            callback(data);
                        }
                    }).
                    error(function(data,status,headers,config){
                        console.log(data);
                        callback(null);
                    })
            },
            getCodeStepById: function(userid,codeid,stepid,callback){
                $http({
                    url:baseUrl+"/code/"+userid+"/"+codeid+"/step/"+stepid,
                    method:"GET"
                }).
                    success(function(data,status,headers,config){
                        console.log(data);
                        if (data == null ||data.hasOwnProperty("code")){
                            // error
                            callback(null);
                        }else{
                            callback(data);
                        }
                    }).
                    error(function(data,status,headers,config){
                        console.log(data);
                        callback(null);
                    })
            },
            addCodeStep: function(codeid,codestep,callback){
                $http({
                    url:baseUrl+"/code/"+userid+"/"+codeid,
                    method:"POST",
                    data:codestep
                }).
                    success(function(data,status,headers,config){
                        console.log(data);
                        if (data == null ||data.hasOwnProperty("code")){
                            // error
                            callback(null);
                        }else{
                            callback(data);
                        }
                    }).
                    error(function(data,status,headers,config){
                        console.log(data);
                        callback(null);
                    })
            },
            updateCodeStep: function(userid,codeid,stepid,codestep,callback){
                $http({
                    url:baseUrl+"/code/"+userid+"/"+codeid+"/step/"+stepid,
                    method:"PUT",
                    data:codestep
                }).
                    success(function(data,status,headers,config){
                        console.log(data);
                        if (data == null ||data.hasOwnProperty("code")){
                            // error
                            callback(null);
                        }
                        callback(data);
                    }).
                    error(function(data,status,headers,config){
                        console.log(data);
                        callback(null);
                    })
            },
            deleteCodeStep: function(userid,codeid,stepid,callback){
                $http({
                    url:baseUrl+"/code/"+userid+"/"+codeid+"/step/"+stepid,
                    method:"DELETE"
                }).
                    success(function(data,status,headers,config){
                        console.log(data);
                        if (data == null ||data.hasOwnProperty("code")){
                            // error
                            callback(false);
                        }
                        callback(true);
                    }).
                    error(function(data,status,headers,config){
                        console.log(data);
                        callback(false);
                    })
            },
            getCodeStepDetail: function(userid,codeid,stepid,callback){
                $http({
                    url:baseUrl+"/code/"+userid+"/"+codeid+"/step/"+stepid,
                    method:"GET"
                }).
                    success(function(data,status,headers,config){
                        console.log(data);
                        if (data == null ||data.hasOwnProperty("code")){
                            // error
                            callback(null);
                        }else{
                            callback(data);
                        }
                    }).
                    error(function(data,status,headers,config){
                        console.log(data);
                        callback(null);
                    })
            },
            updateCodeStepDetail: function(userid,codeid,stepid,codestepdetail,callback){
                $http({
                    url:baseUrl+"/code/"+userid+"/"+codeid+"/step/"+stepid,
                    method:"PUT",
                    data:codestepdetail
                }).
                    success(function(data,status,headers,config){
                        console.log(data);
                        if (data == null ||data.hasOwnProperty("code")){
                            // error
                            callback(null);
                        }
                        callback(data);
                    }).
                    error(function(data,status,headers,config){
                        console.log(data);
                        callback(null);
                    })
            },
            coderun: function(imageid,runinfo,callback){
                $http({
                    url:baseUrl+"/code/run/"+imageid,
                    method:"PUT",
                    data:runinfo
                }).
                    success(function(data,status,headers,config){
                        console.log(data);
                        if (data == null ||data.hasOwnProperty("code")){
                            // error
                            callback(null);
                        }
                        callback(data);
                    }).
                    error(function(data,status,headers,config){
                        console.log(data);
                        callback(null);
                    })
            },
            coderunRes: function(runid,callback){
                $http({
                    url:baseUrl+"/code/run/"+runid,
                    method:"GET"
                }).
                    success(function(data,status,headers,config){
                        console.log(data);
                        if (data == null ||data.hasOwnProperty("code")){
                            // error
                            callback(null);
                        }
                        callback(data);
                    }).
                    error(function(data,status,headers,config){
                        console.log(data);
                        callback(null);
                    })
            }

        }
    }])