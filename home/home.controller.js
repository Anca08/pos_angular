(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', 'AuthenticationService'];

    function HomeController(UserService, $rootScope, AuthenticationService) {
        var vm = this;

        vm.username = $rootScope.globals.currentUser.username;
        vm.logout = logout;

        //initController();

        /*function initController() {
            vm.user.username = $rootScope.globals.currentUser.username;
        }*/

        function logout(){
            AuthenticationService.ClearCredentials();

        }
    }

})();