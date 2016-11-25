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
        template: getTemplate(),
        parent: angular.element(document.body),
        targetEvent: ev,
        fullscreen: true,
        locals: Object.assign({}, config), // temp
        clickOutsideToClose: true
      })
      .then(function(conf) {
        config = conf;
      });

      function getTemplate() {
        var template=""; // todo $templateCache
        template += "<md-dialog aria-label=\"Settings\">";
        template += "  <form name=\"form\" ng-cloak>";
        template += "";
        template += "    <md-toolbar>";
        template += "      <div class=\"md-toolbar-tools\">";
        template += "        <h2>Настройки<\/h2>";
        template += "        <span flex><\/span>";
        template += "        <md-button class=\"md-icon-button\" ng-click=\"cancel()\">";
        template += "          <md-icon aria-label=\"Close dialog\"><\/md-icon>";
        template += "        <\/md-button>";
        template += "      <\/div>";
        template += "    <\/md-toolbar>";
        template += "";
        template += "    <md-dialog-content>";
        template += "      <div class=\"md-dialog-content\">";
        template += "";
        template += "        <md-input-container class=\"md-block\">";
        template += "          <label>Скидка, %<\/label>";
        template += "          <input type=\"number\" ng-model=\"settings.discPerc\" ng-min=\"0\" ng-max=\"100\">";
        template += "        <\/md-input-container>";
        template += "";
        template += "        <p>Правило округления<\/p>";
        template += "        <md-radio-group ng-model=\"settings.roundRule\">";
        template += "";
        template += "          <md-radio-button value=\"round\">К ближайшему целому<\/md-radio-button>";
        template += "          <md-radio-button value=\"ceil\">К большому<\/md-radio-button>";
        template += "          <md-radio-button value=\"floor\">К меньшему<\/md-radio-button>";
        template += "";
        template += "        <\/md-radio-group>";
        template += "";
        template += "      <\/div>";
        template += "    <\/md-dialog-content>";
        template += "";
        template += "    <md-dialog-actions layout=\"row\">";
        template += "      <span flex><\/span>";
        template += "";
        template += "      <md-button ng-click=\"save()\" ng-disabled=\"form.$invalid\">";
        template += "        Применить";
        template += "      <\/md-button>";
        template += "";
        template += "      <md-button ng-click=\"cancel()\">";
        template += "        Закрыть";
        template += "      <\/md-button>";
        template += "";
        template += "    <\/md-dialog-actions>";
        template += "  <\/form>";
        template += "<\/md-dialog>";
        return template;
      }
      
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