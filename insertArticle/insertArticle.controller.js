(function () {
    'use strict';

    angular
        .module('app')
        .controller('InsertArticleController', InsertArticleController);

    InsertArticleController.$inject = ['$location','$rootScope', 'ArticlesService', 'FlashService'];
    function InsertArticleController($location,$rootScope, ArticlesService, FlashService) {
        var vm = this;
        vm.token =$rootScope.globals.currentUser.token;
        vm.insertArticle = insertArticle;

        function insertArticle() {
            vm.dataLoading = true;
            ArticlesService.InsertArticle(vm.articleTitle, vm.articleContent, function (response) {
                if (response.status === 200) {
                    $location.path('/articles');
                    FlashService.Success(response.data.message);
                } else {
                    FlashService.Error(response.data.message);
                    vm.dataLoading = false;
                }
            });
        };

    }

})();
