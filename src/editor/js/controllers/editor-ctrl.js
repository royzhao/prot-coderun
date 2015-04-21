/**
 * Created by zpl on 15-2-2.
 */
angular.module('Editor')
    .controller('EditorCtrl', ['$timeout','$scope', '$cookieStore','$stateParams','$localStorage', 'MyCodeService','ngDialog',EditorCtrl]);

function EditorCtrl($timeout,$scope,$cookieStore,$stateParams,$localStorage,MyCodeService,ngDialog) {
    $scope.codeid = $stateParams.codeid;
    $scope.stepid = $stateParams.stepid;
    $scope.page={};
    $scope.page.toggle = true;
    $scope.page.show = true;
    $scope.page.status = 1;
    console.log($scope.codeid);
    console.log($scope.stepid);
    if($localStorage.myImages == null){
        $scope.page.status = 2;
        return
    }
    $scope.getImageNameByID = function(id){
        for (var i = $localStorage.myImages.length - 1; i >= 0; i--) {
            if($localStorage.myImages[i].ImageId == id){
                return $localStorage.myImages[i].ImageName+":"+$localStorage.myImages[i].Tag
            }
        };
        return null
    }
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
    $scope.editor = {};

    //func
    $scope.getPostContent = function(){
        var content = "";
        if($scope.editor && $scope.editor.instance && $scope.editor.instance.codemirror){
            content = $scope.editor.instance.codemirror.getValue();
        }
        return content;

    }
    $scope.active = function(obj){

        $scope.panes.filter(function(pane){
            pane.active = false;
            if(obj == pane){
                pane.active = true;
            }
        })
    }
    var retry_times=0;
    $scope.queryRunRes = function(){
        if(retry_times >3){
            $scope.writeConsole("run failed!pls try again");
            return;
        }
        retry_times++;
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
            var image = $scope.getImageNameByID($scope.step.meta.image_id)
            MyCodeService.runCode(image,$scope.step,function(err,data){
                if(err == null){
                    $scope.run_res = {};
                    $scope.run_res.run_id = data.run_id;
                    $scope.writeConsole(data.res);
                    retry_times = 0;
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
    $scope.commit = function(){
        var content = $scope.getPostContent();
        if(content == ""){
            alert("请填写内容")
            return;
        }

        var post = {
            id:$scope.step.meta.id,
            code_content:$scope.step.code.code_content,
            post_content:content
        }
        $scope.page.show = false;
        MyCodeService.addMyContentStep($scope.codeid,$scope.stepid,post,function(data){
            if(data == null){
                $scope.page.status = 2;
                console.log('error')
            }else{
                $scope.page.status = 3;
                console.log('ok')
            }
        })
    }

    /**
    * Sidebar Toggle & Cookie Control
    */
    var mobileView = 5;

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