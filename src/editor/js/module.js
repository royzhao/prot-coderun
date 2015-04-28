/**
 * Created by zpl on 15-2-2.
 */
//angular.module('Editor', [,'ui.bootstrap', 'ui.router', 'ngCookies']);
angular.module('Editor', ['ui.bootstrap', 'ui.router', 'ngCookies','ngStorage','ui.ace','permission','btford.markdown','ngDialog','ngResource','ngSanitize']);
var baseUrl = "/api";
var ssoUrl = "http://sso.learn4me.com/login.php?refer=";