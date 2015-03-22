/**
 * Created by zpl on 15-3-18.
 */
angular.module('RDash').
    factory('MyCodeService',['CodeAPIService',function(CodeAPIService){
        return {
            userid:null,
            mycode:null,
            setMyUserId : function(id){
                this.userid = id;
            },
            setMyCode : function(code){
                this.mycode = code;
            },
            getMyCodeFromBack : function(callback){
                if(this.userid == null){
                    callback(null);
                }
              CodeAPIService.getCodesByUser(this.userid).
                  then(function(data){
                      this.mycode = data;
                      callback(this.mycode);
                  },function(error){
                      this.mycode = null;
                      callback(null);
                  })

            },
            getMyOneCodeFromBack : function(codeid,callback){
                if(this.userid == null){
                    callback(null);
                };
                CodeAPIService.getCodeById(this.userid,codeid).
                    then(function(data){
                        this.mycode = data;
                        callback(this.mycode);
                    },function(error){
                        console.log(error);
                        this.mycode = null;
                        callback(null);
                    })
            },
            getMyCodeFromCache : function(){
                return this.mycode;
            },
            getMyCode : function(callback){
                if(this.mycode == null){
                    this.getMyCodeFromBack(callback);
                }else{
                    callback(this.getMyCodeFromCache);
                }
            },
            getMyCodeStep: function(codeid,callback){
                CodeAPIService.getCodeSteps(this.userid,codeid).
                    then(function(data){
                        this.mycode = data;
                        callback(this.mycode);
                    },function(error){
                        console.log(error);
                        this.mycode = null;
                        callback(null);
                    });
            }
        }
    }])