/**
 * Created by zpl on 15-3-18.
 */
angular.module('RDash').
    factory('MyCodeService',['CodeAPIService','SessionService',function(CodeAPIService,SessionService){
        return {
            userid:null,
            mycode:null,
            setMyUserId : function(id){
                this.userid = id;
            },
            setMyCode : function(code){
                this.mycode = code;
            },
            checkUser : function(){
                if(this.userid == "" || this.userid == null){
                    var user = SessionService.getUserinfo();
                    this.userid = user.userid;
                }
            },
            getMyCodeFromBack : function(callback){
                this.checkUser();
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
                this.checkUser();
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
                this.checkUser();
                CodeAPIService.getCodeSteps(this.userid,codeid).
                    then(function(data){
                        this.mycode = data;
                        callback(this.mycode);
                    },function(error){
                        console.log(error);
                        this.mycode = null;
                        callback(null);
                    });
            },
            addMyCodeStep: function(codeid,codestep,callback){
                this.checkUser();
                if(typeof codestep.image_id == 'string'){
                    codestep.image_id = parseInt(codestep.image_id)
                }
                CodeAPIService.addCodeStep(this.userid,codeid,codestep).
                    then(function(data){
                        callback(data);
                    },function(error){
                        console.log(error);
                        callback(null);
                    });
            },
            addMyCodeStepCmd: function(codeid,stepid,data,callback){
                this.checkUser();
                CodeAPIService.updateCodeStepCmd(this.userid,codeid,stepid,data).
                    then(function(d){
                        callback(d);
                    },function(error){
                        console.log(error);
                        callback(null);
                    })
            },
            addCode2User:function(obj,cb){
                this.checkUser();
                CodeAPIService.addCode2User(this.userid,obj).then(function(data){
                    cb(data);
                },function(error){
                    cb(error);
                })
            }
        }
    }])