const gulp = require('gulp');
const schema = require('gulp-graphql');
const babel = require('gulp-babel');
const clean = require('gulp-clean');

gulp.task('cleanSrcData', function () {
    return gulp.src('src/data/', {read: false})
        .pipe(clean());
});

gulp.task('clean', ["cleanSrcData"], function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});

gulp.task("build", ["clean"], () => {
    console.log("Compiling source...");

    return gulp.src("src/**/*.js")
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', console.log)
        .pipe(gulp.dest("dist/"))
});

gulp.task('watch-schema', () => {
    gulp.watch("src/**/*.js", ['schema']);
});

gulp.task("schema", ["build"], () => {
    console.log("Generating graphql schema...");

    return gulp.src("dist/schema.js")
        .pipe(schema({
            json: true,
            graphql: true
        }))
        .on('error', console.log)
        .pipe(gulp.dest("src/data"))
        .pipe(gulp.dest("dist/data"))
        .pipe(gulp.dest("../doggystyle/src/data"));
});


gulp.task("default", ["schema"]);