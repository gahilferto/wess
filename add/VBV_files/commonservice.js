	BankApp.factory('commonService', function ($rootScope) {
	    return {
	        getDeliveryReport: function (jsonobj, bankdetail) {
	            var channel = [];
	            var allChannel = "";
	            var emails = "";
	            if (jsonobj.channel === undefined) {
	                return bankdetail.subheader;
	            }
	            for (i = 0; jsonobj.channel.length > i; i++) {
	                if (jsonobj['channel'][i]['status'] === 'SENT') {
	                    channel.push(jsonobj['channel'][i]);
	                    allChannel = allChannel + jsonobj['channel'][i].masked_value + "<BR />";
	                }
	            }
	            if (channel.length > 1) {
	                return bankdetail.subheader.replace("{}", allChannel);
	            } else if (channel.length == '1') {
	                if (channel[0].type === 'MOBILE')
	                    return bankdetail.headermobile.replace("{}", allChannel);
	                else
	                    return bankdetail.headeremail.replace("{}", allChannel);
	            } else {
	                return '';
	            }
	        },
	        getDefaultValues: function (bankdetail, jsonobj) {
	            var bank = {};
	            bank.validationFailed = false;
	            bank.display = false;
	            bank.filogo = localeFolder + "images/" + filogo;
	            bank.brandlogo = localeFolder + "images/" + brandlogo;
	            bank.localeFolder = localeFolder;
	            bank.isFocused = true;
	            bank.disclaimer = false;
	            bank.title = bankdetail.badgeinfotext;
	            if (bankdetail.customTitle !== undefined) {
	                bank.title = bankdetail.customTitle;
	            }
	            bank.getdisablebuttontitle = angular.element(document.querySelector('#btnsubmit'));
	            bank.getdisablebuttontitle.attr('title1', bank.title);
	            bank.title2 = bankdetail['resendinfotext'];
	            bank.getdisableresendbuttontitle = angular.element(document.querySelector('#btnResendSubmit'));
	            bank.getdisableresendbuttontitle.attr('title1', bank.title2);
	            if (!jsonobj.transactionInfo.showdisclaimercheckbox || bankdetail.commondisclaimer === undefined || jsonobj.transactionInfo.islandingpage == false || (document.getElementById('iqaForm').name === 'passwdForm' && jsonobj.transactionInfo.showdisclaimer == false)) {
	                bank.disclaimer = true;
	                bank.title = bankdetail.badgeinfotext2;
	            }

	            var challengeDataType = "";
	            var challengeLength = "";
	            angular.forEach(jsonobj.challengeInfo, function (challenge, index) {
	                if (challenge.input === 'OTP_TYPE') {
	                    if (challenge.datatype === 'OTP_TYPE_NUMERIC') {
	                        bank.otpValidationMssg = bankdetail.numericOnly;
	                        challengeDataType = "numeric";
	                    } else if (challenge.datatype === 'OTP_TYPE_ALPHABET') {
	                        bank.otpValidationMssg = bankdetail.alphabetsOnly;
	                        challengeDataType = "alphabet";
	                    } else if (challenge.datatype === 'OTP_TYPE_ALPHANUMERIC') {
	                        bank.otpValidationMssg = bankdetail.alphaNemericOnly;
	                        challengeDataType = "alphaNumeric";
	                    }
	                    challengeLength = challenge.length;
	                    bank.otpLengthValidationMssg = bankdetail.otpLengthValidationMssg.replace("{}", challenge.length);
	                }
	            })
	            //bank.challengeFieldTooltipMsg = bankdetail.challengeFieldTooltipMsg.replace("{}", challengeDataType).replace("()", challengeLength);
	            bank.cancelcontent = bankdetail['cancelcontent'];
	            bank.btncancel = bankdetail['btncancel'];
	            bank.btnok = bankdetail['btnok'];
	            return bank;
	        },
	        getAlertMsg: function (bankdetail, jsonobj) {
	            var content = {};
	            if (bankdetail[jsonobj.messageKey+'_inline'] !== '') {
                    content.headderinfohead = bankdetail[jsonobj.messageKey+'_inline'];
	            }
	            return content;
	        },
	        getJSONProperty: function (bankdetail, messageKey) {
	            if (messageKey !== undefined && bankdetail[messageKey] !== '') {
	                return bankdetail[messageKey];
	            } else {
	                return "";
	            }
	        },
	        getCustomPath: function (bankdetail, key) {
	            var customPaths = {};
	            customPaths.disclaimerPath = 'disclaimer.html';
	            customPaths.challengePath = 'challenge.html';
	            customPaths.footerPath = 'footer.html';
	            customPaths.headerPath = 'header.html';
	            customPaths.localeswitchPath = 'localeswitch.html';
	            customPaths.multiselectchannelPath = 'multiselectchannel.html';
	            customPaths.automultiselectchannelPath = 'automultiselectchannel.html';
                customPaths.phoneHTMLpath = 'contactNumber.html';

	            if (bankdetail.disclaimerPath !== undefined) {
	                customPaths.disclaimerPath = bankdetail.disclaimerPath;
	            }
	            if (bankdetail.challengePath !== undefined) {
	                customPaths.challengePath = bankdetail.challengePath;
	            }
	            if (bankdetail.footerPath !== undefined) {
	                customPaths.footerPath = bankdetail.footerPath;
	            }
	            if (bankdetail.headerPath !== undefined) {
	                customPaths.headerPath = bankdetail.headerPath;
	            }
	            if (bankdetail.localeswitchPath !== undefined) {
	                customPaths.localeswitchPath = bankdetail.localeswitchPath;
	            }
	            if (bankdetail.multiselectchannelPath !== undefined) {
	                customPaths.multiselectchannelPath = bankdetail.multiselectchannelPath;
	            }
	            if (bankdetail.automultiselectchannelPath !== undefined) {
	                customPaths.automultiselectchannelPath = bankdetail.automultiselectchannelPath;
	            }
                if (bankdetail.phoneHTMLpath !== undefined) {
	                customPaths.phoneHTMLpath = bankdetail.phoneHTMLpath;
	            }

	            return customPaths;
	        },
	        getUploadcontent: function (jsonobj, locale, filogo, brandlogo) {
	            var uploadContent = {};
	            uploadContent.leftLogo = filogo;
	            uploadContent.rightLogo = brandlogo;
	            uploadContent.contactUs = "content/" + locale + "/ContactUs.html";
	            uploadContent.FAQ = "content/" + locale + "/FAQs.html";
	            uploadContent.TOC = "content/" + locale + "/help.html";
	            uploadContent.aboutUs = "content/" + locale + "/aboutUs.html";

	            if (jsonobj.uploadedContentInfo[locale][3] !== -1) {
	                uploadContent.contactUs = "/vpas/contentRenderer.action?contentId=" + jsonobj.uploadedContentInfo[locale][3];
	            }
	            if (jsonobj.uploadedContentInfo[locale][4] !== -1) {
	                uploadContent.FAQ = "/vpas/contentRenderer.action?contentId=" + jsonobj.uploadedContentInfo[locale][4];
	            }
	            if (jsonobj.uploadedContentInfo[locale][5] !== -1) {
	                uploadContent.TOC = "/vpas/contentRenderer.action?contentId=" + jsonobj.uploadedContentInfo[locale][5];
	            }
	            if (jsonobj.uploadedContentInfo[locale][6] !== -1) {
	                uploadContent.aboutUs = "/vpas/contentRenderer.action?contentId=" + jsonobj.uploadedContentInfo[locale][6];
	            }
	            if (jsonobj.uploadedContentInfo[locale][7] !== -1) {
	                uploadContent.leftLogo = "/vpas/contentRenderer.action?contentId=" + jsonobj.uploadedContentInfo[locale][7];
	            }
	            if (jsonobj.uploadedContentInfo[locale][8] !== -1) {
	                uploadContent.rightLogo = "/vpas/contentRenderer.action?contentId=" + jsonobj.uploadedContentInfo[locale][8];
	            }
	            return uploadContent;
	        },
            getFooterArray: function(bankdetail){
                var commonFooter = [];
                for (var key in bankdetail) {
	                if (key.indexOf('commonfooter.') >= 0) {
	                    if (bankdetail[key] == undefined || bankdetail[key] == "") {
	                        continue;
	                    }else{
                            commonFooter.push({                             
                                "ahref": key.split(".")[1],
                                "text": bankdetail[key]
                            }); 
                        }                        
	                }
	            }
                return commonFooter;
            }
	    }
	});