module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    datetime: Date.now(),
    jshint: {
      files: [ 'src/javascripts/custom/*.js' ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          $: true,
          console: true
        }
      }
    },
    concat: {
      dist: {
        src: [ 'src/javascripts/custom/*.js' ],
        dest: 'public/issuetracker.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: {toplevel: true},
        squeeze: {dead_code: false},
        codegen: {quote_keys: true}
      },
      dist: {
        files: {
          'public/issuetracker.min.js': 'public/issuetracker.js'
        }
      }
    },
    compass: {
      dist: {
        options: {
          require: ['zurb-foundation'],
          sassDir: 'src/sass',
          cssDir: 'public/css'
        }
      }
    },
    watch: {
      files: '<%= compass.dist.options.sassDir %>/**/*',
      tasks: 'compass'
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'compass']);
};