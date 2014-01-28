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

    watch:{},

  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'jshint']);
};