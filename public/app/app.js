'use strict';

angular.module('App', [
        'ngSanitize',
        'ngRoute',
        'satellizer'
    ])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    })
    .config(function ($authProvider) {
        // Optional: For client-side use (Implicit Grant), set responseType to 'token'
        $authProvider.facebook({
            clientId: '600121516807390',
            responseType: 'token',
            redirectUri: 'http://localhost:5000/#/home'
        });
        //$authProvider.withCredentials = false;
    })
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: "views/login.html",
                controller: "loginCtrl"
            })
            .when("/home", {
                templateUrl: "views/home.html",
                controller: "homeCtrl",
                data: {requiredLogin: true}
            })
            .when("/signup", {
                templateUrl: "views/signup.html",
                controller: "signupCtrl"
            })
            .when("/hellos", {
                templateUrl: "views/hellos.html",
                controller: "homeCtrl"
            })
            .otherwise({
                redirectTo: "/"
            });
    }]);