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
        src: ['!.git', '!css/sass/**/*.scss', '*', '**/*.css', 'video/**', '**/*.png', '**/*.jpg', '**/*.js', '**/*.svg', '**/*.pdf'],
        dest: 'build/',
        expand: true
      },
    },

    clean: {
      build: ['build/**']
    },

    shell: {
      deploy: {
        options: {
        stdout: true,
        stderr:true
      },
        command: [
          'cd build/',
          'rm -rf .git',
          'git init',
          'git add .',
          'git commit -am "Deploy <%= grunt.template.today("dd-mm-yyyy") %>"',
          'git remote add origin https://github.com/xovered/xovered.github.io.git',
          'echo "...This might take a while best to grab a beer!"',
          'git push origin master --force'
        ].join('&&')
      },
    },

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  //dev
  grunt.registerTask('default', ['sass']);
  grunt.registerTask('dev', ['watch']);

  //build
  grunt.registerTask('build', ['clean', 'copy']);
  grunt.registerTask('deploy', ['clean', 'copy', 'shell:deploy']);
};
