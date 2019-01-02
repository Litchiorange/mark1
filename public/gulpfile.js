//引入
var gulp = require('gulp');
//编译scss
var sass = require('gulp-sass');
//压缩css
var cleanCss = require('gulp-clean-css');
//压缩Js
var uglify = require('gulp-uglify');

//指定任务
gulp.task('sass', function() {
    //返回
    return gulp.src('src/scss/index.scss')
});