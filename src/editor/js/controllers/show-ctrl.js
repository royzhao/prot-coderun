/**
 * Created by zpl on 15-2-10.
 */
angular.module('Editor')
    .controller('ShowCtrl', ['$timeout','$scope', '$cookieStore','$stateParams','$localStorage', 'MyCodeService','ngDialog', ShowCtrl]);

function ShowCtrl($timeout,$scope,$cookieStore,$stateParams,$localStorage,MyCodeService,ngDialog){
    $scope.codeid = $stateParams.codeid;
    $scope.stepid = $stateParams.stepid;
    $scope.page={};
    $scope.page.toggle = true;
    $scope.page.show = false;
    $scope.page.status = 1;
    console.log($scope.codeid);
    console.log($scope.stepid);
    if($localStorage.addstepobj == null){
        $scope.step = {
            meta:{
                id:"",
                name:"",
                description:"",
                code_name:"test.py",
                work_dir:"/root",
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

    //add code content
    $scope.step.code = {
        code_content :"",
        post_content:"",
        id:null
    };
    $scope.panes = [
        {title:$scope.step.meta.code_name,content:"templates/ace_editor.html",active:true},
        {title:"运行代码",content:"templates/run.html",active:false}
    ]

    //init
    MyCodeService.getMyCodeAllInfo($scope.codeid,$scope.stepid,function(data){
        if(data == null){

        }else{
            $scope.page.show = true;
            $scope.step = data;
        }
    })


    $scope.active = function(obj){

        $scope.panes.filter(function(pane){
            pane.active = false;
            if(obj == pane){
                pane.active = true;
            }
        })
    }

    $scope.queryRunRes = function(){
        setTimeout(function(){
            MyCodeService.queryRunRes($scope.run_res.run_id,function(err,data){
                if(err != null){
                    $scope.writeConsole("some error happen");
                }else{
                    $scope.run_res.data = data;
                    if(data && data.status == 2){
                        //successful
                        $scope.writeConsole(data.res);
                    }else{
                        setTimeout($scope.queryRunRes,3000);
                    }
                }
            })
        },3000);
    }
    $scope.writeConsole = function(s){
        var header = '> '
        $scope.page.term.writeln(header+s);
    }

    $scope.coderun = function(){
        if($scope.page.term){
            console.log($scope.step)
            $scope.writeConsole("running");
            MyCodeService.runCode($scope.step,function(err,data){
                if(err == null){
                    $scope.run_res = {};
                    $scope.run_res.run_id = data.run_id;
                    $scope.writeConsole(data.res);
                    $scope.queryRunRes();

                }else{
                    $scope.writeConsole("failed commit!")
                }
            })

        }
    }
    $scope.switchIt = function(){
        $scope.toggleSidebar()
    }


    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 580;

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