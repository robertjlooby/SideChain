module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      build: {
        src: 'src/**/*.js',
        dest: 'SideChain.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);
};
