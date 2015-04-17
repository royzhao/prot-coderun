var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-minify-css'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-minify-html');

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

    image_scripts: 'src/image/js/**/*.*',
    image_styles: 'src/image/less/**/*.*',
    image_images: 'src/image/img/**/*.*',
    image_templates: 'src/image/templates/**/*.html',
    image_index:'src/image.html',

    test_file:'src/testfile/**/*.json',

    index: 'src/index.html',
    bower_fonts: 'src/components/**/*.{ttf,woff,eof,svg}',
};

var dist = "D:\\workspace\\go\\src\\code_run_server\\public";
/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest(dist+'/'));
});


/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest(dist+'/lib'));
});

/**
 * Handle custom files dashboard
 */
gulp.task('build-custom', ['dash-usemin','custom-dash-images', 'custom-dash-js', 'custom-dash-less', 'custom-dash-templates']);
gulp.task('dash-usemin', function() {
    return gulp.src(paths.dash_index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest(dist+'/'));
});

gulp.task('custom-dash-images', function() {
    return gulp.src(paths.dash_images)
        .pipe(gulp.dest(dist+'/img'));
});

gulp.task('custom-dash-js', function() {
    return gulp.src(paths.dash_scripts)
        //.pipe(minifyJs())
        .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest(dist+'/js'));
});

gulp.task('custom-dash-less', function() {
    return gulp.src(paths.dash_styles)
        .pipe(less())
        .pipe(gulp.dest(dist+'/css'));
});

gulp.task('custom-dash-templates', function() {
    return gulp.src(paths.dash_templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest(dist+'/templates'));
});

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
        .pipe(gulp.dest(dist+'/'));
});

gulp.task('custom-editor-images', function() {
    return gulp.src(paths.editor_images)
        .pipe(gulp.dest(dist+'/img'));
});

gulp.task('custom-editor-js', function() {
    return gulp.src(paths.editor_scripts)
        //.pipe(minifyJs())
        .pipe(concat('editor.min.js'))
        .pipe(gulp.dest(dist+'/js'));
});

gulp.task('custom-editor-less', function() {
    return gulp.src(paths.editor_styles)
        .pipe(less())
        .pipe(gulp.dest(dist+'/css'));
});

gulp.task('custom-editor-templates', function() {
    return gulp.src(paths.editor_templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest(dist+'/templates'));
});

/**
 * Handle custom files image
 */
gulp.task('build-custom-image', ['image-usemin','custom-image-images', 'custom-image-js', 'custom-image-less', 'custom-image-templates']);
gulp.task('image-usemin', function() {
    return gulp.src(paths.image_index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest(dist+'/'));
});

gulp.task('custom-image-images', function() {
    return gulp.src(paths.image_images)
        .pipe(gulp.dest(dist+'/img'));
});

gulp.task('custom-image-js', function() {
    return gulp.src(paths.image_scripts)
        .pipe(minifyJs())
        .pipe(concat('image.min.js'))
        .pipe(gulp.dest(dist+'/js'));
});

gulp.task('custom-image-less', function() {
    return gulp.src(paths.image_styles)
        .pipe(less())
        .pipe(gulp.dest(dist+'/css'));
});

gulp.task('custom-image-templates', function() {
    return gulp.src(paths.image_templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest(dist+'/templates'));
});
/*
 handler test file
 */

gulp.task('build-test-file', ['test-file']);

gulp.task('test-file', function() {
    return gulp.src(paths.test_file)
        .pipe(gulp.dest(dist+'/tests'));
});
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

    gulp.watch([paths.image_images], ['custom-image-images']);
    gulp.watch([paths.image_styles], ['custom-image-less']);
    gulp.watch([paths.image_scripts], ['custom-image-js']);
    gulp.watch([paths.image_templates], ['custom-image-templates']);
    gulp.watch([paths.image_index], ['image-usemin']);

    gulp.watch([paths.test_file],['build-test-file']);

    gulp.watch([paths.index], ['usemin']);
});

/**
 * Live reload server
 */
gulp.task('webserver', function() {
    connect.server({
        root: dist+'',
        livereload: true,
        port: 8888
    });
});

gulp.task('livereload', function() {
    gulp.src([dist+'/**/*.*'])
        .pipe(watch());
        //.pipe(connect.reload());
});
var debug = false;
/**
 * Gulp tasks
 */
gulp.task('build', ['usemin', 'build-assets', 'build-custom','build-custom-editor','build-custom-image']);
gulp.task('default', ['build', 'webserver', 'livereload', 'watch'],function(){
    debug = debug || false;
});
