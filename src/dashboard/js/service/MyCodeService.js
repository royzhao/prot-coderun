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
                CodeAPIService.getCodeById(codeid).
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
            getCodeInfoById:function(codeid,callback){
                this.checkUser();
                if(this.mycode == null){
                    this.getMyOneCodeFromBack(codeid,callback);
                }else{
                    for(t in this.mycode){
                        if(t.id == codeid){
                            callback(t);
                        }
                    }
                    callback(this.getMyCodeFromCache);
                }
            },
            getMyCodeOneStep:function(codeid,stepid,callback){
                CodeAPIService.getCodeStepById(codeid,stepid).
                    then(function(data){
                        callback(data);
                    },function(error){
                        console.log(error);
                        callback(null);
                    })
            },
            getMyCodeStep: function(codeid,callback){
                CodeAPIService.getCodeSteps(codeid).
                    then(function(data){
                        this.mycode = data;
                        callback(this.mycode);
                    },function(error){
                        console.log(error);
                        this.mycode = null;
                        callback(null);
                    });
            },
            getMyCodeAllInfo: function(codeid,stepid,callback){
                CodeAPIService.getCodeStepDetail(codeid,stepid).
                    then(function(data){
                        callback(data);
                    },function(error){
                        console.log(error);
                        callback(null);
                    });
            },
            addMyCodeStep: function(codeid,codestep,callback){
                this.checkUser();
                if(typeof codestep.image_id == 'string'){
                    codestep.image_id = parseInt(codestep.image_id)
                }
                if(codestep.id != null && codestep.id != ""){
                    CodeAPIService.updateCodeStep(this.userid,codeid,codestep.id,codestep).
                        then(function(data){
                            callback(data);
                        },function(error){
                            console.log(error);
                            callback(null);
                        });
                }else{
                    codestep.id = null;
                    CodeAPIService.addCodeStep(this.userid,codeid,codestep).
                        then(function(data){
                            callback(data);
                        },function(error){
                            console.log(error);
                            callback(null);
                        });
                }

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
            addMyContentStep: function(codeid,stepid,data,callback){
                this.checkUser();
                CodeAPIService.updateCodeStepDetail(this.userid,codeid,stepid,data).
                    then(function(d){
                        callback(d);
                    },function(error){
                        console.log(error);
                        callback(null);
                    })
            },
            addCode2User:function(obj,cb){
                this.checkUser();
                if(obj &&obj.id == undefined){
                    CodeAPIService.addCode2User(this.userid,obj).then(function(data){
                        cb(data);
                    },function(error){
                        cb(error);
                    })
                }  else{
                    CodeAPIService.updateCode(this.userid,obj).then(function(data){
                        cb(data);
                    },function(error){
                        cb(error);
                    })
                }

            },
            runCode:function(image,obj,cb){
                CodeAPIService.coderun(image,obj).then(function(data){
                    cb(null,data);
                },function(error){
                    cb(error,null)
                })
            },
            queryRunRes:function(id,cb){
                CodeAPIService.coderunRes(id).then(function(data){
                    cb(null,data)
                },function(err){
                    cb(err,null)
                })
            }
        }
    }])