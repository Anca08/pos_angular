(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http','$rootScope'];
    function UserService($http, $rootScope) {
        var service = {};

        service.GetAllUsers = GetAllUsers;
        service.Delete = Delete;
        service.isAdmin = isAdmin;

        return service;

        function isAdmin(callback){
            if($rootScope.globals.currentUser.token){
                var req = {
                    method: 'GET',
                    url: 'https://api-pos-backend.herokuapp.com/isAdmin',
                    headers: {
                        "Authorization": "Bearer " + $rootScope.globals.currentUser.token
                    },
                    data: { token: $rootScope.globals.currentUser.token}
                };

                $http(req).then(function (response) {
                    callback(response);
                }, function(error){
                    callback(error);
                });
            }
        }

        function GetAllUsers(callback) { //listUsers
            var req = {
                method: 'GET',
                url: 'https://api-pos-backend.herokuapp.com/listUser',
                headers: {
                    "Authorization": "Bearer " + $rootScope.globals.currentUser.token
                }
            };

            $http(req).then(function (response) {
                callback(response);
            }, function(error){
                callback(error);
            });
        }

        function Delete(id,callback) {
            var req = {
                method: 'DELETE',
                url: 'https://api-pos-backend.herokuapp.com/deleteUser/' + id,
                headers: {
                    "Authorization": "Bearer " + $rootScope.globals.currentUser.token
                }
            };

            $http(req).then(function (response) {
                callback(response);
            }, function(error){
                callback(error);
            });
        }
}

})();
