/**
 * Created by zpl on 15-2-2.
 */
angular.module('Editor')
    .controller('EditorCtrl', ['$timeout','$scope', '$cookieStore','$stateParams','$localStorage', 'MyCodeService','ngDialog','Images','SessionService','CodeAPIService',EditorCtrl]);

function EditorCtrl($timeout,$scope,$cookieStore,$stateParams,$localStorage,MyCodeService,ngDialog,Images,SessionService,CodeAPIService) {
    $scope.codeid = $stateParams.codeid;
    $scope.stepid = $stateParams.stepid;
    $scope.imageinfo = null;
    $scope.page={};
    $scope.page.toggle = true;
    $scope.page.show = false;
    $scope.page.status = 1;
    console.log($scope.codeid);
    console.log($scope.stepid);
    $scope.flag = {}
    $scope.flag.loged = false;
    $scope.code_show = {}
    $scope.code_show.show = false;
    $scope.code_show.image = "";
    $scope.code_show.msg = "正在准备中。。"

    if(SessionService.isLogin()== true) {
        $scope.flag.loged = true;
        $scope.user = SessionService.getUserinfo();
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
    if($scope.codeid != undefined &&$scope.stepid != undefined ){
        MyCodeService.getMyCodeAllInfo($scope.codeid,$scope.stepid,function(data){
            if(data == null){

            }else{

                $scope.step = data;
                if($scope.editor){
                    $scope.editor.setCode($scope.step.code.post_content)
                }
                //add a button
                var newValue = $scope.getHeight()
                if((newValue-156) <450){
                    $(".redactor_editor").attr("style","height:450px !important")
                }else{
                    $(".redactor_editor").attr("style","height:"+(newValue-156)+"px !important")
                    $(".ace_editor").css("height",(newValue-156)+"px !important")
                    //$(".redactor_editor").css("max-height",(newValue-40)+"px !important")
                }
                if($scope.imageinfo == null){
                    var user = SessionService.getUserinfo()
                    Images.get({id: $scope.step.meta.image_id, action: 'name'}).$promise.then(function(data){
                        $scope.imageinfo =data
                        $scope.page.show = true;
                        //准备容器
                        $scope.code_show.image = data.ImageName+":"+data.Tag;
                        $scope.prepareImage();
                    });
                }else{
                            $scope.page.show = true;
                            //准备容器
                            $scope.code_show.image = data.ImageName+":"+data.Tag;
                            $scope.prepareImage();
                }
            }
        })
    }
    //init


    $scope.panes = [
        {title:$scope.step.meta.code_name,content:"templates/ace_editor.html",active:true},
        {title:"运行代码",content:"templates/run.html",active:false}
    ]
    ;
    $scope.redactorOptions = {
        buttons:['html', 'formatting', 'bold', 'italic', 'deleted',
            'unorderedlist', 'orderedlist', 'outdent', 'indent',
            'image', 'quote', 'link', 'alignment', 'horizontalrule'],
        lang:"zh_cn",
        minHeight:450
    };

    // Called when the editor is completely ready.

    //func
    //prepareImage

    $scope.prepareImage = function(){
        if ($scope.code_show.show || $scope.code_show.image == ""){
            return;
        }else{
            CodeAPIService.prepareImage($scope.code_show.image).
                then(function(data){
                    if(data.status == 3){
                        $scope.code_show.show = true;
                    }else if(data.status == 7){
                        setTimeout($scope.prepareImage,6000);
                    }else{
                        $scope.code_show.msg = "准备失败。！"
                    }
                },function(err){
                    $scope.code_show.msg = "准备失败。！";
                })
        }

    }
    $scope.getImageNameByID = function(id){
        //for (var i = $localStorage.myImages.length - 1; i >= 0; i--) {
        //    if($localStorage.myImages[i].ImageId == id){
        //        return $localStorage.myImages[i].ImageName+":"+$localStorage.myImages[i].Tag
        //    }
        //};
        if($scope.imageinfo != null){
            return $scope.imageinfo.ImageName +":"+$scope.imageinfo.Tag;
        }
        return null
    }
    $scope.getPostContent = function(){
        var content = "";
        //if($scope.editor && $scope.editor.instance && $scope.editor.instance.codemirror){
        //    content = $scope.editor.instance.codemirror.getValue();
        //}
        if($scope.editor){
            content = $scope.editor.getCode()
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
            if(image == null){
                $scope.writeConsole("尚未准备好!请刷新重试");
                return;
            }
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
    $scope.getHeight = function(){
        return window.innerHeight;
    }
    $scope.$watch($scope.getHeight,function(newValue,oldValue){
        //$(".CodeMirror").attr("height",(newValue-40)+"px !important")
        if((newValue-156) <450){
            $(".redactor_editor").attr("style","height:450px !important")
        }else{
            $(".redactor_editor").attr("style","height:"+(newValue-156)+"px !important")
            $(".ace_editor").css("height",(newValue-156)+"px !important")
            //$(".redactor_editor").css("max-height",(newValue-40)+"px !important")
        }
    })
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

    $scope.aceLoaded = function(_editor){
        //option
        _editor.setFontSize(20);
    }
    $scope.logout = function(){
        SessionService.logout();
    }
}