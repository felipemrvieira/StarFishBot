var appModule = angular.module('minhasDiretivas', []);

appModule.directive('chatMensagem', function(){

  var ddo = {};
  ddo.restrict = "AE";
  ddo.transclude = true;

  ddo.scope = {
    textoMensagem: '@'
  };

  ddo.templateUrl = "js/directives/chat-mensagem.html";
  return ddo;
});

appModule.directive('alerter', function() {
  return {
    link: function($scope, element, attrs, controller) {
      alert(attrs.size)
    }
  };
});
