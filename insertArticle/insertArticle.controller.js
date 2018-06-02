(function () {
    'use strict';

    angular
        .module('app')
        .controller('InsertArticleController', InsertArticleController);

    InsertArticleController.$inject = ['$location', 'ArticlesService', 'FlashService'];
    function InsertArticleController($location, ArticlesService, FlashService) {
        var vm = this;
        vm.token = localStorage.getItem('token');
        vm.insertArticle = insertArticle;

        function insertArticle() {
            vm.dataLoading = true;
            ArticlesService.InsertArticle(vm.articleTitle, vm.articleContent, function (response) {
                if (response.status === 200) {
                    $location.path('/articles');
                } else {
                    FlashService.Error(response.data.message);
                    vm.dataLoading = false;
                }
            });
        };

    }

})();
