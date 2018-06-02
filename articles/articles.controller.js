(function () {
    'use strict';

    angular
        .module('app')
        .controller('ArticlesController', ArticlesController);

    ArticlesController.$inject = ['$rootScope', 'ArticlesService'];
    function ArticlesController($rootScope, ArticlesService){
        var vm =this;
        vm.allArticles= [];
        vm.token = localStorage.getItem('token');

        vm.GetArticles = GetArticles;

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