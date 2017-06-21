'use strict';

vodApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'templates/dashboard.html',
                controller: 'dashboardCtrl'
            })
            .state('videoDetails', {
                url: '/videoDetails',
                params:{video:undefined},
                templateUrl: 'templates/videoDetails.html',
                controller:'videoCtrl'
                
            })
    }
]);