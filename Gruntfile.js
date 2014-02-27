module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      src: ["src/js/*.js", "Gruntfile.js"]
    },

    sass: {
      compile: {
        files: {
          'src/css/main.css': 'src/css/sass/main.scss'
        }
      }
    },

    watch:{
      stylesheets: {
        files: ['src/css/**/*.scss'],
        tasks:['sass']
      }
    },

    copy: {
      main: {
        cwd: 'src/',
        src: ['!css/sass/**/*.scss', '*', '**/*.css', 'video/**', '**/*.png', '**/*.jpg', '**/*.js'],
        dest: 'build/',
        expand: true
      },
    },

    clean: {
      build: 'build/*'
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  //dev
  grunt.registerTask('default', ['sass', 'jshint']);
  grunt.registerTask('dev', ['watch']);

  //build
  grunt.registerTask('build', ['clean', 'copy']);
};