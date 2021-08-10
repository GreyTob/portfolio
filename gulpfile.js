let gulp = require('gulp'),
  // pug = require('gulp-pug'),
  sass = require('gulp-sass')(require('sass')),
  browserSync = require('browser-sync'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps')

//Задание для  SCSS
//expanded - c отступами, compressed - минифицированный
gulp.task('scss', () =>
  gulp
    .src('scss/common.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
        grid: true,
      })
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream())
)

//Задание для HTML, если нет препроцессора
gulp.task('html', () => gulp.src('index.html').pipe(browserSync.stream()))

//Задание для pug
//{pretty: true} не минифицирует HTML
// gulp.task('pug', () =>
//   gulp
//     .src('app/pug/index.pug')
//     .pipe(
//       pug({
//         pretty: true,
//       })
//     )
//     .pipe(gulp.dest('app/'))
//     .pipe(browserSync.stream())
// )

//Задание для JS
//в массиве нужно узазать пути ко всем используемым файлам js. В том числе из node_modules
gulp.task('js', async function () {
  await gulp
    .src([
      'js/_flexGalery.js',
      'js/_formToMail.js',
      'js/_fullScrollSlider.js',
      'js/_game.js',
      'js/_sliderWorks.js',
      'js/_sliderWorksTouch.js',
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
})

// gulp.task('js_libs', async function () {
//   await gulp
//     .src(['node_modules/@glidejs/glide/dist/glide.js'])
//     .pipe(concat('libs.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('app/js'))
//     .pipe(browserSync.stream())
// })

//live-reload с помощью gulp
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './',
    },
  })
})

//автоматически запускать компиляцию css при изменениях в scss
gulp.task('watch', function () {
  // gulp.watch('app/pug/*.pug', gulp.parallel('pug'))
  gulp.watch('index.html', gulp.parallel('html'))
  gulp.watch('scss/*.scss', gulp.parallel('scss'))
  gulp.watch('js/_*.js', gulp.parallel('js'))
})

//дефолтная задача для одновременного запуска browser-sync и watch и др
gulp.task(
  'default',
  gulp.parallel('html', 'scss', 'js', 'browser-sync', 'watch')
)
