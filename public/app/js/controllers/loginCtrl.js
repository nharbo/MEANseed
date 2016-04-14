'use strict';

angular.module('App')

    .controller('loginCtrl', ["$scope", "$http", "$sanitize", "$location", "$window", function ($scope, $http, $sanitize, $location, $window) {

        $scope.message = "hello from login controller";

        $scope.login = function () {

            var data = {
                userName: $sanitize($scope.username),
                password: $sanitize($scope.password)
            };

            $http({
                method: 'POST',
                url: 'http://localhost:5000/api/auth/authenticate',
                headers: {'Content-Type': 'application/json'},
                data: angular.toJson(data)
            }).success(function (data) {
                $scope.info = data.msg;
                $scope.token = data.token;
                $window.sessionStorage.token = data.token; //token gemmes i session
                //$rootScope.isAuthenticated = true;
                $location.path("/home");
            }).error(function (data) {
                $scope.info = data.msg;
            })
        };

        //$scope.loginFacebook = function () {
        //
        //    $http.get("/api/auth/login/facebook")
        //        .success(function (data) {
        //            console.log("Success in facebooklogin");
        //            $scope.token = data.token;
        //        }).error(function (data) {
        //            console.log("failed facebook login!")
        //    });
        //};


    }]);