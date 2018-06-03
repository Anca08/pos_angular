(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })
            .when('/articles',{
                controller: 'ArticlesController',
                templateUrl: 'articles/articles.view.html',
                controllerAs: 'vm'
            })
            .when('/article/:id',{
                controller: 'SingleArticleController',
                templateUrl: 'singleArticle/singleArticle.view.html',
                controllerAs: 'vm'
            })
            .when('/edit/:id',{
                controller: 'EditArticleController',
                templateUrl: 'editArticle/editArticle.view.html',
                controllerAs: 'vm'
            })
            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })
            .when('/insertArticle',{
                controller:'InsertArticleController',
                templateUrl:'insertArticle/insertArticle.view.html',
                controllerAs:'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};

     /*   if ($rootScope.globals.currentUser) {
                var usr = $rootScope.globals.currentUser.username;
                if (usr) {
                    var loginButtons = document.getElementsByClassName("loginButtons");
                    var logoutButtons = document.getElementById("logoutButtons");
                    $(loginButtons).css('display', 'none');
                    $(logoutButtons).css('display', 'block');
                    document.getElementById('displayUsername').innerHTML = "Hello, " + usr + "!";

                }
        }*/

        $rootScope.$on('$locationChangeStart', function () {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register','/articles']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
            if (loggedIn) {
                var usr = $rootScope.globals.currentUser.username;
                if (usr) {
                    var loginButtons = document.getElementsByClassName("loginButtons");
                    var logoutButtons = document.getElementById("logoutButtons");
                    $(loginButtons).css('display', 'none');
                    $(logoutButtons).css('display', 'block');
                    document.getElementById('displayUsername').innerHTML = "Hello, " + usr + "!";

                }
            }
        });
    }

})();