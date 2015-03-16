/**
 * Created by zpl on 15-3-16.
 */
angular.module('RDash').
    factory('CodeAPIService',['$http',function($http){
        return {
            getCodesByUser: function(userid){
                $http({
                    url:baseUrl+"/code/"+userid,
                    method:"GET"
                }).
                    success(function(data,status,headers,config){
                        console.log(data);
                        if (data.hasOwnProperty("code")){
                            // error
                            return array()
                        }
                    }).
                    error(function(data,status,headers,config){
                        console.log(data);
                        return array();
                })
            },
            getCodeById: function(userid,id){
                $http({
                    url:baseUrl+"/code/"+userid+"/"+id,
                    method:"GET"
                }).
                    success(function(data,status,headers,config){
                        console.log(data);
                        if (data.hasOwnProperty("code")){
                            // error
                            return array()
                        }
                    }).
                    error(function(data,status,headers,config){
                        console.log(data);
                        return array();
                    })
            },
            addCode2User: function(codeinfo){

            },
            updateCode:function(codeinfo){

            },
            deleteCode:function(userid,codeid){

            },
            getCodeSteps:function(userid,codeid){

            },
            getCodeStepById: function(userid,codeid,stepid){

            },
            addCodeStep: function(codestep){

            },
            updateCodeStep: function(codestep){

            },
            deleteCodeStep: function(userid,codeid,stepid){

            },
            getCodeStepDetail: function(userid,codeid,stepid){

            },
            updateCodeStepDetail: function(codestepdetail){

            },
            coderun: function(userid,codeid,stepid,runinfo){

            }


        }
    }])