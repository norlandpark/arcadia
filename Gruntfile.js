module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-node-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    pug: {
      compile: {
        options: {
          data: {
            debug: false,
          },
          filters: {
            'render-escape': function (block) {
              return this.pug
                .render(block, {pretty: true})
                .replace(/[\u00A0-\u9999<>&]/gim, function (i) {
                  return '&#' + i.charCodeAt(0) + ';';
                });
            }
          }
        },
        files: {
          './docs/index.html': ['docs-src/index.pug'],
          './docs/license.html': ['docs-src/license.pug']
        }
      }
    },
    sass: {
      dist: {
        dest: './docs/app.css',
        src: './docs-src/scss/index.scss'
      }
    },
    uglify: {
      options: {
        mangleProperties: false
      },
      js: {
        files: {
          './docs/app.js': ['docs-src/js/index.js']
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      src_sass: {
        files: ['src/**/*.scss'],
        tasks: ['sass'],
      },
      docs_src_scss: {
        files: ['docs-src/scss/*.scss', 'docs-src/scss/**/*.scss'],
        tasks: ['sass'],
      },
      docs_src_pug: {
        files: ['docs-src/*.pug', 'docs-src/**/*.pug'],
        tasks: ['pug'],
      },
      docs_src_js: {
        files: ['docs-src/js/*.js', 'docs-src/js/**/*.js'],
        tasks: ['uglify'],
      },
      docs_src_static: {
        files: ['docs-src/static/*', 'docs-src/static/**/*'],
        tasks: ['copy'],
      },
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: './docs-src/static/', src: ['./**'], dest: './docs/static/'},
        ],
      }
    },
    connect: {
      server: {
        options: {
          livereload: true,
          base: 'docs/',
          port: 9009
        }
      }
    }
  });

  grunt.registerTask('build', 'Build', function () {
    grunt.task.run('copy');
    grunt.task.run('pug');
    grunt.task.run('sass');
    grunt.task.run('uglify');
  });

  grunt.registerTask('serve', 'Serve and watch', [
    'build',
    'connect:server',
    'watch'
  ]);
};
