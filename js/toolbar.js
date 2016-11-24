;!function () {

  'use strict';

  angular
    .module('app')
    .controller('ToolbarCtrl', ToolbarCtrl);

  ToolbarCtrl.$inject = ['$mdDialog', 'config'];

  function ToolbarCtrl($mdDialog, config) {
    var vm = this;

    vm.openSettings = openSettings;

    function openSettings(ev) {

      $mdDialog.show({
        controller: SettingsCtrl,
        templateUrl: '../templates/settings.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        fullscreen: true,
        locals: Object.assign({}, config), // temp
        clickOutsideToClose: true
      })
      .then(function(conf) {
        config = conf;
      });

      function SettingsCtrl($scope, $mdDialog, config) {
        $scope.settings = config;

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.save = function() {
          $mdDialog.hide( config );
        };
      }

    }
  }

}();