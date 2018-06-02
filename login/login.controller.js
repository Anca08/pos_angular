(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;
        vm.logout = logout;

        (function initController() {
             // reset login status
             AuthenticationService.ClearCredentials();
         })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.status === 200) {
                    AuthenticationService.SetCredentials(response.data.token, vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.data.message);
                    vm.dataLoading = false;
                }
            });
        };

        function logout(){
            AuthenticationService.ClearCredentials();
            $location.path('/');
        }
    }

})();
