/**
 * Created by zpl on 15-3-23.
 */
'use strict';

/**
 * Route run for the RDash module.
 */
angular.module('RDash').run(function(Permission,SessionService){
    // Define anonymous role
    Permission.defineRole('anonymous', function (stateParams) {
        // If the returned value is *truthy* then the user has the role, otherwise they don't
        if (!SessionService.isLogin()) {
            return true; // Is anonymous
        }
        return false;
    });
})
;