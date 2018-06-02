(function () {
    'use strict';
    angular
        .module('app')
        .factory('RegisterService',RegisterService);

    RegisterService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService'];
    function RegisterService ($http, $cookies, $rootScope, $timeout, UserService) {
        var service = {};
        service.Register = Register;
        return service;


        function  Register(username, password, callback) {
            var req = {
                method: 'POST',
                url: 'https://api-pos-backend.herokuapp.com/register',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                data: { username: username, password: password }
            };

            $http(req).then(function (response) {
                callback(response);
            }, function(error){
                callback(error);
            });
        }


    }



})();