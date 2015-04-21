/**
 * Created by Administrator on 2015/4/21.
 */
angular.module('Image')
.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])