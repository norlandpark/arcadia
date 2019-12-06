module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-node-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    pug: {
      compile: {
        options: {
          data: {
            debug: false
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
