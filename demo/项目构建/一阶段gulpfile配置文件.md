
下面代码为一阶段gulpfile配置文件

```

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

var browserSync = require('browser-sync').create(),
    reload = browserSync.reload;  //自动刷新页面

var rem = require('gulp-rem');    //移动端rem布局

var staticBase = './';

var cssSrc = `${staticBase}less`;   //less源文件
var cssDst = `${staticBase}css`;    //css目标目录


gulp.task('build-css', function() {
    return gulp.src([cssSrc + '*.less'])
        .pipe(rem({
            width: 640,
            unit: 'pm'
        }))   //先进行rem的一些转换
        .pipe(plugins.less())   //less 编译
        .pipe(plugins.autoprefixer({    //浏览器前缀补全
            browsers: [
                'ie >= 9',
                'ff >= 10',
                'chrome >= 20',
                'safari >= 7',
                'opera >= 10',
                'ios >= 7',
                'android >= 2.3'
            ]
        }))
    
    .pipe(plugins.cssmin())  //压缩css
    .pipe(gulp.dest(cssDst))  //输出css文件
    .pipe(reload({     //刷新页面
        stream: true
    }));
});

gulp.task('server', ['build-css'], function() {
    browserSync.init({
        server: "./"
    });

    // 对于要起eclipse的会用下面的配置做代理
    /*
    browserSync.init({
        proxy: {
            target: "localhost:8080"
        }
    });
     */
    gulp.watch([cssSrc + '/*.less', cssSrc + '/**/*.less'], ['build-css']);  // 监测文件变化执行操作
});

gulp.task('default', ['build-css'], function() {
    console.log('Build all files finish.');
});


gulp.task('watch', function() {
    gulp.watch([cssSrc + '/*.less', cssSrc + '/**/*.less'], ['build-css']).on('change', function(event) {
        console.log('Event type: ' + event.type);
        console.log('Event path: ' + event.path);
    });
});
```
