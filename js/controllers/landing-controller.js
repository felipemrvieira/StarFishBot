angular.module('casosJuridicos').controller('LandingController', ['$scope', '$sce', '$location',
function($scope, $sce, $location){

  var self = this;

  $scope.goChat = function (){
    $location.path( '/chat' );
  };

  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
      }
    });
  });

  // $(function(){
  //     $(".element").typed({
  //       strings: ["^900 E nós estamos prontos para te atender com os melhores do mercado!"],
  //       typeSpeed: 0
  //     });
  // });

//seta a altura da area
  $(function() {

      if( navigator.userAgent.match(/Android/i)
       || navigator.userAgent.match(/webOS/i)
       || navigator.userAgent.match(/iPhone/i)
       || navigator.userAgent.match(/iPad/i)
       || navigator.userAgent.match(/iPod/i)
       || navigator.userAgent.match(/BlackBerry/i)
       || navigator.userAgent.match(/Windows Phone/i)
       ){
         var height = $(window).height() -50 ;
         var unitHeight = parseInt(height) + 'px';
         $('#sec-1').css('height',unitHeight);
       }
       else {
         var height = $(window).height() -110 ;
         var unitHeight = parseInt(height) + 'px';
         $('#sec-1').css('height',unitHeight);
        }


  });

  self.menuAberto = false;

  self.openNav = function(){
    if(self.menuAberto === true){
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("sec-1").style.filter= "blur(0px)";
      self.menuAberto = false;
    }else{
      document.getElementById("mySidenav").style.width = "250px";
      document.getElementById("sec-1").style.filter= "blur(1px)";
      self.menuAberto = true;
    }

  }

  self.closeNav = function() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("sec-1").style.filter= "blur(0px)";
    self.menuAberto = false;


  }
}]);
