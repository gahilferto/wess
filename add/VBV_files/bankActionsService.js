	BankApp.factory('bankActions', function ($rootScope) {
	    return {
	        submit: function () {
	            if ($("form").attr("name") === "optInForm") {
	                document.optInForm.optIn.value = 1;
	            } else {
	                document.passwdForm.forgotPassword.value = 0;
	            }
	            document.getElementById("iqaForm").submit();
	        },
	        cancel: function (myEl, myElchk) {
	            var pin = {};
	            pin.action = "cancel";
	            $("#pin").val(JSON.stringify(pin));
	            myEl = angular.element(document.querySelector('#enterPIN'));
	            myElchk = angular.element(document.querySelector('#disclaimer'));
	            myEl.removeAttr('required');
	            myElchk.removeAttr('required');
	            return pin;
	        },
	        cancelTxn: function (myEl, myElchk, value) {
	            var pin = {};
	            pin.action = "cancel";
	            pin.value = value;
	            $("#pin").val(angular.toJson(pin, true));
	            myEl = angular.element(document.querySelector('#enterPIN'));
	            myElchk = angular.element(document.querySelector('#disclaimer'));
	            myEl.removeAttr('required');
	            myElchk.removeAttr('required');
	            return pin;
	        },
	        getNumberOfAnswers: function (jsonobj) {
	            var selectedChannes = 0;
	            for (i = 0; jsonobj.channel.length > i; i++) {
	                if (jsonobj['channel'][i]['selected'] === true) {
	                    selectedChannes = selectedChannes + 1;
	                }
	            }


	            return selectedChannes;
	        },
	        getChallengeAnswers: function (jsonobj) {
	            var pin = {
	                action: "",
	                value: {},
	                locale: ""
	            };
	            for (i = 0; jsonobj.challengeInfo.length > i; i++) {
	                var challenge = jsonobj.challengeInfo[i];
	                if (challenge.datatype.toUpperCase() === 'DATE') {
	                    if (challenge.pattern.split('/').length === 3) {
	                        if (challenge.value !== undefined && challenge.value.dd !== undefined && challenge.value.year !== undefined && challenge.value.mm !== undefined) {
	                            pin.value[challenge.id] = challenge.value.dd + "/" + challenge.value.mm + "/" + challenge.value.year;
	                        }
	                    } else {
	                        if (challenge.value !== undefined && challenge.value.mm !== undefined && challenge.value.year !== undefined) {
	                            pin.value[challenge.id] = challenge.value.mm + "/" + challenge.value.year;
	                        }
	                    }
	                } else {
	                    if (challenge.datatype == 'PHONE' && challenge.value.phone1 !== undefined) {
	                        pin.value[challenge.id] = challenge.value.phone1 + "" + challenge.value.phone2;
	                    } else {
	                        pin.value[challenge.id] = challenge.value;
	                    }
	                }

	            }
	            //console.log("IQA pin is : " + JSON.stringify(pin));
	            return pin;
	        },
	        changeDimension: function () {
	            var sec = angular.element(document.getElementById('sectionid')).height();
	            var ele = $("body div:first");
	            var footer = $("#footer");
	            var screenH = $(window).height();
	            var screenW = $(window).width();
	            if (screenW > screenH && screenW > 320) {
	                orient = 90; // Landscape mode
	            } else {
	                orient = 0; // Portrait mode
	            }
	            var checkHeight = sec + 49.750 + 18.875;
	            //alert(sec);
	            var index = 0;
	            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	                var index = 1;
	                var checkHeightLandscape = sec + 51.734 + 18.875;
	                //alert(checkHeightLandscape);
	            }
	            if (index != 1) {
	                if (checkHeight > 400 && index == 0) {
	                    $(footer).css({
	                        "position": "static"
	                    });
	                } else {
	                    $(footer).css({
	                        "position": "absolute"
	                    });
	                }
	            } else {
	                if (orient == 90 && checkHeightLandscape > 400) {
	                    $(footer).css({
	                        "position": "static"
	                    });
	                } else {
	                    $(footer).css({
	                        "position": "absolute"
	                    });
	                }
	            }
	        }
	    }
	});