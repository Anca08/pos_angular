(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['RegisterService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(RegisterService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            RegisterService.Register(vm.user.username, vm.user.password, function (response) {
                if (response.status == 200) {
                    //AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.data.message);
                    vm.dataLoading = false;
                }
            });
        }
    }

})();
