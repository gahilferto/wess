BankApp.directive("disclaimer", function () {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attrs) {
            scope.getContentUrl = function () {
                if (scope.path.disclaimerPath != undefined) {
                    return localeFolder + 'commonpages/' + scope.path.disclaimerPath;
                }
            }
        },
        template: '<div ng-include="getContentUrl()"></div>'
    }
});