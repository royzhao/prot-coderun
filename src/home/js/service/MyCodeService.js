/**
 * Created by zpl on 15-3-18.
 */
angular.module('Home').
    factory('MyCodeService',['CodeAPIService','SessionService','$localStorage',function(CodeAPIService,SessionService,$localStorage){
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
                            if(data instanceof Array){
                                for (var i = data.length - 1; i >= 0; i--) {
                                    $localStorage.codes[data[i].id] = data[i]
                                };

                            }else{
                                $localStorage.codes[data.id] = data
                            }
                            callback(data);
                  },function(error){
                      this.mycode = null;
                      callback(null);
                  })
            },
            getMyOneCodeFromBack : function(codeid,callback){
                    if($localStorage.codes == undefined || $localStorage.codes == null ||$localStorage.codes[codeid] == null){
                        CodeAPIService.getCodeById(codeid).
                            then(function(data){
                                if($localStorage.codes == undefined || $localStorage.codes == null){
                                    $localStorage.codes ={};
                                }
                                $localStorage.codes[codeid] = data
                                callback(data);
                            },function(error){
                                console.log(error);
                                this.mycode = null;
                                callback(null);
                            })
                    }else{
                        callback($localStorage.codes[codeid])
                    }
            },
            getMyCodeFromCache : function(){
                return this.mycode;
            },
            getMyCode : function(callback){
                    this.getMyCodeFromBack(callback);
            },
            getCodeInfoById:function(codeid,callback){
                this.checkUser();
                this.getMyOneCodeFromBack(codeid,callback);
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
                        $localStorage.codes[codeid].steps = data
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
            },
            updateCodeStar:function(userid,codeid,cb){
                CodeAPIService.updateCodeStar(userid,codeid).then(function(data){
                    $localStorage.codes[codeid].star = data.star;
                    cb(null,data)
                },function(err){
                    cb(err,null)
                })
            },
            getHotCodes:function(page,num,key,cb){
                CodeAPIService.getHotCodes(page,num,key).then(function(data){
                    cb(null,data)
                },function(err){
                    cb(err,null)
                })
            }
        }
    }])