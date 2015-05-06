/**
 * Created by zpl on 15-3-16.
 */
angular.module('RDash').
    factory('CodeAPIService',['$http','$q','RestfulService',function($http,$q,RestfulService){
        return {
            getCodesByUser: function(userid,page,num,key){
                return RestfulService.restfulOp({
                    url:baseUrl+"/user/code/"+userid+"?page="+page+"&num="+num+"&key="+key,
                    method:"GET"
                });
            },
            getCodeById: function(id){
                return RestfulService.restfulOp({
                    url:baseUrl+"/code/"+id,
                    method:"GET"
                });
            },
            addCode2User: function(userid,codeinfo){
                return RestfulService.restfulOp({
                    url:baseUrl+"/user/code/"+userid,
                    method:"POST",
                    data:codeinfo
                });

            },
            updateCode:function(userid,codeinfo){
                return RestfulService.restfulOp({
                    url:baseUrl+"/code/"+userid+"/"+codeinfo.id,
                    method:"PUT",
                    data:codeinfo
                });

            },
            deleteCode:function(userid,codeid){
                return RestfulService.restfulOp({
                    url:baseUrl+"/code/"+userid+"/"+codeid,
                    method:"DELETE"
                });

            },
            getCodeSteps:function(codeid){
                return RestfulService.restfulOp({
                    url:baseUrl+"/code/"+codeid+"/step",
                    method:"GET"
                });
            },
            getCodeStepById: function(codeid,stepid){
                return RestfulService.restfulOp({
                    url:baseUrl+"/code/"+codeid+"/step/"+stepid,
                    method:"GET"
                });

            },
            addCodeStep: function(userid,codeid,codestep){
                return RestfulService.restfulOp({
                    url:baseUrl+"/code/"+userid+"/"+codeid+"/step",
                    method:"POST",
                    data:codestep
                });

            },
            updateCodeStepCmd: function(userid,codeid,stepid,data){
                return RestfulService.restfulOp({
                    url:baseUrl+"/code/"+userid+"/"+codeid+"/step/"+stepid+"/cmd",
                    method:"PUT",
                    data:data
                })
            },
            updateCodeStep: function(userid,codeid,stepid,codestep){
                return RestfulService.restfulOp({
                    url:baseUrl+"/code/"+userid+"/"+codeid+"/step/"+stepid,
                    method:"PUT",
                    data:codestep
                });

            },
            deleteCodeStep: function(userid,codeid,stepid){
                return RestfulService.restfulOp({
                    url:baseUrl+"/code/"+userid+"/"+codeid+"/step/"+stepid,
                    method:"DELETE"
                });

            },
            getCodeStepDetail: function(codeid,stepid){
                return RestfulService.restfulOp({
                    url:baseUrl+"/code/"+codeid+"/step/"+stepid+"/detail",
                    method:"GET"
                });
            },
            updateCodeStepDetail: function(userid,codeid,stepid,codestepdetail){
                return RestfulService.restfulOp({
                    url:baseUrl+"/code/"+userid+"/"+codeid+"/step/"+stepid+"/detail",
                    method:"PUT",
                    data:codestepdetail
                });

            },
            coderun: function(imageid,runinfo){
                return RestfulService.restfulOp({
                    url:baseUrl+"/coderun/"+imageid,
                    method:"PUT",
                    data:runinfo
                });

            },
            coderunRes: function(runid){
                return RestfulService.restfulOp({
                    url:baseUrl+"/coderun/"+runid,
                    method:"GET"
                });

            },
            updateCodeStar: function(userid,codeid){
                return RestfulService.restfulOp({
                    url:baseUrl+"/code/star/"+userid+"/"+codeid,
                    method:"PUT",
                    data:{userid:userid,codeid:codeid}
                });
            },
            getHotCodes: function(page,num,key){
                if(page == undefined || page == null){
                    page = 1;
                }
                if(num == undefined || num == null){
                    num = 5;
                }
                if(key == undefined || key == null){
                    key = "";
                }
                return RestfulService.restfulOp({
                    url:baseUrl+"/code?page="+page+"&num="+num+"&key="+key,
                    method:"GET"
                });
            },
            getCodeIssues: function(codeid,page,num,key){
                if(page == undefined || page == null){
                    page = 1;
                }
                if(num == undefined || num == null){
                    num = 5;
                }
                if(key == undefined || key == null){
                    key = "";
                }
                return RestfulService.restfulOp({
                    url:baseUrl+"/code/"+codeid+"/issues?page="+page+"&num="+num+"&key="+key,
                    method:"GET"
                });
            },
            addCodeIssue: function(userid,codeid,obj){
                return RestfulService.restfulOp({
                    url:baseUrl+"/code/"+userid+"/"+codeid+"/issue",
                    method:"POST",
                    data:obj
                });
            },
            updateCodeIssue: function(userid,codeid,issueid,obj){
                return RestfulService.restfulOp({
                    url:baseUrl+"/code/"+userid+"/"+codeid+"/issue/"+issueid,
                    method:"PUT",
                    data:obj
                });
            },
            deleteCodeIssue: function(userid,codeid,issueid){
                return RestfulService.restfulOp({
                    url:baseUrl+"/code/"+userid+"/"+codeid+"/issue/"+issueid,
                    method:"DELETE"
                });
            },
            getIssuesComments: function(issueid,page,num,key){
                if(page == undefined || page == null){
                    page = 1;
                }
                if(num == undefined || num == null){
                    num = 5;
                }
                if(key == undefined || key == null){
                    key = "";
                }
                return RestfulService.restfulOp({
                    url:baseUrl+"/issue/"+issueid+"/comments?page="+page+"&num="+num+"&key="+key,
                    method:"GET"
                });
            },
            addCodeIssueComment: function(userid,issueid,obj){
                return RestfulService.restfulOp({
                    url:baseUrl+"/issue/"+userid+"/"+issueid+"/comment",
                    method:"POST",
                    data:obj
                });
            },
            updateCodeIssueComment: function(userid,issueid,commentid,obj){
                return RestfulService.restfulOp({
                    url:baseUrl+"/issue/"+userid+"/"+issueid+"/comment/"+commentid,
                    method:"PUT",
                    data:obj
                });
            },
            deleteCodeIssueComment: function(userid,issueid,commentid){
                return RestfulService.restfulOp({
                    url:baseUrl+"/issue/"+userid+"/"+issueid+"/comment/"+commentid,
                    method:"DELETE"
                });
            }
        }
    }])