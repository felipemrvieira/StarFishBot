angular.module('casosJuridicos',['ngRoute']).config(function($routeProvider, $locationProvider) {

        // $locationProvider.html5Mode(true);

        $routeProvider.when('/', {
            templateUrl: 'partials/landing.html',
            controller: 'LandingController',
            controllerAs: 'landingCtrl'

        });

        $routeProvider.when('/chat', {
            templateUrl: 'partials/chat.html',
            controller: 'ChatController',
            controllerAs: 'chatCtrl'
        });

        $routeProvider.otherwise({redirectTo: '/'});

    });
