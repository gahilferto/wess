BankApp.directive("challenge", function () {
    var linker = function (scope, element, attrs) {
        scope.initialyzeScope();
        scope.getContentUrl = function () {
            return localeFolder + 'commonpages/challenge.html';
        }
        scope.$on('changinglocale', function (event, data) {
            scope.initialyzeScope();
        });
    }
    return {
        //templateUrl: localeFolder + 'commonpages/challenge.html',
        template: '<div ng-include="getContentUrl()"></div>',
        transclude: true,
        scope: false,
        controller: 'challengeController',
        link: linker
    };
}).directive('fixCrappyIeSelect', function () {
    return {
        restrict: 'A',
        scope: {
            options: '=fixCrappyIeSelect'
        },
        controller: ['$scope', '$element', function ($scope, $element) {
            $scope.$watch('options', function () {
                var $option = $('<option>');
                // for some reason, it needs both, getting the width and changing CSS options to rerender select
                $element.css('width');
                $element.addClass('repaint').removeClass('repaint');
                // add and remove option to rerender options
                $option.appendTo($element).remove();
            });
        }]
    };
});
BankApp.controller("challengeController", function ($scope, $timeout) {

    $scope.openTextBox = true;
    var timer = false;
    $scope.challengeMsg = [{}];
    $scope.challengeLengthMsg = [{}];
    $scope.challengeHideFlag = [{}];
    $scope.dateValidationMsg = [{}];
    $scope.dateCSSClass = "{'first': $first,'middle': $middle,'last': $last}";

    $scope.gettooltipErrorCssClass = function (input) {
        if ($scope.bankdetail['challenge' + input + 'FieldTooltipMsg'] === undefined || $scope.bankdetail['challenge' + input + 'FieldTooltipMsg'].length === 0) {
            return 'custom_tooltiperrorNoInfo';
        } else {
            return 'custom_tooltiperror';
        }
    }

    $scope.getDynamicClass = function (input) {
        var classes = 'inputbox';
        if ($scope.bankdetail['challenge' + input + 'FieldTooltipMsg'] === undefined || $scope.bankdetail['challenge' + input + 'FieldTooltipMsg'].length === 0) {
            $scope.customtooltiperror = 'custom_tooltiperrorNoInfo';
            classes = 'noInfo';
        }
        if (navigator.userAgent.match(/iPhone/i)) {
            classes = classes + " zoomdisable";
        }

        return classes;
    }

    $scope.initialyzeScope = function () {
        $scope.totaldays = 31;
        var totalyears = $scope.bankdetail.totalYearsDOB;
        var totalyearsexpiry = $scope.bankdetail.totalyearsexpiry;
        $scope.days = [];
        if ($scope.bankdetail.dd != undefined) {
            $scope.days.push($scope.bankdetail.dd);
        }
        for (var i = 1; i <= $scope.totaldays; i++) {
			if(i<10){
				$scope.days.push("0"+i);
			}else{
				$scope.days.push(i);
			}
        }
        $scope.DOBYears = [];
        $scope.ExpYears = [];
        $scope.ValidFromYears = [];
        if ($scope.bankdetail.yyyy != undefined) {
            $scope.DOBYears.push($scope.bankdetail.yyyy);
            $scope.ExpYears.push($scope.bankdetail.yyyy);
            $scope.ValidFromYears.push($scope.bankdetail.yyyy);
        } else {
            $scope.DOBYears.push($scope.bankdetail.yy);
            $scope.ExpYears.push($scope.bankdetail.yy);
            $scope.ValidFromYears.push($scope.bankdetail.yy);
        }
        var currentYear = new Date().getFullYear();

        for (var i = currentYear; i < currentYear + parseInt(totalyearsexpiry); i++) {
            $scope.ExpYears.push(i);
        }

        for (var i = currentYear + 1; i > currentYear - parseInt(totalyearsexpiry); i--) {
            $scope.ValidFromYears.push(i - 1);
        }

        for (var i = currentYear + 1; i > currentYear - parseInt(totalyears); i--) {
            $scope.DOBYears.push(i - 1);
        }

        if ($scope.jsonobj !== undefined && $scope.jsonobj.challengeInfo !== undefined) {
            var challenge = $scope.jsonobj.challengeInfo;
            for (var i in challenge) {
                if (challenge[i].datatype === 'DATE') {
                    if ($scope.date[challenge[i].input] === undefined) {
                        $scope.$parent.date = {};
                        $scope.$parent.date[challenge[i].input] = {};
                    }
                    if (isNaN($scope.date[challenge[i].input]['dd']) && challenge[i].pattern.split('/').length === 3) {
                        /*console.log("Date: " + $scope.date[challenge[i].input]['dd']);
                        console.log("Json Value: " + $scope.bankdetail.dd);*/
                        $scope.date[challenge[i].input]['dd'] = $scope.bankdetail.dd;
                    }
                    if (isNaN($scope.date[challenge[i].input]['yyyy'])) {
                        //console.log("yyyy: " + $scope.date[challenge[i].input]['yyyy']);
                        $scope.date[challenge[i].input]['yyyy'] = $scope.bankdetail.yyyy;
                    }
                    if ($scope.date[challenge[i].input]['mm'] == '00') {
                        //console.log("mm: " + $scope.date[challenge[i].input]['mm']);
                        $scope.date[challenge[i].input]['mm'] = $scope.bankdetail.monthArray[0].key;
                    }

                    if (challenge[i].pattern.split('/').length === 3 && ($scope.bankdetail['challenge' + challenge[i].input + 'FieldTooltipMsg'] == undefined || $scope.bankdetail['challenge' + challenge[i].input + 'FieldTooltipMsg'].length === 0)) {
                        $scope.dateCSSClass = "{'firstDy': $first,'middleDy': $middle,'lastDy': $last}";
                        break;
                    }
                    $scope.onSelect(challenge[i]);
                }
            }
        }
    };

    $scope.handleKeyup = function (ev, challenge) {
        $scope.challengeHideFlag[challenge.id] = false;
        if ($scope.challengeHideFlag[challenge.id] == false) {
            var multiElemnt = angular.element(document.querySelector('#CVV'));
            multiElemnt.removeClass('custrederror');
        }
        if (timer) {
            $timeout.cancel(timer)
        }
        timer = $timeout(function () {
            $scope.challengeHideFlag[challenge.id] = true;
            if ($scope.challengeHideFlag[challenge.id] == true) {
                var multiElemnt = angular.element(document.querySelector('#CVV'));
                multiElemnt.addClass('custrederror');
            }

        }, 5000)
    };

    $scope.makeOptions = function (challenge, category) {
        if (category === "dd") {
            return $scope.days;
        } else if (category === "mm") {
            return $scope.bankdetail.monthArray;
        } else if (category === "yyyy" || category === "yy") {
            if (challenge.pattern.split('/').length === 3) {
                return $scope.DOBYears;
            } else {
                if (challenge.futureDate) {
                    return $scope.ExpYears;
                } else {
                    return $scope.ValidFromYears;
                }
            }
        }
    }

    $scope.onSelect = function (challenge) {
        $scope.$parent.dateValidationFlag[challenge.id] = false;
        $scope.dateValidationMsg[challenge.id] = $scope.bankdetail['dateValidationMsg'];
        var date = $scope.date[challenge.input]['dd'];
        var year = $scope.date[challenge.input]['yyyy'];
        var month = $scope.date[challenge.input]['mm'];
        var currentYear = new Date().getFullYear();
        var currentMonth = new Date().getMonth() + 1;
        var TodayDate = new Date().getDate();

        if (challenge.pattern.split('/').length === 3) { // Applicable to DOB
            if (!isNaN(date) && (month != 00) && !isNaN(year)) {
                if (year == currentYear && ((month > currentMonth) || (month == currentMonth && date > TodayDate))) {
                    $scope.$parent.dateValidationFlag[challenge.id] = true;
                }
            }
        } else if (challenge.pattern.split('/').length === 2) { // Applicable for Exp Date and Valid from
            if (month != 00 && !isNaN(year)) {
                if (challenge.futureDate && year == currentYear && month < currentMonth) {
                    $scope.$parent.dateValidationFlag[challenge.id] = true;
                } else if (!challenge.futureDate && year == currentYear && month > currentMonth) {
                    $scope.$parent.dateValidationFlag[challenge.id] = true;
                }
            }
        }
    }

    $scope.getHideFlag = function (challenge) {
        if ($scope.bankdetail !== undefined) {
			if(challenge.input === "CVV" || challenge.input === "SSN" || challenge.input === "POSTALCODE"){
				$scope.challengeMsg[challenge.id] =  $scope.bankdetail['challengePattern' +challenge.input+ 'ValidationMsg'].replace('{}',$scope.bankdetail[challenge.input]);
			}else{
				$scope.challengeMsg[challenge.id] =  $scope.bankdetail['challengePatternValidationMsg'].replace('{}',$scope.bankdetail[challenge.input]);
			}
            //$scope.challengeMsg[challenge.id] =  $scope.bankdetail['challengePatternValidationMsg'].replace('{}',$scope.bankdetail[challenge.input]);
        }
        var edValue = document.getElementById(challenge.input);
        if (challenge.pattern !== undefined || challenge.pattern !== "") {
            var patt = new RegExp(challenge.pattern.replace(/\//g, ''));
            if ((edValue !== null && edValue.value !== "") && !patt.test(edValue.value)) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    $scope.getShowFlag = function (challenge) {
        if ($scope.getHideFlag) {
            var edValue = document.getElementById(challenge.input);
            if (edValue !== null && edValue.value !== "" && challenge.length !== 0 && edValue.value.length !== challenge.length) {
                $scope.challengeLengthMsg[challenge.id] = $scope.bankdetail['challengeFieldLengthValidationMsg'].replace("{challengeInput}", $scope.bankdetail[challenge.input]).replace("{challengeLength}", challenge.length);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    $scope.getTooltipMsg = function (challenge) {
        var msg = "";
        if ($scope.bankdetail !== undefined) {
            msg = $scope.bankdetail['challenge' + challenge.input + 'FieldTooltipMsg'];
            if(msg != undefined){
                msg = msg.replace("{}", challenge.length); 
            }
        }
        return msg;
    }

});

BankApp.filter('yearfilter', function () {
    return function (input, category) {
        if (category == "yy" && !isNaN(input)) {
            return input.toString().slice(-2);
        } else {
            return input;
        }
    };
});