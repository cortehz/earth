"use strict";

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    uglify: {
      options: {
        banner:
          '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      build: {
        src: "public/libs/earth/**/*.js",
        dest: "build/awiearth.min.js",
      },
    },
    jshint: {
      files: ["*.js", "public/libs/earth/**/*.js"],
      options: {
        // ignores: [""],
        globals: {
          Buffer: false,
          console: false,
          exports: false,
          module: false,
          process: false,
          require: false,
          __dirname: false,
        },
        globalstrict: true,
      },
    },
  });

  //   // Load the plugin that provides the "jshint" task.
  //   grunt.loadNpmTasks("grunt-contrib-jshint");

  //   // Default task(s).
  //   grunt.registerTask("default", ["jshint"]);

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Default task(s).
  grunt.registerTask("default", ["uglify"]);
};
