(function () {
    'use strict';

    angular
        .module('app')
        .controller('SingleArticleController', SingleArticleController);

    SingleArticleController.$inject = ['ArticlesService', '$location', '$rootScope', 'FlashService', 'UserService'];

    function SingleArticleController(ArticlesService, $location, $rootScope, FlashService,UserService) {
        var vm = this;
        vm.article = null;
        vm.comments =null;
        vm.isAdmin = false;
        vm.token = $rootScope.globals.currentUser ? $rootScope.globals.currentUser.token : "";
        vm.getArticle = getArticle;
        vm.addComment = addComment;
        vm.deleteArticle = deleteArticle;
        vm.verifyArticleCreator=verifyArticleCreator;
        vm.getComments = getComments;

        initController();

        function initController() {
            var array = $location.$$url.split('/');
            var articleUUID = array[array.length - 1];
            getArticle(articleUUID);
            getComments(articleUUID);
            verifyArticleCreator(articleUUID);
            isAdmin();
        }
        function getArticle(uid) {
            vm.dataLoading = true;
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
            vm.dataLoading = true;
            ArticlesService.addComment(vm.commentContent,vm.article.articleUUID,
                function (response) {
                    if (response.status === 200) {
                        window.location.reload();
                    } else {
                        FlashService.Error(response.data.message);
                        vm.dataLoading = false;
                    }
            })
        }
        function verifyArticleCreator(articleUUID){
            vm.dataLoading = false;
            ArticlesService.verifyArticleCreator(articleUUID,
                function (response) {
                    if (response.status === 200 && response.data.status === 2) {
                        vm.dataLoading = true;
                    } else {
                        vm.dataLoading = false;
                    }
                })
        }
        function deleteArticle(articleUUID) {
            ArticlesService.deleteArticle(articleUUID, function (response){
                if(response.status === 200){
                    FlashService.Success(response.data.message);
                    $location.path('/articles');
                } else {
                    FlashService.Error(response.data.message);
                }
            })
        }
        function isAdmin(){
            UserService.isAdmin(function(response){
                if(response.data.status === 2){
                    vm.isAdmin =true;
                }else{ vm.isAdmin=false;}
            })
        }
        function getComments(articleUUID){
                ArticlesService.getComments(articleUUID,function (response) {
                    if(response.status === 200){
                        vm.comments = response.data;
                    }
                })


        }
    }
})();