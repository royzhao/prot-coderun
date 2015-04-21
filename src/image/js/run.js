/**
 * Created by zpl on 15-3-23.
 */
'use strict';

/**
 * Route run for the RDash module.
 */
angular.module('Image').run(['Permission','$cookies',function(Permission,$cookies){
    // Define anonymous role
    Permission.defineRole('anonymous', function () {
        // If the returned value is *truthy* then the user has the role, otherwise they don't
        if(($cookies.token)==undefined) {
            return true;
        }
        return false;
    });
}])
;