/**
 * Created by zpl on 15-2-2.
 */
angular.module('Image', ['angularTreeview','ui.bootstrap', 'ui.router', 'ngCookies','ngResource','permission','ngDialog']);
var ssoUrl = "http://sso.learn4me.com/login.php?refer=";
var apiService = "http://local.learn4me.com";
var baseUrl = "/api";