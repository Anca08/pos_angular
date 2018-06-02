(function (){
    'use strict';

    angular
        .module('app')
        .factory('ArticlesService',ArticlesService);

    ArticlesService.$inject= ['$http'];
    function ArticlesService($http){
        var service =[];
        service.GetArticles = GetArticles;
        service.getArticle = getArticle;
        service.addComment = addComment;
        service.InsertArticle=InsertArticle;

        return service;

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
                     "Authorization": "Bearer " + localStorage.getItem('token'),
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
                     "Authorization": "Bearer " + localStorage.getItem('token'),
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
    }
})();