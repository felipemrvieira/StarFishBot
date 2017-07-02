angular.module('StarFish').controller('LandingController', ['$scope', '$sce', '$location',
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
  // $(function() {
  //
  //     if( navigator.userAgent.match(/Android/i)
  //      || navigator.userAgent.match(/webOS/i)
  //      || navigator.userAgent.match(/iPhone/i)
  //      || navigator.userAgent.match(/iPad/i)
  //      || navigator.userAgent.match(/iPod/i)
  //      || navigator.userAgent.match(/BlackBerry/i)
  //      || navigator.userAgent.match(/Windows Phone/i)
  //      ){
  //        var height = $(window).height() -50 ;
  //        var unitHeight = parseInt(height) + 'px';
  //        $('#sec-1').css('height',unitHeight);
  //      }
  //      else {
  //        var height = $(window).height() -110 ;
  //        var unitHeight = parseInt(height) + 'px';
  //        $('#sec-1').css('height',unitHeight);
  //       }
  //
  //
  // });

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

  var scene = document.getElementById('scene');
  var parallax = new Parallax(scene);

  $(function myMap() {
    var mapCanvas = document.getElementById("map");
    var myCenter = new google.maps.LatLng(-9.653053, -35.714885);
    var mapOptions = {center: myCenter, zoom: 17, scrollwheel: false,
      disableDefaultUI: true};
    var map = new google.maps.Map(mapCanvas,mapOptions);
    var marker = new google.maps.Marker({
      position: myCenter,
      animation: google.maps.Animation.BOUNCE
    });
    marker.setMap(map);
  });

  var options = {
    strings: ["Somos marketing", "Somos websites", "Somos aplicativos", "Somos mídias sociais", "Somos StarFish"],
    typeSpeed: 80,
    backSpeed: 100
  }
  var typed = new Typed("#typed", options);

}]);
