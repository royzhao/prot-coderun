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
              CodeAPIService.getCodesByUser(this.userid,function(data){
                  this.mycode = data;
                  callback(this.mycode);
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
            }
        }
    }])