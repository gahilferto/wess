BankApp.directive("header", function () {
    return {
        restrict: 'A',
        scope: true,
        controller: 'HeaderController',
        link: function (scope, element, attrs) {
            scope.getContentUrl = function () {
                if (scope.path.headerPath != undefined) {
                    return localeFolder + 'commonpages/' + scope.path.headerPath;
                }
            }
        },
        template: '<div ng-include="getContentUrl()"></div>'
    }
});

BankApp.controller("HeaderController", function ($scope, $window) {
    $scope.isPopUpHeaderLeftLogo = false;
    $scope.isPopUpHeaderRightLogo = false;
    if ($scope.uploadcontent.leftLogo !== undefined && $scope.uploadcontent.leftLogo.indexOf(".action") === -1 && document.getElementById('iqaForm') === null) {       
        $scope.isPopUpHeaderLeftLogo = true;
    }
    if ($scope.uploadcontent.rightLogo !== undefined && $scope.uploadcontent.rightLogo.indexOf(".action") === -1 && document.getElementById('iqaForm') === null) {        
        $scope.isPopUpHeaderRightLogo = true;
    }
});