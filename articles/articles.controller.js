(function () {
    'use strict';

    angular
        .module('app')
        .controller('ArticlesController', ArticlesController);

    ArticlesController.$inject = ['$rootScope', 'ArticlesService','UserService'];
    function ArticlesController($rootScope, ArticlesService,UserService){
        var vm =this;
        vm.allArticles= [];
        vm.GetArticles = GetArticles;
        vm.username = $rootScope.globals.currentUser ? $rootScope.globals.currentUser.username : "";

         (function initController() {
             GetArticles();
         })();
        function GetArticles() {
            ArticlesService.GetArticles(
                function (response) {
                    if (response.status === 200) {
                        vm.allArticles=response.data.genericListResponse;
                    } else {
                        FlashService.Error(response.data.message);
                        vm.dataLoading = false;
                    }
                })

        }

    }

})();