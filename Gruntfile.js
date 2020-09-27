module.exports = function(grunt) {

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      concat: {
        dist: {
          src: ['src/**/*.js'],
          dest: 'dist/js/<%= pkg.name %>.js'
        }
      },
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        dist: {
          files: {
            'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
          }
        }
      },
      jshint: {
        files: ['Gruntfile.js', 'src/**/*.js'],
        options: {
          // options to override JSHint defaults
          globals: {
            jQuery: true,
            console: true,
            module: true,
            document: true,
            esversion: 6
          }
        }
      },
      watch: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      connect: {
          server: {
              options: {
                  hostname: 'localhost',
                  port: 9000,
                  protocol: 'http',
                  keepalive: true
              }
          }
      }
    });
  
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('connect', ['connect']);
    grunt.registerTask('default', ['concat']);
  
  };