angular.module('StarFish')

.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
   'self',
   'https://elojuridico.com/dados/cidade-busca**'
    ]);
  })

.controller('ChatController', ['$location' ,'$interval', '$window', '$http',
function($location, $interval, $window, $http){

  var self = this;

  self.usuario = {
      nome : '',
      tipoCausa : '',
      descricao : '',
      email: '',
      telefone: '',
      cidade : ''
  };

  self.escondeForm = true;
  self.escondeFormTipo = true;
  self.escondeFormCidade = true;
  self.escondeFormDescricao = true;
  self.escondeFormEmail = true;
  self.escondeFormTelefone = true;
  self.escondeFormVoltar = true;
  self.escondeCidade = true;
  self.escondeBotaoCidade = true;

  self.codigoEstado = '';
  self.letra = '';

  self.estados = new Array();


  var mensagem = ["Olá!", -70,
  "Obrigado por entrar em contato!",-50,
  "Quer ver uma coisa legal?",-50,
  "port1",-50,
  "Tudo bem, vou juntar essas informações e passar para o pessoal!",-50,
  "Assim que possível a gente entra em contato.",-50,
  "Abraço...",-50,
  "De 8 braços",-50,
    // "formNome",-70,

  "fim", 8,
  ];

  var i = 0
  var time = 1500;
  var templateMensagem = $('#hidden-template-mensagem').html();
  var templateResposta = $('#hidden-template-resposta').html();
  var templateForm = $('#hidden-template-form').html();

  $(function(){
    $interval(function(){
      $("#intro").addClass("fadeOutUpBig");
      $("#avatar-eloisa").removeClass("hide");
      $("#avatar-eloisa").addClass("bounceInUp");
      enviaMsg();
    }, 50, 1);
  });

    var enviaMsg = function(){
      $interval(function(){
        validaMsg();
        time = 1500;
      }, time, 1);
    }

    function validaMsg(){

      switch (mensagem[i]) {
        case "fim":
          $interval.cancel(enviaMsg);
          $(document).scrollTop(1000);
          break;
        case "formNome":
          self.escondeForm = false;
          $interval.cancel(enviaMsg);
          $(document).scrollTop(10000);
          break;
        case "formTipo":
          $interval(function(){
            $(document).scrollTop(10000);
            self.escondeFormTipo = false;
          }, 3000, 1);
          break;
        case "formDescricao":
          self.escondeFormDescricao = false;
          $interval.cancel(enviaMsg);
          $(document).scrollTop(10000);
          break;
        case "formCidade":
          self.listaCidades = function(){

            //se o usuario digitar mais de 3 letras, faz um get e manda a lista para o front
            if (self.usuario.cidade.length == 3) {
              // console.log("buscado");
              $http.get('https://elojuridico.com/dados/cidade-busca?search='+self.usuario.cidade)
              .then(successCallback, errorCallback);
              function successCallback(response){
                self.cidades = new Array();
                var jsonCidades = angular.fromJson(response.data);

                for(var i = 0; i < jsonCidades.length; i++) {
                    var cidade = new Object();
                    cidade.nome = jsonCidades[i]['label'];
                    cidade.codigo = jsonCidades[i]['value'];

                    // console.log(cidade.nome +' - '+ cidade.codigo);
                    //esse array vai para um datalist no html
                    self.cidades.push(cidade);
                  }

                return;
              }
              function errorCallback(error){
                console.log(error);
                return error;
              }

            }

          }

          self.escondeFormCidade = false;
          $interval.cancel(enviaMsg);
          $(document).scrollTop(10000);
          break;
        case "formEmail":
          self.escondeFormEmail = false;
          $interval.cancel(enviaMsg);
          $(document).scrollTop(10000);
          break;
        case "formTelefone":
          self.escondeFormTelefone = false;
          $interval.cancel(enviaMsg);
          $(document).scrollTop(10000);
          break;
        case "formVoltar":
          self.escondeFormVoltar = false;
          $interval.cancel(enviaMsg);
          $(document).scrollTop(10000);
          console.log(self.usuario)
          break;
        case "port1":
          $('#conversa').append(templateMensagem);
          $('.mensagem-container:last-child').find("#mensagem").removeClass("ng-hide");
          $('.mensagem-container:last-child').find(".port").removeClass("ng-hide");

          break;
          // mensagem padrão
        default:
        var currentdate = new Date();

        var datetime = "Octavia às "
                  + currentdate.getHours() + "h"
                  + currentdate.getMinutes();


          $('#conversa').append(templateMensagem);
          $('.mensagem-container:last-child').find("#txt-header").text(datetime);
          $('.mensagem-container:last-child').find("#txt").text(mensagem[i]);
          $('.mensagem-container:last-child').find("#mensagem").removeClass("ng-hide");


          enviaMsg();
          window.navigator.vibrate(200);

          i += 2;
          $(document).scrollTop(10000);

      }
    }

    self.enviaNome = function(){
      self.escondeForm = true;
      self.letra = self.usuario.nome.substring(0,1).toUpperCase();
      i += 2;
      $('#conversa').append(templateResposta);
      $('#avatar-cliente:last-child').text(self.letra);
      $('.mensagem-container:last-child').find("#txt").text(self.usuario.nome);
      $interval(function(){
        $('#conversa').append(templateMensagem);
        $('.mensagem-container:last-child').find("#txt").text("Prazer, " + self.usuario.nome+"!");
        $('.mensagem-container:last-child').find("#mensagem").removeClass("ng-hide");
        enviaMsg();
      }, 2000, 1);
    }

    self.selTipo = function(){
      self.escondeFormTipo = true;

      $('#conversa').append(templateResposta);
      $('#avatar-cliente:last-child').text(self.letra);
      $('.mensagem-container:last-child').find("#txt").text(self.usuario.tipoCausa);

      if (self.usuario.tipoCausa === "Outro") {
        i += 4;
        enviaMsg();
      }else{
        i += 2;
        enviaMsg();
      }
    }

    self.enviaDescricao = function(){
      self.escondeFormDescricao = true;
      i += 2;
      $('#conversa').append(templateResposta);
      $('#avatar-cliente:last-child').text(self.letra);
      $('.mensagem-container:last-child').find("#txt").text(self.usuario.descricao);

      $interval(function(){
        $('#conversa').append(templateMensagem);
        var x = Math.floor(Math.random() * 2);
        var msgRespostaTipo = ["Bem delicado, mas iremos te ajudar!", "Tudo bem, fique tranquilo pois o seu caso tem solução!"];

          $('.mensagem-container:last-child').find("#txt").text(msgRespostaTipo[x]);
        $('.mensagem-container:last-child').find("#mensagem").removeClass("ng-hide");
        enviaMsg();
      }, 2000, 1);
    }


    self.selecionaCidade = function(){
      if (self.usuario.cidade.length > 3) {
          // console.log(" ------ Cidade selecionada: " + self.usuario.cidade);
          $interval(function(){
            self.escondeBotaoCidade = false;
            time = 1500;
          }, time, 1);

      }


    }

    self.selCidade = function(){
      i += 2;
      self.escondeFormCidade = true;
      $('#conversa').append(templateResposta);
      $('#avatar-cliente:last-child').text(self.letra);
      $('.mensagem-container:last-child').find("#txt").text(self.usuario.cidade);
      enviaMsg();

    }

    self.exibeCidade = function(){
      alert("teste");
    }

    self.enviaEmail = function(){

      $http.get('https://apilayer.net/api/check?access_key=b8857b9961a94eed920d72c25e7d22f6&email='+self.usuario.email+'&smtp=1&format=1')
      .then(successCallback, errorCallback);
      function successCallback(response){
        var t = angular.fromJson(response);
        if (t.data.smtp_check === true) {
          self.escondeFormEmail = true;
          $('#conversa').append(templateResposta);
          $('#avatar-cliente:last-child').text(self.letra);
          i += 2;
          $('.mensagem-container:last-child').find("#txt").text(self.usuario.email);
          $(document).scrollTop(10000);
          enviaMsg();
        } else {
            $('#conversa').append(templateMensagem);
            $('.mensagem-container:last-child').find("#txt").text("Desculpe, não consideramos " + self.usuario.email +" um email válido!");
            $(document).scrollTop(10000);
            $interval(function(){
              $('.mensagem-container:last-child').find("#mensagem").removeClass("ng-hide");
              if (t.data.did_you_mean) {
                $('#conversa').append(templateMensagem);
                $('.mensagem-container:last-child').find("#txt").text("Você quis dizer " + t.data.did_you_mean +"?");
                $interval(function(){

                  $('.mensagem-container:last-child').find("#mensagem").removeClass("ng-hide");
                  $(document).scrollTop(10000);
                }, 1500, 1);
              }
            }, 1000, 1);

        }



      }
      function errorCallback(error){
        console.log(error);
        return error;
      }



    }

    self.enviaTelefone = function(){
      self.escondeFormTelefone = true;
      $('#conversa').append(templateResposta);
      $('#avatar-cliente:last-child').text(self.letra);
      i += 2;
      $('.mensagem-container:last-child').find("#txt").text(String(self.usuario.telefone));
      enviaMsg();
    }

    self.voltar = function (){
      $location.path( '/' );
    };

    var divHover = null,
      windowClick = false;

  $(function(){
    $(window).mousedown(function(){
      windowClick = true;
    });

    $(window).mouseup(function(){
      windowClick = false;
    });

    $('#avatar-eloisa').hover(function(){
      if(divHover === null){
        divHover = $(this);
      }
    }, function(){
      if(windowClick === false){
        divHover = null;
        $(this).css('z-index', '0');
      }
    });

    $(window).mousemove(function(e){
      if(windowClick === true && divHover != null){
        divHover.css({ top: e.clientY - divHover.height() / 2 + 'px', left: e.clientX - divHover.width() / 2 + 'px', position: 'absolute', zIndex: '1' });
      }
    });
  })



}]);
