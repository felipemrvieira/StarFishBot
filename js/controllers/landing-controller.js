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
		.addIndicators({name: "trigger pin"})
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
            .addIndicators({name: "trigger rotate"})
						.addTo(controller2);
	});

  $(function(){

	var $window = $(window);		//Window object

	var scrollTime = 1;			//Scroll time
	var scrollDistance = 80;		//Distance. Use smaller value for shorter scroll and greater value for longer scroll

	$window.on("mousewheel DOMMouseScroll", function(event){

		event.preventDefault();

		var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
		var scrollTop = $window.scrollTop();
		var finalScroll = scrollTop - parseInt(delta*scrollDistance);

		TweenMax.to($window, scrollTime, {
			scrollTo : { y: finalScroll, autoKill:true },
				ease: Power1.easeOut,	//For more easing functions see https://api.greensock.com/js/com/greensock/easing/package-detail.html
				autoKill: true,
				overwrite: 5
			});

	});

});



}]);
