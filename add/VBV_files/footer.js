BankApp.directive("footer", function () {
    return {
        restrict: 'A',
        scope: true,
        controller: 'FooterController',
        link: function (scope, element, attrs) {
            scope.getContentUrl = function () {
                if (scope.path.footerPath != undefined) {
                    return localeFolder + 'commonpages/' + scope.path.footerPath;
                }
            }
        },
        template: '<div ng-include="getContentUrl()"></div>'
    }
});

BankApp.controller("FooterController", function ($scope, $window) {
    window.$windowScope = $scope;
    $scope.openWindow = function (url, text) {
        $scope.content = url;
        $scope.header = text;
        $window.open(localeFolder + "popup.html" + "?localeFolder=" + localeFolder.replace("/", ''), 'Footer', 'width=390,height=400,resizable=yes');
    };
});