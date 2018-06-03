(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['RegisterService', '$location', '$rootScope', 'FlashService','AuthenticationService'];
    function RegisterController(RegisterService, $location, $rootScope, FlashService,AuthenticationService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            RegisterService.Register(vm.user.username, vm.user.password, function (response) {
                if (response.status == 200) {
                    AuthenticationService.Login(vm.user.username, vm.user.password, function (response) {
                        if (response.status === 200) {
                            AuthenticationService.SetCredentials(response.data.token, vm.user.username);
                            $location.path('/');
                        } else {
                            FlashService.Error(response.data.message);
                            vm.dataLoading = false;
                        }
                    });
                } else {
                    FlashService.Error(response.data.message);
                    vm.dataLoading = false;
                }
            });
        }
    }

})();
