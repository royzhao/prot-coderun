/**
 * Created by zpl on 15-4-15.
 */
angular
    .module('Editor')
    .directive('consolelog', [consolelog]);
function consolelog(){
    return {
        restrict: 'E',
        scoep:{
            name:'@'
        },
        template:'<span>{{name}}<div class="term"></div></span>',
        link : function(scope, element, attrs) {
            var term = new Terminal({
                cols:80,
                rows:14
            });
            term.open(element.find("div")[0])
            term.write('welcome!\r\n')
            scope.page.term = term;
        }
    }
}