autoprefixer  = require 'gulp-autoprefixer'
coffee        = require 'gulp-coffee'
coffeelint    = require 'gulp-coffeelint'
stylint       = require 'gulp-stylint'
concat        = require 'gulp-concat'
gulp          = require 'gulp'
plumber       = require 'gulp-plumber'
stylus        = require 'gulp-stylus'
jade          = require 'gulp-jade'
minify        = require 'gulp-minify-css'

coffeeFiles = [
    '*.coffee'
    'frontend/**/*.coffee'
]

gulp.task 'default', [
    'lint'
    'jade'
    'coffee'
    'stylus'
]

gulp.task 'lint', ['stylus-lint', 'coffee-lint']
gulp.task 'dev', ['default', 'watch']

gulp.task 'watch', ->
    gulp.watch coffeeFiles, ['coffee-lint']
    gulp.watch 'styl/**/*.styl', ['stylus-lint']
    gulp.watch 'templates/*.jade', ['jade']
    gulp.watch 'frontend/**/*.coffee', ['coffee']
    gulp.watch 'styl/*.styl', ['stylus']

gulp.task 'stylus-lint', ->
    gulp.src 'styl/**/*.styl'
        .pipe stylint()
        .pipe stylint.reporter()

gulp.task 'coffee-lint', ->
    gulp.src coffeeFiles
        .pipe coffeelint()
        .pipe coffeelint.reporter()

gulp.task 'coffee', ->
    gulp.src 'frontend/**/*.coffee'
        .pipe plumber()
        .pipe coffee()
        .pipe concat 'main.js'
        .pipe gulp.dest 'static'

gulp.task 'jade', ->
    gulp.src 'templates/index.jade'
        .pipe plumber()
        .pipe jade()
        .pipe gulp.dest 'static'

gulp.task 'stylus', ->
    gulp.src 'styl/main.styl'
        .pipe plumber()
        .pipe stylus()
        .pipe autoprefixer()
        .pipe minify()
        .pipe gulp.dest 'static'
