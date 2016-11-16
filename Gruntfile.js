module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    appConfig: {
      statics: './static',
      css: 'static/css',
      sass: 'static/sass',
      html: 'pages',
      img: 'static/images',
      js: 'static/script',
      dist: 'static/dist',
      debugold: 'static/.debug1',
      debug: 'static/debug'
    },
    sass: {
      dist: {
        options: {
          outputStyle: 'compressed',
          precision: 10,
          sourceMap: true,
          includePaths: ['<%= appConfig.sass %>']
        },
        files: [{
          expand: true,
          cwd: '<%= appConfig.sass %>',
          src: ['**/*.scss'],
          dest: '<%= appConfig.css %>',
          ext: '.css'
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9'],
        map: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.css %>',
          src: '**/*.css',
          dest: '<%= appConfig.css %>'
        }]
      }
    },
    watch: {
      css: {
        files: '<%= appConfig.sass %>/*.scss',
        tasks: ['sass'],
        options: {}
      },
      livereload: {
        options: {
          livereload: '<%=connect.options.livereload%>'
        },
        files: []//['<%= appConfig.html %>/**/*.html', '<%= appConfig.sass %>/**/*.scss', '<%= appConfig.js %>/**/*.js']
      }
    },
    clean: {
      build: ['<%=appConfig.debugold%>'],
      dist: ['<%=appConfig.dist%>', '<%=appConfig.debug%>'],
      img: ['<%= appConfig.img %>'],
      style: ['<%= appConfig.css %>']
    },
    connect: {
      options: {
        port: 9000,
        hostname: '*',
        livereload: 35728,
        open: true,
        middleware: function (connect, options, middlewares) {
          var fs = require('fs');
          var path = require('path');
          var url = require('url');
          var support = ['POST', 'PUT', 'DELETE'];
          middlewares.unshift(function (req, res, next) {
            //set encoding
            if (req.url.match(/\.json/i)) {
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
            }
            if (req.url.match(/\.tpl/i)) {
              res.setHeader('Content-Type', 'application/html; charset=utf-8');
            }
            //support for request other than GET
            if (support.indexOf(req.method.toUpperCase()) != -1) {
              var filepath = path.join(options.base[0], url.parse(req.url).pathname);
              if (fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
                return fs.createReadStream(filepath).pipe(res);
              }
            }

            return next();
          });

          return middlewares;
        }
      },
      server: {
        options: {
          base: './'
        }
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.img %>',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%= appConfig.statics %>/imagemin'
        }]
      }
    },
    rename: {
      main: {
        files: [{
          src: '<%= appConfig.statics %>/imagemin',
          dest: '<%= appConfig.img %>'
        }]
      }
    },
    concurrent: {
      // build: ['requirejs:debugold']
    },
    copy: {
      build: {
        cwd: '<%= appConfig.debugold %>',      //指向的目录是相对的,全称Change Working Directory更改工作目录
        src: ['css/**/*.css'],    //指向源文件，**是一个通配符，用来匹配Grunt任何文件
        dest: '<%= appConfig.dist %>', //用来输出结果任务
        expand: true    //expand参数为true来启用动态扩展，涉及到多个文件处理需要开启
      },
      build2: {
        cwd: '<%= appConfig.debugold %>',      //指向的目录是相对的,全称Change Working Directory更改工作目录
        src: ['css/**/*.css', '*/appSrc/*.js', '*/special/*.js'],   //指向源文件，**是一个通配符，用来匹配Grunt任何文件
        dest: '<%= appConfig.debug %>', //用来输出结果任务
        expand: true    //expand参数为true来启用动态扩展，涉及到多个文件处理需要开启
      }
    },
    uglify: {
      // 基本压缩（用于不常修改的文件）
      build: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.debugold %>',
          src: ['*/appSrc/*.js', '*/special/*.js'],
          dest: '<%= appConfig.dist %>'
        }]
      }
    },
    requirejs: {
      options: {
        appDir: "<%= appConfig.statics %>",
        baseUrl: "script",
        stubModules: ['cs'],
        mainConfigFile: '<%= appConfig.js %>/lib/requirejsPlugin/rjConfig.js',
        skipModuleInsertion: false,
        wrapShim: true,
        modules: rjModules()
      },
      // compile: {
      // 	options: {
      // 		dir: "<%= appConfig.dist %>"
      // 	}
      // },
      // debug: {
      // 	options: {
      // 		dir: "<%= appConfig.debug %>"
      // 	}
      // },
      debugold: {
        options: {
          dir: "<%= appConfig.debugold %>",
          optimize: 'none'
        }
      }
    }
  });

  function rjModules() {
    var dirAppSrc = grunt.file.expand('cwd', './static/js/appSrc/*.js');
    var allArr = [];

    var arrForReturn = [];

    for (var i = 0, l = dirAppSrc.length; i < l; i++) {
      allArr.push(dirAppSrc[i].match(/(appSrc\/.*)\.js/)[1]);
    }

    for (var i = 0, l = allArr.length; i < l; i++) {
      var json = {};
      json.name = allArr[i];
      json.exclude = ['jquery', 'css', 'text', 'css-builder'];
      if (json.name === 'appSrc/appCommon') {
        json.name = 'appCommon';
        json.exclude = ['coffee-script', 'normalize'];
      }
      arrForReturn.push(json);
      json = null;
    }
    return arrForReturn;
  }

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('style', ['clean:style', 'sass', 'autoprefixer']);
  grunt.registerTask('build', ['style', 'clean:dist', 'requirejs', 'copy', 'uglify:build', 'clean:build']);
  grunt.registerTask('img', ['imagemin', 'clean:img', 'rename']);
  grunt.registerTask('default', ['style', 'connect', 'watch']);
};
