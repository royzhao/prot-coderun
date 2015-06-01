/**
 * Created by zpl on 15-6-1.
 * http://7xj4fk.com1.z0.glb.clouddn.com/FpvJ2udpgKgf5D8sne5Ia5DosbHo?imageView2/1/w/200/h/100
 */

angular.module('Editor')
    .factory('PictureService', [function(){
        return {
            ConvertKey2Src:function(key,h,w){
                if (key == "" || key==undefined){
                    key = "default.jpg"
                }
                return "http://7xj4fk.com1.z0.glb.clouddn.com/"+key+"?imageView2/1/"+"w/"+w+"/h/"+h;
            }
        }
    }])