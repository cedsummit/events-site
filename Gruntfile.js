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
      build: ['build/**', '!.git']
    },

    shell: {
        initDeploy: {
          options: {
            stdout: true
          },
          command: [
            'cd build/',
            'rm -rf .git',
            'git init',
            'git add .',
            'git commit -am "Deploy"',
            'git remote add origin https://github.com/xovered/event-deploy-test.git',
            'git push -u origin master --force'
          ].join('&&')
        },

        deploy: {
          options: {
            stdout: true
          },
          command: [
            'cd build/',
            'git add .',
            'git commit -am "Deploy"',
            'git push origin master'
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
  grunt.registerTask('default', ['sass', 'jshint']);
  grunt.registerTask('dev', ['watch']);

  //build
  grunt.registerTask('build', ['clean', 'copy']);

  //deploy
  grunt.registerTask('deploy', ['clean', 'copy', 'shell:deploy']);
};
