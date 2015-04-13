/**
 * Created by zpl on 15-2-2.
 */
angular.module('Editor')
    .controller('EditorCtrl', ['$scope', '$cookieStore','$stateParams', EditorCtrl]);

function EditorCtrl($scope,$cookieStore,$stateParams) {
    $scope.codeid = $stateParams.codeid;
    $scope.stepid = $stateParams.stepid;
    $scope.page={};
    $scope.page.toggle = true;
    console.log($scope.codeid);
    console.log($scope.stepid);
    $scope.switchIt = function(){
        $scope.toggleSidebar()
    }
    $scope.commit = function(){
        if($scope.editor && $scope.editor.codemirror){
            $scope.markdown = $scope.editor.codemirror.getValue();
            console.log($scope.markdown);
        }
    }

    /**
    * Sidebar Toggle & Cookie Control
    */
    var mobileView = 1024;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
                $scope.page.toggle = true;
        } else {
            $scope.page.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        console.log($scope.page.toggle);
        $scope.page.toggle = !$scope.page.toggle;
        $scope.$apply();
    };
    window.onresize = function() {
        $scope.$apply();
    };

}