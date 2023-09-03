BankApp.directive('ngFocus', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(attrs.ngFocus, function (val) {
                if (angular.isDefined(val) && val) {
                    $timeout(function () {
                        element[0].focus();
                    });
                }
            }, true);

            element.bind('blur', function () {
                if (angular.isDefined(attrs.ngFocusLost)) {
                    scope.$apply(attrs.ngFocusLost);

                }
            });
        }
    };
});

BankApp.directive('myMaxlength', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            attrs.$set("ngTrim", "false");
            ctrl.$parsers.push(function (value) {
                if (parseInt(attrs.myMaxlength, 10) > 0 && value !== undefined && value.length > parseInt(attrs.myMaxlength, 10)) {
                    value = value.substr(0, parseInt(attrs.myMaxlength, 10));
                    ctrl.$setViewValue(value);
                    ctrl.$render();
                }
                return value;
            });
        }
    };
}]);
BankApp.directive('cachedTemplate', ['$templateCache', function ($templateCache) {
    "use strict";
    return {
        restrict: 'A',
        terminal: true,
        compile: function (element, attr) {
            if (attr.type === 'text/data-ng-template') {
                var templateUrl = attr.cachedTemplate,
                    text = element.html();
                $templateCache.put(templateUrl, text);
            }
        }
    };
}]);
BankApp.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                ngModelCtrl.$setValidity(attr.numbersOnly, true);
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    } else if (text.length < parseInt(attr.numbersOnly, 10)) {
                        ngModelCtrl.$setValidity(attr.numbersOnly, false);
                    } else {
                        ngModelCtrl.$setValidity(attr.numbersOnly, true);
                       
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
BankApp.directive('allowOnlyNumbers', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val.replace(/[^0-9.]/g, '');

                    if (digits.split('.').length > 2) {
                        digits = digits.substring(0, digits.length - 1);
                    }

                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseFloat(digits);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});