(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', 'AuthenticationService'];

    function HomeController(UserService, $rootScope, AuthenticationService) {
        var vm = this;
        vm.allUsers =[];
        vm.users = [];
        vm.username = $rootScope.globals.currentUser.username;
        vm.isAdmin = false;

        vm.logout = logout;
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            isAdmin();
        }
        function logout(){
            AuthenticationService.ClearCredentials();
        }
        function isAdmin(){
            UserService.isAdmin(function(response){
                if(response.data.status === 2) {
                    vm.isAdmin = true;
                    loadAllUsers();
                }else{
                    vm.isAdmin = false;
                }
            })
        }
        function loadAllUsers() {
            UserService.GetAllUsers(function (response) {
                if(response.status === 200){
                    vm.allUsers = response.data.genericListResponse;

                    for(var u in vm.allUsers)
                    {
                        if (vm.allUsers[u].username !== vm.username) {
                            vm.users.push(vm.allUsers[u]);
                        }
                    }
                }
            });
        }
        function deleteUser(id) {
            UserService.Delete(id,function (response) {
                if(response.status ===200)
                    loadAllUsers();
                });
        }
    }

})();