(function (){
    'use strict';

    angular
        .module('app')
        .factory('ArticlesService',ArticlesService);

    ArticlesService.$inject= ['$http','$rootScope'];
    function ArticlesService($http,$rootScope){
        var service =[];
        service.GetArticles = GetArticles;
        service.getArticle = getArticle;
        service.addComment = addComment;
        service.InsertArticle=InsertArticle;
        service.deleteArticle = deleteArticle;
        service.verifyArticleCreator=verifyArticleCreator;
        service.editArticle = editArticle;
        service.getComments = getComments;

        return service;

        //get all articles
         function GetArticles(callback) {
             var req = {
                 method: 'GET',
                 url: 'https://api-pos-backend.herokuapp.com/getArticles/0'
             };
             $http(req).then(
                 function (response) {
                     callback(response);
                 }, function(error){
                     callback(error);
                 });
         }

        // get a single article by uid
         function getArticle(uid,callback) {
             var req={
                 method:'GET',
                 url:'https://api-pos-backend.herokuapp.com/getArticle/' + uid
             };
             $http(req).then(
                 function (response) {
                     callback(response);
                 }, function (error) {
                     callback(error);
                 }
             )

         }

         function addComment(comment,articleUUID,callback) {
             var req={
                 method:'POST',
                 url:'https://api-pos-backend.herokuapp.com/createComment',
                 data:{
                     comment:comment,
                     articleUUID : articleUUID
                 },
                 headers: {
                     "Authorization": "Bearer " + $rootScope.globals.currentUser.token,
                     'Content-Type': 'application/json; charset=utf-8'
                 }
             };
             $http(req).then(
                 function (response) {
                     callback(response);
                 }, function (error) {
                     callback(error);
                 }
             )
         }
         function InsertArticle(articleTitle,articleContent,callback){
             var req={
                 method:'POST',
                 url:'https://api-pos-backend.herokuapp.com/createArticle',
                 data:{
                     articleTitle:articleTitle,
                     articleContent : articleContent
                 },
                 headers: {
                     "Authorization": "Bearer " + token,
                     'Content-Type': 'application/json; charset=utf-8'
                 }
             };
             $http(req).then(
                 function (response) {
                     callback(response);
                 }, function (error) {
                     callback(error);
                 }
             )
         }

         function verifyArticleCreator(articleUUID,callback){
             var req={
                 method:'GET',
                 url:'https://api-pos-backend.herokuapp.com/verifyArticleCreator/'+articleUUID,
                 headers: {
                     "Authorization": "Bearer " + $rootScope.globals.currentUser.token
                 }
             };
             $http(req).then(
                 function (response) {
                     callback(response);
                 }, function (error) {
                     callback(error);
                 }
             )

         }

         function deleteArticle(articleUUID,callback){
             var req={
                 method:'DELETE',
                 url:'https://api-pos-backend.herokuapp.com/deleteArticle/'+articleUUID,
                 headers: {
                     "Authorization": "Bearer " + $rootScope.globals.currentUser.token
                 }
             };
             $http(req).then(
                 function (response) {
                     callback(response);
                 }, function (error) {
                     callback(error);
                 }
             )
         }

         function editArticle(articleTitle,articleContent,articleUUID,callback){
             var req={
                 method:'PUT',
                 url:'https://api-pos-backend.herokuapp.com/updateArticle',
                 headers: {
                     "Authorization": "Bearer " + $rootScope.globals.currentUser.token,
                     'Content-Type':'application/json; charset=utf-8'
                 },
                 data: {
                     articleTitle:articleTitle,
                     articleContent:articleContent,
                     articleUUID:articleUUID
                 }

             };
             $http(req).then(
                 function (response) {
                     callback(response);
                 }, function (error) {
                     callback(error);
                 }
             )
         }

         function getComments(articleUUID,callback) {
             var req={
                 method:'GET',
                 url:'https://api-pos-backend.herokuapp.com/getComments/' + articleUUID
             };
             $http(req).then(
                 function (response) {
                     callback(response);
                 }, function (error) {
                     callback(error);
                 }
             )
         }
    }
})();