(function () {
    'use strict';

    angular
        .module('app')
        .controller('SingleArticleController', SingleArticleController);

    SingleArticleController.$inject = ['ArticlesService', '$location', '$rootScope', 'FlashService'];

    function SingleArticleController(ArticlesService, $location, $rootScope, FlashService) {
        var vm = this;
        vm.article = null;
        vm.token = localStorage.getItem('token');

        vm.getArticle = getArticle;
        vm.addComment = addComment;
        initController();

        function initController() {
            var array = $location.$$url.split('/');
            var uid = array[array.length - 1];
            getArticle(uid);
        }
        function getArticle(uid) {
            ArticlesService.getArticle(uid,function(response){
                if (response.status === 200) {
                    vm.article = response.data.genericListResponse[0];
                }else {
                    FlashService.Error(response.data.message);
                    vm.dataLoading = false;
                }
            })
        }
        function addComment() {
            ArticlesService.addComment(vm.commentContent,vm.article.articleUUID,function (response) {
                if (response.status === 200) {
                    window.location.reload();
                }
                else {
                    FlashService.Error(response.data.message);
                    vm.dataLoading = false;
                }
            })
        }
    }
})();