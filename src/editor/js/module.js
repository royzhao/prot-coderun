/**
 * Created by zpl on 15-2-2.
 */
//angular.module('Editor', [,'ui.bootstrap', 'ui.router', 'ngCookies']);
angular.module('Editor', ['ui.bootstrap', 'ui.router', 'ngCookies','ngStorage','ui.ace','permission','ngDialog','ngResource','ngSanitize']);
var apiService = "http://local.learn4me.com";
var baseUrl = "/api";
var ssoUrl = "http://sso.learn4me.com/login.php?refer=";
