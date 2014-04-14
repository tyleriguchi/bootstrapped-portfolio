'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      test: {
        NODE_ENV: 'test'
      }
    },

    jshint: {
      all: ['server.js', 'script.js'],
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
      dev: {
        files: {
          "styles/main.css": "styles/main.scss"
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
        files: ['styles/*.scss'],
        options: {
          livereload: true
        },
        tasks: ['sass']
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'express:dev', 'sass', 'watch']);
};
