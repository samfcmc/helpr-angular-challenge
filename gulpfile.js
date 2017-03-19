const gulp = require('gulp');
const serve = require('gulp-serve');
const bower = require('gulp-bower'); 

/**
 * Bundling
 */
const browserify = require('browserify');
const watchify = require('watchify');

/**
 * Browserify Transforms 
 */
const debowerify = require('debowerify');
const babelify = require("babelify");

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const assign = require('lodash.assign');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');

/**
 * Browser Sync
 */
var browserSync = require('browser-sync').create();

const paths = {
  build: 'build',
  src: 'src',
  sourceMaps: '/source',
  bowerComponetns: 'bower_components'
}

const config = {
  build: {
    path: `${paths.build}`,
    vendor: 'js/vendor.js',
    app: 'js/app.js',
    sourceMapsRoot: `${paths.sourceMaps}`,
    styleSourceMapsRoot: `${paths.sourceMaps}/css`,
    style: `${paths.build}/style`,
    fonts: `${paths.build}/fonts` 
  },
  src: {
    path: `${paths.src}`,
    vendor: [`${paths.src}/vendor.js`],
    app: [`${paths.src}/app.js`],
    html: `${paths.src}/**/*.html`,
    style: `${paths.src}/style/main.scss`,
    sass: `${paths.src}/**/*.scss`,
    fonts: [
      `${paths.bowerComponetns}/bootstrap-sass/assets/fonts/**/*`,
      `${paths.src}/fonts/**/*`
    ]
  }
}

/**
 * 
 * @param {Array} entries An array of file names to be bundles 
 * @param {string} bundleName The file name of the generated bundle
 * @param {Array} transforms An array of transforms for browserify to apply
 * Each transform must be an object with the following structure
 * {
 *  "transform": <A reference for the transform: debowerify|babelify|etc...>
 *  "options": <A set of options to apply for this transform. This is optional>
 * }
 * @param {boolean} debug If true, the bundle will be
 * watched for changes and the sourcemaps will be generated. 
 * Else, there will be no watching process, the sourcemaps will
 * not be generated and the generated files will be minified.
 *  Default: False
 */
let bundle = (entries, bundleName, transforms, debug = false) => {
  let customOptions = {
    entries: entries,
    debug: debug
  };

  let bundlerOptions = debug ? watchify.args : {};
  let options = assign({}, bundlerOptions, customOptions);

  let bundler = browserify(options);
  if(debug) {
    bundler = watchify(bundler);
  }

  let bundle = () => {
    let tempBundler = bundler;

    for(let i = 0; i < transforms.length; i++) {
      let transformObject = transforms[i];
      let transform = transformObject.transform;
      let transformOptions = transformObject.options;
      if(!transformOptions) {
        transformOptions = undefined;
      }
      tempBundler.transform(transform, transformOptions);
    }

    let sourceMapsInit = () => {
      if(debug) {
        return sourcemaps.init({loadMaps: true})
      }
      else {
        return gutil.noop();
      }
    }

    let sourceMapsWrite = () => {
      if(debug) {
        return sourcemaps.write({
          sourceRoot: config.build.sourceMapsRoot
        });
      }
      else {
        return gutil.noop();
      }
    }
    
    return tempBundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source(bundleName))
      .pipe(buffer())
      .pipe(sourceMapsInit())
      .pipe(debug ? gutil.noop() : uglify())
      .pipe(sourceMapsWrite())
      .pipe(gulp.dest(config.build.path))
      .pipe(browserSync.stream());
  }

  bundler.on('log', gutil.log);

  if(debug) {
    bundler.on('update', bundle);
  }

  return bundle(bundler, transforms);
}

/**
 * 
 * @param {Object} options Options object to be passed
 * to the SASS compiler. @see gulp-sass documentation
 */
let compileStyles = (options = {}, debug = false) => {
  let sourcemapsInit = () => {
    if(debug) {
      return sourcemaps.init();
    }
    else {
      return gutil.noop();
    }
  };

  let sourcemapsWrite = () => {
    if(debug) {
      return sourcemaps.write({
        sourceRoot: config.build.styleSourceMapsRoot
      })
    }
    else {
      return gutil.noop();
    }
  };

  return gulp.src(config.src.style)
    .pipe(sourcemapsInit())
    .pipe(sass(options).on('error', sass.logError))
    .pipe(sourcemapsWrite())
    .pipe(gulp.dest(config.build.style))
    .pipe(browserSync.stream());
}

/**
 * 
 * @param {Boolean} debug If true, the vendors bundle 
 * will be generated in debug mode, which means,
 * it will not be minified and the sourcemaps will be
 * generated. False otherwise.
 */
let bundleVendors = (debug = false) => {
  let transforms = [
    {
      transform: debowerify
    }
  ]

  return bundle(config.src.vendor, config.build.vendor, transforms, debug);
}

/**
 * 
 * @param {Boolean} debug If true, the app bundle 
 * will be generated in debug mode, which means,
 * it will not be minified and the sourcemaps will be
 * generated. False otherwise.
 */
let bundleApp = (debug = false) => {
  let transforms = [
    {
      transform: babelify,
      options: {
        presets: ['es2015']
      }
    }
  ];

  return bundle(config.src.app, config.build.app, transforms, debug);
}

/**
 * Logs a file change
 * @param {Vynil} file File that changed
 */
let logFileChange = (file) => {
  return gutil.log('Changed file:', file.basename);
};

/**
 * Common build tasks
 */
gulp.task('html', () => {
  return gulp.src(config.src.html)
    .pipe(gulp.dest(config.build.path));
});

gulp.task('fonts', () => {
  return gulp.src(config.src.fonts)
    .pipe(gulp.dest(config.build.fonts));
});

gulp.task('build:common', ['html', 'fonts']);

/**
 * Dev environment specific tasks
 */
// Bundle vendors script. Check vendor.js file
gulp.task('bundle:vendors:dev', () => {
  return bundleVendors(true);
});

// Bundle app script. Check app.js file
gulp.task('bundle:app:dev', () => {
  return bundleApp(true);
})

gulp.task('bundle:dev', ['bundle:vendors:dev', 'bundle:app:dev']);

gulp.task('style:dev', () => {
  compileStyles({}, true);
})

gulp.task('build:dev', ['build:common', 'bundle:dev', 'style:dev']);

// Watch for changes and rebuild the app in development mode
gulp.task('watch', ['build:dev'], () => {

  browserSync.init({
    server: 'build/'
  })

  gulp.watch(config.src.sass, ['style:dev']);

  // Watch for HTML changes
  /*watch(config.src.html, {
      events: ['add', 'change']
    }, (file) => {
      console.log(file.cwd);
      // Just copy the file to the build folder
      return gulp.src(file.path)
        .pipe(gulp.dest(config.build.path))
        .pipe(browserSync.stream());
  });*/
  gulp.src(config.src.html)
    .pipe(watch(config.src.html, {base: config.src.path}))
    .pipe(gulp.dest(config.build.path))
    .pipe(browserSync.stream());

  // Watch for fonts changes
   gulp.src(config.src.fonts)
    .pipe(watch(config.src.fonts, {base: config.src.path}))
    .pipe(gulp.dest(config.build.path))
    .pipe(browserSync.stream());
})

/**
 * Production environment specific tasks
 */
// Bundle vendors script. Check vendor.js file
gulp.task('bundle:vendors:prod', () => {
  return bundleVendors(false);
});

// Bundle app script. Check app.js file
gulp.task('bundle:app:prod', () => {
  return bundleApp(false);
});

gulp.task('bundle:prod', ['bundle:vendors:prod', 'bundle:app:prod']);

gulp.task('style:prod', () => {
  compileStyles({outputStyle: 'compressed'}, false);
})

gulp.task('build:prod', ['build:common', 'bundle:prod', 'style:prod']);

/**
 * Runs a local HTTP server
 */
gulp.task('serve', ['watch'], () => {
  
});

/**
 * Tasks for the user:
 */
/**
 * clean: Cleans all generated files in the build process
 */
gulp.task('clean', () => {
  return del([config.build.path]);
});

/**
 * bower: Install all frontend dependencies
 */
gulp.task('bower', () => {
  return bower();
});

/**
 * Development environment
 */
gulp.task('dev', ['serve']);

/**
 * Production environment
 */
gulp.task('prod', ['build:prod']);

gulp.task('serve-prod', ['prod'], serve({
  root: [config.build.path]
}));



/**
 * Default Task
 */
gulp.task('default', ['dev']);

