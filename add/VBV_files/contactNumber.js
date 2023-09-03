BankApp.directive("contactNumber", function () {
    return {
        restrict: 'A',
        scope: true,
        controller: 'contactNumberController',
        link: function (scope, element, attrs) {
            scope.getContentUrl = function () {
                if (scope.path.phoneHTMLpath != undefined) {
                    return localeFolder + 'commonpages/' + scope.path.phoneHTMLpath;
                }
            }
        },
        template: '<div ng-include="getContentUrl()"></div>'
    }
});

BankApp.controller("contactNumberController", function ($scope) {

    if (navigator.userAgent.match(/iPhone/i)) {
        $scope.zoom = " zoomdisable";
    }

    $scope.getDynamicClass = function (input) {
        var classes = 'extphonenumber';
        if ($scope.bankdetail['challenge' + input + 'FieldTooltipMsg'] !== undefined && $scope.bankdetail['challenge' + input + 'FieldTooltipMsg'].length === 0) {
            classes = 'extphonenumberNoInfo';
        }
        if (navigator.userAgent.match(/iPhone/i)) {
            classes = classes + " zoomdisable";
        }

        return classes;
    }

    $scope.getDynamicCSSClass = function (input) {
        return $scope.$parent.getDynamicClass(input);
    }

    $scope.getTooltipMsg = function (challenge) {
        return $scope.$parent.getTooltipMsg(challenge);
    }
});