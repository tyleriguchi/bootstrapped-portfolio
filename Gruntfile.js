'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-processhtml');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['server.js'],
      options: {
        jshintrc: true,
        globals: {
          console: true,
          module: true
        }
      }
    },

    express: {
      dev: {
        options: {
          script: 'server.js',
          NODE_ENV: 'development'
        }
      },
      prod: {
        options: {
          script: 'server.js',
          NODE_ENV: 'development'
        }
      }
    },

    sass: {
      prod: {
        files: {
          "app/styles/main.css": "app/styles/main.scss"
        }
      },

      dev: {
        files: {
          "app/styles/main.css": "app/styles/main.scss"
        },
        options: {
          includePaths: ['styles/'],
          sourceComments: 'map'
        }
      }
    },

    watch: {
      html: {
        files: ['index.html'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['app/styles/*.scss'],
        options: {
          livereload: true
        },
        tasks: ['sass:dev']
      }
    },

    clean: {
      build: ['build'],
      dev: {
        src: ['build/**/*']
      },
      prod: ['dist']
    },

    copy: {
      prod: {
        expand: true,
        src: ['app/assets/**/*', 'app/js/*', 'app/styles/**/*.css', 'server.js'],
        dest: 'dist/',
        flatten: false,
        filter: 'isFile'
      },
      dev: {
        expand: true,
        cwd: 'app',
        src: ['assets/**/*', 'js/*', 'styles/**/*.css'],
        dest: 'build/',
        flatten: false,
        filter: 'isFile'
      }
    },

    uncss: {
      prod: {
        files: {
          'dist/app/styles/tidy.css': ['index.html']
        }
      }
    },

    processhtml: {
      prod: {
        files: {
          'dist/index.html': ['index.html']
        }
      }
    }
  });
  grunt.registerTask('minifycss', ['uncss:prod', 'processhtml:prod']);
  grunt.registerTask('build:dev', ['clean:dev', 'sass:dev', 'copy:dev']);
  grunt.registerTask('build:prod', ['clean:prod', 'sass:prod', 'copy:prod']);
  grunt.registerTask('prod', ['build:prod', 'minifycss']);
  grunt.registerTask('default', ['build:dev', 'jshint', 'express:dev', 'watch']);
};
