module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-node-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.initConfig({
    pug: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          './docs/index.html': ['docs-src/index.pug']
        }
      }
    },
    sass: {
      dist: {
        dest: './docs/app.css',
        src: './docs-src/scss/index.scss'
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
        files: ['docs-src/scss/*.scss'],
        tasks: ['sass'],
      },
      docs_src_pug: {
        files: ['docs-src/*.pug', 'docs-src/**/*.pug'],
        tasks: ['pug'],
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
  });

  grunt.registerTask('serve', 'Serve and watch', [
    'build',
    'connect:server',
    'watch'
  ]);
};
