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

// mapagoogle maps
  $(function myMap() {
    var mapCanvas = document.getElementById("map");
    var myCenter = new google.maps.LatLng(-9.653053, -35.714885);
    var mapOptions = {center: myCenter, zoom: 15, scrollwheel: false,
      };
    var map = new google.maps.Map(mapCanvas,mapOptions);
    var marker = new google.maps.Marker({
      position: myCenter,
      icon:'img/pin.png',
      animation: google.maps.Animation.BOUNCE
    });
    marker.setMap(map);
  });

// seta a digitação
  var options = {
    strings: ["Somos marketing", "Somos websites", "Somos aplicativos", "Somos mídias sociais", "Somos StarFish"],
    typeSpeed: 80,
    backSpeed: 50
  }
  var typed = new Typed("#typed", options);

  $(function () { // wait for document ready
    var controller = new ScrollMagic.Controller();
		// build scene
		var scene = new ScrollMagic.Scene({
      triggerElement: "#sec-2",
      duration: 600,
      triggerHook: 0.1

    })
		.setPin("#scene")
		// .addIndicators({name: "trigger pin"})
		.addTo(controller);
	});

  $(function () { // wait for document ready
		var flightpath = {
			entry : {
				curviness: 1.25,
				autoRotate: true,
				values: [
						{x: 100,	y: -20},
						{x: 300,	y: 10}
					]
			},
			looping : {
				curviness: 1.25,
				autoRotate: true,
				values: [
						{x: 510,	y: 40},
						{x: 620,	y: -60},
						{x: 500,	y: -100},
						{x: 380,	y: 20},
						{x: 500,	y: 40},
						{x: 580,	y: 20},
						{x: 620,	y: 15}
					]
			},
			leave : {
				curviness: 1.25,
				autoRotate: true,
				values: [
						{x: 660,	y: -100},
						{x: 800,	y: -300},
						{x: $(window).width() + 300,	y: -100},
					]
			}
		};
		// init controller
		var controller2 = new ScrollMagic.Controller();

		// create tween
		var tween = new TimelineMax()
			.add(TweenMax.to($("#ovni"), 1.2, {css:{bezier:flightpath.entry}, ease:Power1.easeInOut}))
			.add(TweenMax.to($("#ovni"), 2, {css:{bezier:flightpath.looping}, ease:Power1.easeInOut}))
			.add(TweenMax.to($("#ovni"), 1, {css:{bezier:flightpath.leave}, ease:Power1.easeInOut}));

		// build scene
		var scene = new ScrollMagic.Scene({
      triggerElement: "#sec-2",
      duration: 600,
      triggerHook: 0.1
    })
						.setPin("#ovni")
						.setTween(tween)
            // .addIndicators({name: "trigger rotate"})
						.addTo(controller2);
	});

}]);
