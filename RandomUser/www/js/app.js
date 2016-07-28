// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });

app.controller('UserController', ['$scope', 'userService', "$ionicPopup", function ($scope, userService, $ionicPopup) {
    $scope.users = null;

    $scope.userService = userService;

    $scope.configuration = {
        //numberOfResults: 3,
        gender: "male",
        nationality: "DE"
    }

    $scope.getUsers = function (config) {
        var promise = $scope.userService.getRandomUsers(config);
        promise.then(
         function (payload) {
             $scope.users = payload;
         },
         function (errorPayload) {

             $ionicPopup.alert({
                 title: 'Ooops',
                 template: errorPayload + '. Please try again!'
             });
         });
    };
}]);

app.factory('userService', ['$http', function ($http) {
    var buildQueryString = function (config) {
        var url = "https://randomuser.me/api/";

        var number;
        if (config.numberOfResults === null || config.numberOfResults === "" || isNaN(config.numberOfResults)) {
            number = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        } else {
            number = config.numberOfResults;
        }
        var numberQuery = "?results=" + number;

        var genderQuery = "";
        if (config.gender === "male" || config.gender === "female") {
            genderQuery = "&gender=" + config.gender;
        }

        var natQuery = "";
        if (config.nationality === "DE" || config.nationality === "US" || config.nationality === "GB") {
            natQuery = "&nat=" + config.nationality;
        }

        return url + numberQuery + genderQuery + natQuery;
    };
    return {
        getRandomUsers: function (config) {
            var queryString = buildQueryString(config);

            return $http.get(queryString).then(
              function (response) {
                  return response.data.results;
              },
              function (httpError) {
                  // translate the error
                  throw httpError.statusText;
              });
        },
        buildQueryString: function (config) {

        }
    }
}
]);