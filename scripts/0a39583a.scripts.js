(function(){"use strict";angular.module("facegroupApp",["ngCookies","ngResource","ngSanitize","ngRoute","facebook"]).config(["FacebookProvider","$routeProvider",function(a,b){return b.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/feed",{templateUrl:"views/feed.html",controller:"GroupCtrl"}).otherwise({redirectTo:"/feed"}),a.init("1542283212663514")}])}).call(this),function(){"use strict";angular.module("facegroupApp").controller("MainCtrl",["$scope","Facebook","$location",function(a,b,c){return a.$watch(function(){return b.isReady()},function(){return a.facebookReady=!0}),a.logged=!1,a.login=function(){return b.getLoginStatus(function(d){return"connected"===d.status?a.$apply(function(){return a.logged=!0,c.path("/feed")}):b.login(function(){return a.logged=!0},{scope:["user_about_me","user_groups","email"]})})},a.logout=function(){return b.isReady()?b.logout(function(){return a.$apply(function(){return a.logged=!1})}):void 0}}])}.call(this),function(){"use strict";angular.module("facegroupApp").controller("GroupCtrl",["$scope","Facebook",function(a,b){return b.getLoginStatus(function(b){return"connected"===b.status?a.fetchGoups():void 0}),a.fetchGoups=function(){return b.api("/me/groups?fields=icon,email,name,id&icon_size=16",function(b){return a.$apply(function(){return a.groups=b.data})})},a.showFeed=function(c){return b.api("/"+c.id+"?fields=feed.fields(message,from,comments.limit(200).fields(from,message),full_picture,picture)&limit=100",function(b){return a.$apply(function(){return a.groupFeed={id:b.id,feed:b.feed.data,totalMessages:b.feed.data.length}})})}}])}.call(this);