/**
 * Created by zpl on 15-4-8.
 */
angular
    .module('RDash')
    .controller('NewStepCtrl', ['$scope','$stateParams','MyCodeService','ngDialog', NewStepCtrl]);

function NewStepCtrl($scope,$stateParams,MyCodeService,ngDialog){
    $scope.newstep = {
        name:"",
        description:"",
        image_id:0,
        code_id:parseInt($stateParams.codeid)
    };
    $scope.next = function(){
        if ($scope.step.$invalid) {
            return false;
        }
        return true;
    }
    $scope.stepinfo = {
        is_created:false,
        msg:"正在为您创建中，请稍等。。。",
        data:null
    };
    $scope.cmd = {
        commands : [
            {seq:1,cmd:"",args:"",is_replace:false},
            {seq:2,cmd:"",args:"",is_replace:false},
            {seq:3,cmd:"",args:"",is_replace:false},
            {seq:4,cmd:"",args:"",is_replace:false}
        ]
        };
    $scope.addCmd = function(){
        $scope.cmd.commands.push({cmd:"",args:"",is_replace:false});
    }
    $scope.removeCmd = function(i){
        $scope.cmd.commands[i] = {
            seq:0,
            cmd:"",
            args:"",
            is_replace:false
        }
    }
    $scope.upCmd = function(i){
        if(i >0){
            var tmp = $scope.cmd.commands[i-1];
            $scope.cmd.commands[i-1] = $scope.cmd.commands[i];
            $scope.cmd.commands[i] = tmp;
            var seq = $scope.cmd.commands[i-1].seq;
            $scope.cmd.commands[i-1].seq = $scope.cmd.commands[i].seq;
            $scope.cmd.commands[i].seq = seq;
        }
    }
    $scope.downCmd = function(i){
        var len = $scope.cmd.commands.length;
        if(i< len-1){
            var tmp = $scope.cmd.commands[i+1];
            $scope.cmd.commands[i+1] = $scope.cmd.commands[i];
            $scope.cmd.commands[i] = tmp;
            var seq = $scope.cmd.commands[i+1].seq;
            $scope.cmd.commands[i+1].seq = $scope.cmd.commands[i].seq;
            $scope.cmd.commands[i].seq = seq;
        }
    }


    $scope.stepconfig ={
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "slideLeft",
        onStepChanging: function (event, currentIndex, newIndex)
        {
            // Allways allow previous action even if the current form is not valid!
            if (currentIndex > newIndex)
            {
                return true;
            }
            if(currentIndex == 0){
                if($scope.newstep.name == ""||$scope.newstep.description == "" || $scope.newstep.image_id == 0){
                    alert("请填写好表单");
                    return false;
                }
                MyCodeService.addMyCodeStep($stateParams.codeid,$scope.newstep,function(data){
                    console.log(data);
                    //dialog.close();
                    if(data == null){
                        $scope.stepinfo.msg="服务器装逼被雷劈了。。。，请稍后在找它";
                    }else{
                        $scope.stepinfo.data = data;
                        $scope.stepinfo.is_created = true;
                    }
                })

                return true;
            }
            if(currentIndex == 1){
                $scope.stepinfo.is_created = false;
                MyCodeService.addMyCodeStepCmd($stateParams.codeid,$scope.stepinfo.data.id,$scope.cmd.commands,function(data){
                    console.log(data);
                    if(data == null){
                        $scope.stepinfo.msg="服务器装逼被雷劈了。。。，请稍后在找它";
                    }else{
                        $scope.stepinfo.data = data;
                        $scope.stepinfo.is_created = true;
                    }
                })
            }
            return true;
        },
        onStepChanged: function (event, currentIndex, priorIndex)
        {
            //// Used to skip the "Warning" step if the user is old enough.
            //if (currentIndex === 2 && Number($("#age-2").val()) >= 18)
            //{
            //    form.steps("next");
            //}
            //// Used to skip the "Warning" step if the user is old enough and wants to the previous step.
            //if (currentIndex === 2 && priorIndex === 3)
            //{
            //    form.steps("previous");
            //}
        },
        onFinishing: function (event, currentIndex)
        {
            return true;
        },
        onFinished: function (event, currentIndex)
        {
            alert("Submitted!");
        }
    }
    $('#step-create').steps($scope.stepconfig);

}