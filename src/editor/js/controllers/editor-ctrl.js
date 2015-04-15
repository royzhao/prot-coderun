/**
 * Created by zpl on 15-2-2.
 */
angular.module('Editor')
    .controller('EditorCtrl', ['$scope', '$cookieStore','$stateParams','$localStorage', EditorCtrl]);

function EditorCtrl($scope,$cookieStore,$stateParams,$localStorage) {
    $scope.codeid = $stateParams.codeid;
    $scope.stepid = $stateParams.stepid;
    $scope.page={};
    $scope.page.toggle = true;
    console.log($scope.codeid);
    console.log($scope.stepid);

    if($localStorage.addstepobj == null){
        $scope.step = {
            meta:{
                id:"",
                name:"",
                description:"",
                code_name:"test.py",
                image_id:0,
                code_id:parseInt($scope.codeid)
            },
            cmds:[
                {Seq:1,Cmd:"",Args:"",Is_replace:1},
                {Seq:2,Cmd:"",Args:"",Is_replace:1},
                {Seq:3,Cmd:"",Args:"",Is_replace:1},
                {Seq:4,Cmd:"",Args:"",Is_replace:1}
            ]
        }
    }else{
        $scope.step = $localStorage.addstepobj;
    }
    $scope.panes = [
        {title:$scope.step.meta.code_name,content:"templates/ace_editor.html",active:true},
        {title:"运行代码",content:"templates/run.html",active:false}
    ]
    $scope.active = function(obj){

        $scope.panes.filter(function(pane){
            pane.active = false;
            if(obj == pane){
                pane.active = true;
            }
        })
    }
    $scope.coderun = function(){
        var header = '>'
        if($scope.page.term){
            $scope.page.term.writeln(header+'运行一次');
        }
    }
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