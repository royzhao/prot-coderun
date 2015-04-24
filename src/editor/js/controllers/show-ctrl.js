/**
 * Created by zpl on 15-2-10.
 */
angular.module('Editor')
    .controller('ShowCtrl', ['$timeout','$scope', '$cookieStore','$stateParams','$localStorage', 'MyCodeService','ngDialog', '$sce',ShowCtrl]);

function ShowCtrl($timeout,$scope,$cookieStore,$stateParams,$localStorage,MyCodeService,ngDialog,$sce){
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
    $scope.show={
        post_content :""
    }
    MyCodeService.getMyCodeAllInfo($scope.codeid,$scope.stepid,function(data){
        if(data == null){

        }else{
            var newValue = $scope.getHeight()
            if((newValue-110)<450){
                $(".CodeMirror").attr("style","height:450px !important")
                $(".ace_editor").css("height",(newValue-110)+"px !important")
            }else{
                $(".CodeMirror").attr("style","height:"+(newValue-110)+"px !important")
                $(".ace_editor").css("height",(newValue-110)+"px !important")
            }
            $scope.page.show = true;
            $scope.step = data;
            $scope.show.post_content = $sce.trustAsHtml(data.code.post_content)

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

    var retry_times=0;
    var query_failed = false;
    var commit_ok = false;
    $scope.queryRunRes = function(){
        if(retry_times >3 || query_failed){
            $scope.writeConsole("run failed!pls try again");
            query_failed = true;
            return;
        }
        retry_times++;
        setTimeout(function(){
            MyCodeService.queryRunRes($scope.run_res.run_id,function(err,data){
                if(err != null){
                    $scope.writeConsole("some error happen");
                }else{
                    $scope.run_res.data = data;
                    if(data && data.status == 5){
                        //successful
                        $scope.parse_res(data.res);
                    }else{
                        setTimeout($scope.queryRunRes,3000);
                    }
                }
            })
        },3000);
    }
    $scope.parse_res = function(result){
        var lines = result.split('\r\n')
        for(var i=0;i<lines.length;i++){
            $scope.writeConsole(lines[i])
        }
    }
    $scope.coderun_func = function(){
        if(retry_times >3  || commit_ok){
            $scope.writeConsole("run failed!pls try again");
            commit_ok = false
            return;
        }
        retry_times++;
        if($scope.page.term){
            console.log($scope.step)
            $scope.writeConsole("running");
            var image = $scope.getImageNameByID($scope.step.meta.image_id)
            MyCodeService.runCode(image,$scope.step,function(err,data){
                if(err == null){
                    $scope.run_res = {};
                    $scope.run_res.run_id = data.run_id;
                    $scope.parse_res(data.res);
                    if(data.status ==3){
                        retry_times = 0;
                        commit_ok = true;
                        query_failed = false;
                        $scope.queryRunRes();
                    }else if(data.status ==5){
                        commit_ok = true;
                        query_failed = true;
                        $scope.writeConsole("Task finished!");
                    }else if(data.status == 6) {
                        $scope.writeConsole(data.res);
                        commit_ok = true;
                    }else{
                        $scope.writeConsole("Will retry after 3s....!");
                        setTimeout($scope.coderun_func,3000);
                    }
                }else{
                    $scope.writeConsole("failed commit!")
                }
            })

        }
    }
    $scope.writeConsole = function(s){
        var header = '> '
        $scope.page.term.writeln(header+s);
    }
    $scope.coderun = function(){
        commit_ok = false
        retry_times = 0
        $scope.coderun_func()
    }
    $scope.switchIt = function(){
        $scope.toggleSidebar()
    }


    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 580;
    $scope.getHeight = function(){
        return window.innerHeight;
    }
    $scope.$watch($scope.getHeight,function(newValue,oldValue){
        //$(".CodeMirror").attr("height",(newValue-40)+"px !important")
        if((newValue-110) <450){
            $(".CodeMirror").attr("style","height:450px !important")
            $(".ace_editor").css("height",(newValue-110)+"px !important")
        }else{
            $(".CodeMirror").attr("style","height:"+(newValue-110)+"px !important")
            $(".ace_editor").css("height",(newValue-110)+"px !important")
            //$(".redactor_editor").css("max-height",(newValue-40)+"px !important")
        }
    })
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