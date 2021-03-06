/* eslint-disable no-var, no-shadow, dot-notation */


module.exports = function(wallaby) {
  return {
    files: [

      {pattern: 'jspm_packages/system.js', instrument: false},
      {pattern: 'config.js', instrument: false},
      {pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', load: true},
      {pattern: 'src/**/*.js', load: false},
      {pattern: 'test/**/*.spec.js', load: false, ignore: true},
      {pattern: 'test/**/*.js', load: false},
      {pattern: 'sample/kendo-sdk/js/jquery.min.js', load: true, instrument: false},
      {pattern: 'sample/kendo-sdk/js/kendo.all.min.js', load: true, instrument: false}
    ],

    tests: [
      {pattern: 'test/unit/**/*.spec.js', load: false}
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        optional: [
          'runtime',
          'es7.decorators',
          'es7.classProperties'
        ]
      })
    },

    middleware: (app, express) => {
      app.use('/jspm_packages', express.static(require('path').join(__dirname, 'jspm_packages')));
      app.use('/vendors', express.static(require('path').join(__dirname, 'vendors')));
    },

    bootstrap: function(wallaby) {
      var promises = [];
      var i = 0;
      var len = wallaby.tests.length;

      wallaby.delayStart();

      System.config({
        paths: {
          '*': '*.js'
        }
      });
      for (; i < len; i++) {
        promises.push(System['import'](wallaby.tests[i].replace(/\.js$/, '')));
      }

      System['import']('core-js')
      .then(function() {
        return System['import']('polymer/mutationobservers');
      })
      .then(function() {
        Promise.all(promises).then(function() {
          wallaby.start();
        });
      });
    },

    debug: true
  };
};
