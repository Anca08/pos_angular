(function () {
    'use strict';

    angular
        .module('app')
        .controller('EditArticleController', EditArticleController);

    EditArticleController.$inject = ['ArticlesService', '$location', '$rootScope', 'FlashService', 'UserService'];

    function EditArticleController(ArticlesService, $location, $rootScope, FlashService,UserService) {
        var vm = this;
        var array = $location.$$url.split('/');
        vm.articleTitle = null;
        vm.articleContent = null;
        vm.articleUUID = array[array.length - 1];
        vm.editArticle = editArticle;
        vm.getArticle = getArticle;

        initController();
        function initController() {
            getArticle(vm.articleUUID);
        }
        function editArticle() {
            ArticlesService.editArticle(vm.newArticleTitle || vm.articleTitle, vm.newArticleContent || vm.articleContent,vm.articleUUID,
                function (response) {
                    if (response.status === 200) {
                        $location.path('/article/'+vm.articleUUID);
                        FlashService.Success(response.data.message);
                    } else {
                        FlashService.Error(response.data.message);
                        vm.dataLoading = false;
                    }
                })
        }
        function getArticle(uid){
            vm.dataLoading = true;
            ArticlesService.getArticle(uid,function(response){
                if (response.status === 200) {
                    vm.articleTitle = response.data.genericListResponse[0].articleTitle;
                    vm.articleContent = response.data.genericListResponse[0].articleContent;
                }else {
                    FlashService.Error(response.data.message);
                    vm.dataLoading = false;
                }
            })
        }
    }
})();