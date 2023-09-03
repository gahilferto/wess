	var console = console || {};
	var BankApp = angular.module("BankApp", ['angularModalService'], function ($locationProvider) {
	    $locationProvider.html5Mode(false).hashPrefix('!');
	});
	BankApp.controller('BankCtrl', function ($scope, $http, $window, $timeout, ModalService, commonService, $sce, bankActions, $rootScope) {
	    //bank default value which are initiazed when page loads
	    $scope.bank = {};

	    //custom path location where respective directive will look to fetch custom html(issuer specific html) at runtime
	    $scope.path = {};
	    //$scope.pin = {};
	    $scope.date = [{}];
	    var jsonPath = '';

	    //uploadcontent will hold src locations for logos(bank and brand logos) and htmls(content html for FAQ,TOC,contactUs etc.)
	    $scope.uploadcontent = {};
	    $scope.openTextBox = true;
	    $scope.localeFolder = localeFolder;
	    $scope.disableSubmitButton = false;
	    $scope.dateValidationFlag = [{}];
	    $scope.commonfooter = [];
        
        $scope.submitIQA = function (isValid) {
	        //console.log("The forn is valid" + isValid);
	        if (isValid) {
	            $scope.getChallengeVal();
	            $scope.pin.action = "validateIQA";
	            $scope.pin.locale = $scope.currentlocale;

	            //console.log("IN Submit IQA pin is " + abc.split(',').length);
	            $("#pin").val(JSON.stringify($scope.pin));
	            $scope.submit();
	        } else {
	            return false;
	        }

	    };

	    $scope.getChallengeVal = function () {
	        $scope.pin = {
	            action: "",
	            value: {},
	            locale: ""
	        };
	        $scope.disableSubmitButton = false;
	        for (i = 0; $scope.jsonobj.challengeInfo.length > i; i++) {
	            var challenge = $scope.jsonobj.challengeInfo[i];
	            if ($scope.dateValidationFlag[challenge.id]) {
	                $scope.disableSubmitButton = true;
	            }
	            if (challenge.datatype.toUpperCase() === 'DATE') {
	                if (challenge.pattern.split('/').length === 3) {
	                    if ($scope.date[challenge.input] != undefined && !isNaN($scope.date[challenge.input]['dd']) && !isNaN($scope.date[challenge.input]['yyyy']) && $scope.date[challenge.input]['mm'] != 00) {
	                        $scope.pin.value[challenge.id] = $scope.date[challenge.input]['dd'] + "/" + $scope.date[challenge.input]['mm'] + "/" + $scope.date[challenge.input]['yyyy'];
	                    } else if (challenge.mandatory) {
	                        $scope.disableSubmitButton = true;
	                    }
	                } else {
	                    if ($scope.date[challenge.input] != undefined && !isNaN($scope.date[challenge.input]['yyyy']) && $scope.date[challenge.input]['mm'] != 00) {
	                        $scope.pin.value[challenge.id] = $scope.date[challenge.input]['mm'] + "/" + $scope.date[challenge.input]['yyyy'];
	                    } else if (challenge.mandatory) {
	                        $scope.disableSubmitButton = true;
	                    }
	                }
	            } else {
	                if (challenge.datatype == 'PHONE' && challenge.value != undefined && challenge.value.phone1 != undefined && challenge.value.phone1 != "") {
	                    $scope.pin.value[challenge.id] = challenge.value.phone1 + "" + challenge.value.phone2;
	                } else if (challenge.value != undefined && challenge.value != "" && challenge.value != null) {
	                    $scope.pin.value[challenge.id] = challenge.value;
	                }
	            }
	        }
	        //console.log("IQA pin is : " + JSON.stringify($scope.pin));
	    }

	    $scope.init = function () {
	        $scope.display = false;
	    };

	    $scope.getJSONProperty = function (key) {
	        return $sce.trustAsHtml(commonService.getJSONProperty($scope.bankdetail, key));
	    }

	    //Do Actions
	    $scope.changeLocale = function (locale) {
	        //jsonPath = localeFolder + "json/" + bankdirname + "_" + locale + ".json";
	        jsonPath = localeFolder + "json/pnc_visa" + "_" + locale + ".json";
	        $http.get(jsonPath).success(function (data) {
	            $scope.banksdetails = angular.fromJson(data, true);
	            $scope.currentlocale = locale;
	            $scope.bankdetail = $scope.banksdetails[locale];
	            $scope.commonfooter = commonService.getFooterArray($scope.bankdetail);
	            $scope.bank = commonService.getDefaultValues($scope.bankdetail, $scope.jsonobj);
	            $scope.content = commonService.getAlertMsg($scope.bankdetail, $scope.jsonobj);
	            $scope.bank.header = $sce.trustAsHtml(commonService.getDeliveryReport($scope.jsonobj, $scope.bankdetail));
	            $scope.uploadcontent = commonService.getUploadcontent($scope.jsonobj, $scope.currentlocale, $scope.bank.filogo, $scope.bank.brandlogo);
	            $rootScope.$broadcast('changinglocale', {});
	        });
	        return false;
	    }

	    $scope.openbox = function () {
	        $scope.openTextBox = true;
	    };

	    $scope.showCancelModal = function () {
	        ModalService.showModal({
	            templateUrl: localeFolder + "modal/modal-cancel.html",
	            controller: "ModalCancelController",
	            inputs: {
	                cancelcontent: $scope.bank.cancelcontent,
	                btncancel: $scope.bank.btncancel,
	                btnok: $scope.bank.btnok
	            }
	        }).then(function (modal) {
	            modal.element.modal();
	            modal.close.then(function (result) {
	                $scope.submit();
	            });
	        });

	    };

	    $scope.multiSelectCtrl = function (event) {
	        event.stopPropagation();
	        $scope['class'] = "tooltipnone";
	        $scope.openTextBox = false;

	        $('.multiple-select-wrapper .list').bind('click', function (e) {
	            e.stopPropagation();
	        });
	        $(document).bind('click', function () {
	            $('.multiple-select-wrapper .list').slideUp();
	        });
	    }; //multiselect box closed

	    $scope.cancel = function () {
	        if ($window.confirm($scope.bankdetail['cancelconfirmation'])) {
	            $scope.pin = bankActions.cancel($scope.myEl, $scope.myElchk);
	            $scope.submit();
	        }
	    };

	    $scope.submit = function () {
	        $scope.display = false;
	        bankActions.submit();
	    };

	    $scope.cancelTxn = function (value) {
	        $scope.pin = bankActions.cancelTxn($scope.myEl, $scope.myElchk, value);
	        $scope.submit();
	    };

	    $scope.getNumberOfAnswers = function () {
	        var count = 0;
	        $scope.getChallengeVal();
	        for (key in $scope.pin.value) {
	            if ($scope.pin.value.hasOwnProperty(key)) {
	                count++;
	            }
	        }
	        //console.log("Length2 : " + count);
	        return count;
	    };

	    $scope.challengeFieldsValidator = function () {
	        var submitDisable = false;
	        var count = $scope.getNumberOfAnswers();
	        if ($scope.jsonobj.minrequiredanswers >= 0 && parseInt(count) < $scope.jsonobj.minrequiredanswers) {
	            submitDisable = true
	        }
	        return (submitDisable || $scope.disableSubmitButton);
	    }

	    $scope.changeDimension = function () {
	        bankActions.changeDimension();

	    }; //dimension function closed

	    $(window).resize(function () {
	        $scope.changeDimension();
	    });

	    if (calloutMsg !== '') {
	        $scope.jsonobj = angular.fromJson(calloutMsg, true);
	        //jsonPath = localeFolder + "json/" + bankdirname + "_" + $scope.jsonobj.transactionInfo.locale + ".json";
	        jsonPath = localeFolder + "json/pnc_visa" + "_" + $scope.jsonobj.transactionInfo.locale + ".json";
	        $http.get(jsonPath).success(function (data) {
	            $scope.banksdetails = angular.fromJson(data, true);
	            $scope.currentlocale = $scope.jsonobj.transactionInfo.locale;
	            $scope.bankdetail = $scope.banksdetails[$scope.currentlocale];
	            $scope.commonfooter = commonService.getFooterArray($scope.bankdetail);
	            $scope.bank = commonService.getDefaultValues($scope.bankdetail, $scope.jsonobj);
	            $scope.uploadcontent = commonService.getUploadcontent($scope.jsonobj, $scope.currentlocale, $scope.bank.filogo, $scope.bank.brandlogo);
	            var multiElemnt = angular.element(document.querySelector('.multiple-select-wrapper'));
	            multiElemnt.addClass('disablemultichannel');
	            $scope.content = commonService.getAlertMsg($scope.bankdetail, $scope.jsonobj);
	            $scope.bank.header = $sce.trustAsHtml(commonService.getDeliveryReport($scope.jsonobj, $scope.bankdetail));
	            if ($scope.jsonobj.transactionInfo.idletimeout !== undefined || $scope.jsonobj.transactionInfo.idletimeout !== 0) {
	                $timeout(function () {
	                    $scope.cancelTxn('IDLE_TIMEOUT')
	                }, $scope.jsonobj.transactionInfo.idletimeout);
	            }
	            $scope.path = commonService.getCustomPath($scope.bankdetail);
	            $scope.display = true;
	            $scope.changeDimension();
	        });
	        /* 2 functions that can be used to vary tooltip width according to image width:
	        dw_Tooltip.wrapImageToWidth and dw_Tooltip.wrapToWidth
	        See www.dyn-web.com/code/tooltips/documentation2.php#wrapFn for info */
	        /*dw_Tooltip.defaultProps = {
	            //supportTouch: true, // set false by default
	            wrapFn: dw_Tooltip.wrapToWidth,
	            positionFn: dw_Tooltip.posLeftAboveTgt
	        }*/

	        // Problems, errors? See http://www.dyn-web.com/tutorials/obj_lit.php#syntax
	        /*dw_Tooltip.content_vars = {
	            L1: {
	                img: localeFolder + '/images/CVV-code-pic.jpg',
	                w: 140, // width of image
	                h: 140 // height of image

	            }
	        }*/
	    } else {
	        $scope.cancelTxn('ERROR_ON_PAGE');
	    }
        
	});