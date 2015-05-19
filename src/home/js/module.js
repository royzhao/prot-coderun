angular.module('Home', ['ui.router', 'ngCookies','ngStorage','permission','ngResource']);
var baseUrl = "/api";
var rootUrl = window.location.href
var ssoUrl = "http://sso.learn4me.com/login.php?refer=";
