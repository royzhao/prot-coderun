# 码上跑
## 后台,主要包括镜像/代码

## Usage
##实现工具有如下
* [NodeJS](http://nodejs.org/) (with [NPM](https://www.npmjs.org/))
* [Bower](http://bower.io)
* [Gulp](http://gulpjs.com)

### 安装
1. Clone the repository: `https://github.com/royzhao/prot-coderun.git`
2. Install the NodeJS dependencies: `sudo npm install`.
3. Install the Bower dependencies: `bower install`.
4. Run the gulp build task: `gulp build`.
5. Run the gulp default task: `gulp`. This will build any changes made automatically, and also run a live reload server on [http://localhost:8888](http://localhost:8888).

Ensure your preferred web server points towards the `dist` directory.
###注意事项
因为我使用了angular.treeview所以在禁止gulp build之前,需要执行下面的命令
```
cp -r /img /dist
cp -r /lib /dist
```

### 如何开发
目录结构为
```
coderun/
    dist/       -->这个是最终生成的文件
    img/        -->这个作用如上
    lib/        -->作用如上
    src/        -->源代码
        components/     -->bower install 安装的第三方库
        dashboard/      -->这个是后台模块部分的代码
        editor/         -->这个是编辑器模块的代码
        image/          -->这个是镜像的页面
        dashboard.html  -->这个是后台模块的应用进入点
        editor.html     -->这个是代码编辑器的应用进入点
        index.html      -->首页
    bower.json          -->bower 依赖的配置文件
    gulpfile.js         -->gulp的配置文件
```
#### 如何新增加一个模块
我们以editor模块为例,每一个模块都是一个angularjs的程序,模块目录如下
```
    editor/
        img/        -->放图片
        js/         -->js文件
            controllers/    -->控制器
            directives/     -->angularjs的指令
            module.js       -->模块代码
            routes.js       -->路由代码
        templates/          -->模板文件
    editor.html     -->入口文件
```
## editor.html
```
<!doctype html>
<html lang="en" ng-app="Editor">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>码上跑</title>
    <link rel="stylesheet" type="text/css" href="lib/css/angular.treeview.css">
    <!-- STYLES -->
    <!-- build:css lib/css/main-editor.min.css -->
    <link rel="stylesheet" type="text/css" href="components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="components/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="components/rdash-ui/dist/css/rdash.min.css">

    <!-- endbuild -->
    <!-- SCRIPTS -->
    <!-- build:js lib/js/main-editor.min.js -->
    <script type="text/javascript" src="components/angular/angular.min.js"></script>
    <script type="text/javascript" src="components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
    <script type="text/javascript" src="components/angular-cookies/angular-cookies.min.js"></script>
    <script type="text/javascript" src="components/angular-ui-router/release/angular-ui-router.min.js"></script>
    <!-- endbuild -->
    <!-- Custom Scripts -->
    <script type="text/javascript" src="js/editor.min.js"></script>
    <script type="text/javascript" src="lib/js/angular.treeview.min.js"></script>
</head>
<body ng-controller="EditorCtrl">
            <!-- Main Content -->
            <div ui-view></div>
</body>

</html>
```
我们的ng-app是Editor,这里面包含了一系列的必要的js文件,注意注释
```
    <!-- STYLES -->
    <!-- build:css lib/css/main-editor.min.css -->
    <link rel="stylesheet" type="text/css" href="components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="components/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="components/rdash-ui/dist/css/rdash.min.css">

    <!-- endbuild -->
    这个会把上面的css编译成main-editor.min.css
    <!-- SCRIPTS -->
    <!-- build:js lib/js/main-editor.min.js -->
        <script type="text/javascript" src="components/angular/angular.min.js"></script>
        <script type="text/javascript" src="components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
        <script type="text/javascript" src="components/angular-cookies/angular-cookies.min.js"></script>
        <script type="text/javascript" src="components/angular-ui-router/release/angular-ui-router.min.js"></script>
    <!-- endbuild -->
    这个注释会把上面的js编译成main-editor.min.js
```
## module.js
```
angular.module('Editor', ['angularTreeview','ui.bootstrap', 'ui.router', 'ngCookies']);
```
这里我们注册了一个模块叫做Editor,并且加入了必要的引用,
## routes.js
这个是用来路由的
```
'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('Editor').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/editor.html'
            });
    }
]);
```
我们使用ui-router这个angularjs的插件,具体内容可以去github上去找相关资料,这里时我们把所有的访问都默认到editor.html的模板文见上.
## controllers/image-ctrl.js
```
angular.module('Editor')
    .controller('EditorCtrl', ['$scope', '$cookieStore', EditorCtrl]);

function EditorCtrl($scope,$cookieStore) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    //var codeid = $stateParams.codeid;
    //console.log('codeid:'+codeid);
    //mock data
    $scope.treedata =
        [
            { "label" : "代码文件夹1", "id" : "role1", "children" : [
                { "label" : "代码文件1-1", "id" : "role11", "children" : [] },
                { "label" : "代码文件夹1-1", "id" : "role12", "children" : [
                    { "label" : "代码文件夹2-1", "id" : "role121", "children" : [
                        { "label" : "代码文件夹2-1-1", "id" : "role1211", "children" : [] },
                        { "label" : "代码文件夹2-1-2", "id" : "role1212", "children" : [] }
                    ]}
                ]}
            ]},
            { "label" : "hello.c", "id" : "role2", "children" : [] },
            { "label" : "world.c", "id" : "role3", "children" : [] }
        ];
    $scope.$watch( 'abc.currentNode', function( newObj, oldObj ) {
        if( $scope.abc && angular.isObject($scope.abc.currentNode) ) {
            console.log( 'Node Selected!!' );
            console.log( $scope.abc.currentNode );
        }
    }, false);

    //模拟的数据
    $scope.code = {
        'codeid':1,
        'codename':'测试专用4',
        'type':1,
        'imageid':2,
        'typename':'本地程序',
        'imagename':'go语言测试'
    };

    $scope.runCode = function(){
        alert('点击这个运行代码,代码结果输出到下面的控制台!如果是网络程序,那么输出访问地址!');
    }

}
```
这个就是控制器了
## 添加到gulpfile.js中
gulpfile会自动帮我们构建我们的项目
  ```
  var paths = {
      dash_scripts: 'src/dashboard/js/**/*.*',
      dash_styles: 'src/dashboard/less/**/*.*',
      dash_images: 'src/dashboard/img/**/*.*',
      dash_templates: 'src/dashboard/templates/**/*.html',
      dash_index:'src/dashboard.html',

      editor_scripts: 'src/editor/js/**/*.*',
      editor_styles: 'src/editor/less/**/*.*',
      editor_images: 'src/editor/img/**/*.*',
      editor_templates: 'src/editor/templates/**/*.html',
      editor_index:'src/editor.html',

      index: 'src/index.html',
      bower_fonts: 'src/components/**/*.{ttf,woff,eof,svg}',
  };
  ```
  我们先在paths中添加路径
  ```
        editor_scripts: 'src/editor/js/**/*.*',
        editor_styles: 'src/editor/less/**/*.*',
        editor_images: 'src/editor/img/**/*.*',
        editor_templates: 'src/editor/templates/**/*.html',
        editor_index:'src/editor.html',
  ```
  然后在编译的时候增加压缩任务
  ```

  //增加任务build-cusom-editor
  /**
   * Handle custom files editor
   */
  gulp.task('build-custom-editor', ['editor-usemin','custom-editor-images', 'custom-editor-js', 'custom-editor-less', 'custom-editor-templates']);
  gulp.task('editor-usemin', function() {
      return gulp.src(paths.editor_index)
          .pipe(usemin({
              js: [minifyJs(), 'concat'],
              css: [minifyCss({keepSpecialComments: 0}), 'concat'],
          }))
          .pipe(gulp.dest('dist/'));
  });

  gulp.task('custom-editor-images', function() {
      return gulp.src(paths.editor_images)
          .pipe(gulp.dest('dist/img'));
  });

  gulp.task('custom-editor-js', function() {
      return gulp.src(paths.editor_scripts)
          .pipe(minifyJs())
          .pipe(concat('editor.min.js'))
          .pipe(gulp.dest('dist/js'));
  });

  gulp.task('custom-editor-less', function() {
      return gulp.src(paths.editor_styles)
          .pipe(less())
          .pipe(gulp.dest('dist/css'));
  });

  gulp.task('custom-editor-templates', function() {
      return gulp.src(paths.editor_templates)
          .pipe(minifyHTML())
          .pipe(gulp.dest('dist/templates'));
  });

  //注册build-custom-editor
  gulp.task('build', ['usemin', 'build-assets', 'build-custom','build-custom-editor']);
  ```
   下面增加watch部分,这样子我们就可以修改了代码,gulp自动帮我们编译和刷新页面,我们就直接看到效果了
   ```
   /**
    * Watch custom files
    */
   gulp.task('watch', function() {
       gulp.watch([paths.dash_images], ['custom-dash-images']);
       gulp.watch([paths.dash_styles], ['custom-dash-less']);
       gulp.watch([paths.dash_scripts], ['custom-dash-js']);
       gulp.watch([paths.dash_templates], ['custom-dash-templates']);
       gulp.watch([paths.dash_index], ['dash-usemin']);

       gulp.watch([paths.editor_images], ['custom-editor-images']);
       gulp.watch([paths.editor_styles], ['custom-editor-less']);
       gulp.watch([paths.editor_scripts], ['custom-editor-js']);
       gulp.watch([paths.editor_templates], ['custom-editor-templates']);
       gulp.watch([paths.editor_index], ['editor-usemin']);

       gulp.watch([paths.index], ['usemin']);
   });
   ```
   这下我们完成了
##该模块开发完成
我们执行下面的命令
```
gulp build
gulp
```
打开页面localhost:8888/editor.html就可以看见效果了,推荐IDE webstrom