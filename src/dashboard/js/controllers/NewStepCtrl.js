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
                //var dialog =ngDialog.open({
                //    template: 'templates/pop/wait4add.html',
                //    showClose:false,
                //    closeByDocument:false,
                //    closeByEscape:false,
                //    className: 'ngdialog-theme-default'
                //});
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

}