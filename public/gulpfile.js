//引入
var gulp = require('gulp');
//编译scss
var sass = require('gulp-sass');
//压缩css
var cleanCss = require('gulp-clean-css');
//压缩Js
var uglify = require('gulp-uglify');
//合并
var jsconcat = require('gulp-concat');
//服务
var server = require('gulp-webserver');
//操作文件
var fs = require('fs');
var url = require('url');
var path = require('path');

//指定任务
gulp.task('sass', function() {
    //返回
    return gulp.src('src/scss/index.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css/'))
});

//监听css
gulp.task('watch', function() {
    gulp.watch('src/scss/index.scss', gulp.series('sass'));
});

//服务
gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(server({
            port: 6699,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                //默认图标
                if (pathname === '/favicon.ico') {
                    return res.end()
                }
                //判断是否是接口还是文件
                if (pathname === '/api/list') {
                    return res.end(JSON.stringify({ code: 1, data: data }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    return res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }));
});

//默认任务
gulp.task('default', gulp.parallel('sass', 'watch', 'webserver'));

//压缩css
gulp.task('cleancss', function() {
    return gulp.src('src/css/index.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css/'))
});

//压缩js
gulp.task('uglifyjs', function() {
    return gulp.src('src/js/index.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
});

//打包任务
gulp.task('build', gulp.parallel('cleancss', 'uglifyjs'));