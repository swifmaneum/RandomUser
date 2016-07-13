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
    $scope.user = null;

    $scope.userService = userService;

    $scope.getNextUser = function (value) {
        var promise = $scope.userService.getRandomUser(value);
        promise.then(
         function (response) {
             $scope.user = response.data.results[0];
         },
         function (errorPayload) {

             $ionicPopup.alert({
                 title: 'Ooops',
                 template: errorPayload.statusText + ' Please try again!'
             });

             console.log(errorPayload);
         });
    };
}]);

app.factory('userService', ['$http', function ($http) {
    return {
        getRandomUser: function (value) {
            return $http.get("https://randomuser.me/api/");
        }
    }
}
]);