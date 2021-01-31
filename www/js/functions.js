/**
 * Created by flannagan on 19/1/2017.
 */
function checnum(as) {
    var a = as.value;
    for (var x = 0; x < a.length; x++) {
        var ff = a[x];
        if (isNaN(a) || ff == " ") {
            a = a.substring(0, (a.length - 1));
            as.value = a;
        }
    }
}

function getCheckedValue(groupName) {
    var radios = document.getElementsByName(groupName);
    for (i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return null;
}

function openLink(link) {


    var ref = window.open('' + link + '', '_blank', 'location=yes');
    ref.addEventListener('loadstart', function() {});

}


function SRV_URL() {


    //return "http://apps.cellinsurance.co.zw/Selfcare/Services/RestServiceImpl.svc" ;
    //return "http://10.0.18.29/InsuranceCustomerPortal/Services/RestServiceImpl.svc";
    // return "http://172.20.10.6/InsuranceCustomerPortal/Services/RestServiceImpl.svc";


}



function toggleUserDisplay() {


    console.log('Logout btn display..');
    if (IS_LOGGED_IN()) {

        document.getElementById('btn-panel-login').style.display = "";
        $("#btn-panel-login").show();


    } else {

        document.getElementById('btn-panel-login').style.display = "none";
        $("#btn-panel-login").hide();

    }


}




function IS_LOGGED_IN() {

    //var clt_no = 5896;
    var clt_no = CLT_NO();

    // alert(clt_no);

    if (clt_no) {

        if (clt_no.length > 8) {

            //alert("false");
            return true;
        }


    }


    return false;


}

function CLT_NO() {

    return localStorage.getItem('user_token');

}


function testAlert() {

    app.dialog.alert("Test");

}

function testNotification() {


    app.notification.create({
        title: 'OldMutual Insurance',
        message: 'My Notification'
    });

}

function logoutAccount() {

    localStorage.setItem('clt_no', '');
    localStorage.setItem('user_token', '');
    localStorage.setItem('user_full_name', '');
    localStorage.setItem('user_email', '');
    localStorage.setItem('user_mobile', '');

    // var panel = app.panel.get('.panel-left');

    // panel.close();


    var toast = app.toast.create({
        text: 'You are now logged out',
        closeTimeout: 2000,
    });

    toast.open();

    // toggleUserDisplay();

    goToHome();

    toggleUserDisplay();

}

// function loginAccount() {


//     console.log('Loggin in online');
//     app.preloader.show();

//     var username = $("#username").val();
//     var password = $("#password").val();



//     if (!username) {
//         app.dialog.alert("Enter username!", "Required!");
//         app.preloader.hide();
//         return;
//     }


//     if (!password) {
//         app.dialog.alert("Enter password!", "Required!");
//         app.preloader.hide();
//         return;
//     }


//     $.getJSON(SRV_URL() + "/login/OMICO/" + username + "/" + password + "/1", {},

//         function(data) {


//             var result = data.LoginUserResult;

//             console.log('' + JSON.stringify(data));

//             if (parseFloat(result.RegistrationStatus) > 0) {


//                 //$('#client_name span').html(result.Name);
//                 localStorage.setItem('user_token', result.AuthToken);
//                 // localStorage.setItem('user_full_name', result.UserFirstName + ' ' + result.UserSurname);
//                 // localStorage.setItem('user_email', result.EmailAddress);
//                 localStorage.setItem('user_mobile', username);


//                 app.router.navigate('/my_portfolio/', { transition: 'f7-cover', reloadCurrent: true })

//                 app.preloader.hide();

//                 app.loginScreen.close();

//             } else {

//                 app.preloader.hide();
//                 localStorage.setItem('user_token', '');
//                 alert('Login Failed - ' + result.ReponseMessage);

//                 // app.dialog.alert('Login failed' + result.ReponseMessage, 'Error');


//             }

//             app.preloader.hide();

//         }).fail(function(jqxhr) {

//         app.preloader.hide();
//         //   app.dialog.alert("Request Failed..please check connection!", "Error");
//         app.dialog.confirm('Request failed..Try Again?', 'Error',
//             function() {
//                 loginAccount();
//             },
//             function() {
//                 //goToHome();
//             }
//         );

//     });


// }

function registerAccount() {



    app.preloader.show();

    var username = $("#regis_mobile_number").val();
    var password = $$("#reg_password").val();
    var confirm_password = $$("#reg_confirm_password").val();


    if (!username) {

        app.dialog.alert("Enter Mobile Number", "Invalid");
        app.preloader.hide();
        return;

    }

    if (!password) {

        app.dialog.alert("Enter password", "Invalid");
        app.preloader.hide();
        return;

    }



    if (password !== confirm_password) {

        app.dialog.alert("Passwords must match!", "Invalid");
        app.preloader.hide();
        return;

    }

    console.log(SRV_URL() + "/register/OMICO/" + username + "/" + password + "/1");

    $.getJSON(SRV_URL() + "/register/OMICO/" + username + "/" + password + "/1", {},

        function(data) {

            console.log("resp " + data);

            var result = data.RegisterUserResult;


            if (parseFloat(result.RegistrationStatus) > 0) {


                localStorage.setItem('user_mobile', username);



                goToVerify();

                app.preloader.hide();

                app.notification.create({
                    title: 'Success',
                    message: 'Registration submitted. Please Enter verification code sent via SMS.',
                    closeTimeout: 3000,
                });

                localStorage.setItem('reg_username', username);


            } else {

                // localStorage.setItem('clt_no',0);
                app.dialog.alert('Registration Failed -  Could not create account' + result.ReponseMessage, 'Registration Error');

                // app.dialog.alert('Login failed' + result.ReponseMessage, 'Error');
                app.preloader.hide();

            }

            app.preloader.hide();

        }).fail(function(jqxhr) {

        app.preloader.hide();

        console.log("reg fail " + JSON.stringify(jqxhr));
        //   app.dialog.alert("Request Failed..please check connection!", "Error");
        app.dialog.confirm('Request failed..Try Again?', 'Error',
            function() {
                registerAccount();
            },
            function() {
                //goToHome();
            }
        );

    });


}


function loadPortfolioDetails() {

    getClientDetails();
    // $('#profile_userfullname').html(localStorage.getItem('user_full_name'));
    // $('#profile_useremail').html(localStorage.getItem('user_email'));
    // $('#profile_usermobile').html(localStorage.getItem('user_mobile'));


}

function verifyAccount() {



    app.preloader.show();

    var username = localStorage.getItem('user_mobile');
    var otp = $("#verify_pin").val();

    // if (!username) {

    //     app.dialog.alert("Enter username");
    //     app.preloader.hide();
    //     return;

    // }

    if (!otp) {

        app.dialog.alert("Enter PIN");
        app.preloader.hide();
        return;

    }

    $.getJSON(SRV_URL() + "/verifyuser/OMICO/" + username + "/" + otp + "/1", {},

        function(data) {


            var result = data.VerifyUserResult;


            if (parseFloat(result.VerificationStatus) > 0) {

                //$('#client_name span').html(result.Name);
                // localStorage.setItem('clt_no',result.UserID);
                app.notification.create({
                    title: 'Verification',
                    message: 'Mobile number verified. Please proceed to login.'
                });

                goToLogin();
                app.preloader.hide();

            } else {

                //localStorage.setItem('clt_no',0);
                app.dialog.alert('Login Verification Failed');

                // app.dialog.alert('Login failed' + result.ReponseMessage, 'Error');
                app.preloader.hide();

            }

            app.preloader.hide();

        }).fail(function(jqxhr) {

        app.preloader.hide();
        //   app.dialog.alert("Request Failed..please check connection!", "Error");

        app.dialog.confirm('Request failed..Try Again?', 'Error',
            function() {
                verifyAccount();
            },
            function() {
                //goToHome();
            }
        );

    });


}


function goToAccount() {

    app.router.navigate('/my_portfolio/', { transition: 'f7-cover' })

}



function goToVerify() {

    app.router.navigate('/verification/', { transition: 'f7-cover' })

}

function goToHome() {

    app.router.navigate('/', { transition: 'f7-cover' })

}

function openRoutePage(the_page) {

    app.router.navigate(the_page, { transition: 'f7-cover' })

}


function openExchangeRateStats(CURRENCY_CODE, DATA) {

    localStorage.setItem("CURRENCY_CODE", CURRENCY_CODE);
    app.router.navigate('/exchange_rate_stats/', { transition: 'f7-cover' })

}

function openPolicyRisks(POLICY_NUMBER) {

    localStorage.setItem("RISK_POLICY_NUMBER", POLICY_NUMBER);
    app.router.navigate('/my_profile_all_policy_risks/', { transition: 'f7-cover' })

}



function goBack() {

    app.router.back();

}

function goToDirectionsPage(targetLat, targetLon, targetLocationName) {

    localStorage.setItem('targetLat', targetLat);
    localStorage.setItem('targetLon', targetLon);
    localStorage.setItem('targetLocationName', targetLocationName);

    app.router.navigate('/directions/', { transition: 'f7-cover' });

}

function goToLogin() {

    console.log('Checking Loggin');
    if (IS_LOGGED_IN()) {
        goToAccount();
    } else {

        // var mainView = app.router;
        // app.routes.loadPage('login/');
        app.router.navigate('/login/', { transition: 'f7-cover' })
    }

}


function getClientDetails() {

    //app.preloader.show();

    var clt_no = CLT_NO();


    var stored_name = localStorage.getItem(clt_no + '_name');
    var stored_address = localStorage.getItem(clt_no + '_address');
    var stored_claims = localStorage.getItem(clt_no + '_claims');
    var stored_policies = localStorage.getItem(clt_no + '_policies');


    // if (stored_name) {
    //     $('#client_name span').html(stored_name);
    // }

    // if (stored_address) {
    //     $('#client_address span').html(stored_address);
    // }

    // if (stored_claims) {
    //     $('#policies_count strong').html(stored_claims);
    // }

    // if (stored_policies) {
    //     $('#claims_count strong').html(stored_policies);
    // }


    $.getJSON(SRV_URL() + "/thirdpartyclient/OMICO/" + localStorage.getItem('user_mobile'), {},

        function(data) {


            var result = data.GetThirdPartyClientResult;


            console.log(data);

            //app.dialog.alert(result.ResponseStatus);

            if (result.ResponseStatus > 0) {



                $('#profile_userfullname').html(result.FullName + ' <span id="profile_status" class="status-online bg-color-success"></span>').show("slideIn");
                $('#profile_usermobile').html(result.MobileNumber);
                $('#profile_useremail').html(result.EmailAddress);
                $('#profile_useraddress').html(result.ResidentialAddress);
                $('#profile_policies_count').html('(' + result.NumberOfPolicies + ')');
                $('#profile_claims_count').html('(' + result.NumberOfClaims + ')');

                // $('#policies_count strong').html(result.NumberOfPolicies);
                // $('#claims_count strong').html(result.NumberOfClaims);
                // $('#messages_count strong').html(result.NumberOfMessages);
                // $('#client_national_id').val(result.NationalID);
                // $('#client_dob').val(result.DateOfBirth);
                // $('#client_email').val(result.EmailAddress);

                // localStorage.setItem(clt_no + '_name', result.Name);
                // localStorage.setItem(clt_no + '_address', result.Address);
                // localStorage.setItem(clt_no + '_claims', result.NumberOfClaims);
                // localStorage.setItem(clt_no + '_policies', result.NumberOfPolicies);


                var claims = result.Claims;
                var policies = result.Policies;


                localStorage.setItem('all_user_claims', JSON.stringify(claims));
                localStorage.setItem('all_user_policies', JSON.stringify(policies));


                var CLAIMS_DISPLAY_COUNT = 0;
                var POLICIES_DISPLAY_COUNT = 0;

                $("#portfolio_claims_list").empty();
                $.each(claims, function(i, field) {


                    var output = '';

                    var status = 'F';

                    var status_label = '';

                    if (field.ClaimStatus == 'F') {
                        status = 'success';
                        status_label = 'FINALISED'
                    }

                    if (field.ClaimStatus == 'O') {
                        status = 'danger';
                        status_label = 'OPEN'
                    }


                    if (field.ClaimStatus == 'R') {
                        status = 'warning';
                        status_label = 'REOPENED'
                    }

                    output += '<li>';
                    output += '<a href="#" class="item-content popup-open" data-popup=".claim-popup" onclick="displayClaimDetails(\'' + field.ClaimNumber + '\',\'' + field.ClaimDescription + '\',\'' + field.DateOfLoss + '\',\'' + field.ProductType + '\',\'' + status_label + '\');">';
                    output += '    <div class="item-inner">';
                    output += '       <h4 class="item-title"><span class="claims_claim_description">' + field.ClaimDescription + '</span></h4>';
                    output += '        <div class="item-subtitle mb-1"><span class="cliams_claim_number">' + field.ClaimNumber + '</span></div>';
                    output += '        <h2 class="title-number-carousel color-primary " style="display:none;"><span class="claims_claim_value">$' + field.ClaimValue + '</span><small> Value</small></h2>';
                    output += '    </div>';
                    output += '    <div class="item-media chart-container claims_claim_status">';
                    output += '        <small class="color-' + status + ' ">';
                    output += '                        <span >' + status_label + '</span> <span class="status-online bg-color-' + status + '"></span>';
                    output += '                    </small>';
                    output += '                        </div>';
                    output += '</a>';
                    output += ' </li>';


                    if (CLAIMS_DISPLAY_COUNT < 2) {


                        $("#portfolio_claims_list").append(output);

                    }

                    CLAIMS_DISPLAY_COUNT++;



                });

                $("#portfolio_policies_list").empty();
                $.each(policies, function(i, field) {

                    var output = '';

                    var status = 'F';

                    var status_label = '';

                    if (field.PolicyStatus == 'A') {
                        status = 'success';
                        status_label = 'ACTIVE'
                    }

                    if (field.PolicyStatus == 'C') {
                        status = 'danger';
                        status_label = 'LAPSED'
                    }

                    if (field.PolicyStatus == 'X') {
                        status = 'warning';
                        status_label = 'REVIEW'
                    }

                    if (field.PolicyStatus == 'D') {
                        status = 'warning';
                        status_label = 'REVIEW'
                    }

                    if (field.PolicyStatus == 'R') {
                        status = 'warning';
                        status_label = 'REVIEW'
                    }


                    output += `<li>
                                    <a href="javascript:;" onclick="openPolicyRisks('` + field.PolicyNumber + `')" class="item-content" >
                                        <div class="item-inner">
                                            <h4 class="item-title">` + field.ProductDescription + `</h4>
                                            <div class="item-subtitle mb-1">` + field.PolicyNumber + `</div>
                                            <h2 class="title-number-carousel color-primary"><small>` + field.StartDate + ` - ` + field.EndDate + `</small></h2>
                                        </div>
                                        <div class="item-media chart-container">
                                            <small class="color-danger">
                                                            ` + status_label + `  <span class="status-online bg-color-` + status + `"></span>
                                                        </small>
                                            <div class="dynamicsparkline"></div>
                                        </div>
                                    </a>
                                </li>`;


                    if (POLICIES_DISPLAY_COUNT < 2) {


                        $("#portfolio_policies_list").append(output);

                    }

                    POLICIES_DISPLAY_COUNT++;

                    var toastCenter = app.toast.create({
                        text: 'Click on a Policy or Claim to view details',
                        closeTimeout: 2000
                    });

                    toastCenter.open();


                });







            } else {

                $('#profile_userfullname').html('Not Found <span id="profile_status" class="status-online bg-color-danger"></span>');
                $('#profile_usermobile').html(result.MobileNumber);
                $('#profile_useremail').html('');
                $('#profile_useraddress').html('');

                app.preloader.hide();
                app.dialog.alert('Record for ' + localStorage.getItem('user_mobile') + ' Not found. ', 'Not found');

            }

            app.preloader.hide();

        }).fail(function(jqxhr) {

        app.preloader.hide();

        console.log("reg fail " + JSON.stringify(jqxhr));


        var toastWithButton = app.toast.create({
            text: '<i class="icon material-icons">error_outline</i> Request failed..Try Again?',
            closeButton: true,
        });

        toastWithButton.open();


        // app.dialog.alert("Request Failed..please check connection!", "Error");

    });


}

function displayClaimDetails(ClaimNumber, ClaimDescription, DateOfLoss, ProductType, STATUS) {


    $('#claim_display_claimnumber').html(ClaimNumber);
    $('#claim_display_loss_description').html(ClaimDescription);
    $('#claim_display_loss_date').html(DateOfLoss);
    $('#claim_display_product').html(ProductType);
    $('#claim_display_status').html(STATUS);

    //field.ClaimDescription + '\',\'' + field.DateOfLoss + '\',\'' + field.ProductType + '\',,\'' + status + '\'
    // console.log('displayClaimDetails ..' + ClaimNumber);

}

function getClientPolicies() {


    var policies = localStorage.getItem('all_user_policies');

    $("#portfolio_policies_list_all").empty();

    $.each(JSON.parse(policies), function(i, field) {

        var output = '';

        var status = 'F';

        var status_label = '';

        if (field.PolicyStatus == 'A') {
            status = 'success';
            status_label = 'ACTIVE'
        }

        if (field.PolicyStatus == 'C') {
            status = 'danger';
            status_label = 'LAPSED'
        }

        if (field.PolicyStatus == 'X') {
            status = 'warning';
            status_label = 'REVIEW'
        }

        if (field.PolicyStatus == 'D') {
            status = 'warning';
            status_label = 'REVIEW'
        }

        if (field.PolicyStatus == 'R') {
            status = 'warning';
            status_label = 'REVIEW'
        }
        output += `<li>
                            <a href="javascript:;" onclick="openPolicyRisks('` + field.PolicyNumber + `')" class="item-content" >
                            <div class="item-inner">
                                <h4 class="item-title">` + field.ProductDescription + `</h4>
                                <div class="item-subtitle mb-1">` + field.PolicyNumber + `</div>
                                <h2 class="title-number-carousel color-primary"><small>` + field.StartDate + ` - ` + field.EndDate + `</small></h2>
                            </div>
                            <div class="item-media chart-container">
                                <small class="color-danger">
                                                ` + status_label + `  <span class="status-online bg-color-` + status + `"></span>
                                            </small>
                                <div class="dynamicsparkline"></div>
                            </div>
                        </a>
                    </li>`;



        $("#portfolio_policies_list_all").append(output);



        var toastCenter = app.toast.create({
            text: 'Click on a policy to view risk details',
            closeTimeout: 2000
        });

        toastCenter.open();


    });



}


function motorQouteAddVehicle() {

    // event.preventDefault();
    // event.stopPropagation();


    var make = $('#motor_qoute_vehicle_make').val();
    var model = $('#motor_qoute_vehicle_model').val();
    var sum_assured = $('#motor_quote_vehicle_sum_assured').val();
    var reg_number = $('#motor_qoute_vehicle_reg').val();
    var cover_type = $('#motor_quote_cover_type').val();
    var car_source = $('#quote_vehicle_source').val();

    var PremiumCalculated = calculateMotorPremium(car_source, sum_assured);

    var list_index = $('#quote_motor_vehicles ul li').length + 1

    var output = `<li>
    <div class="item-content" id="quote_vehicle_item_` + list_index + `">

        <div class="item-inner no-arrow">
                <div class="item-title">
                    <div class="item-header">` + make + ` ` + model + `</div>
                    ` + reg_number + `
                    <div class="text-muted">` + cover_type + `</div>
                    <div><span class="badge quote_badge">$<span class="quote_vehicle_premium">` + parseFloat(PremiumCalculated).toFixed(2) + `</span></span> - Cover ` + parseFloat(sum_assured).toFixed(2) + `</div>
                </div>
            </div>
            <div class="item-media">
                <a href="#" onclick="quoteRemoveVehicle('quote_vehicle_item_` + list_index + `');"><i class="icon material-icons md-only color-danger">delete_outline</i></a>
            </div>
        </div>
    </li>`;



    $("#quote_motor_vehicles").append(output);



    var toastCenter = app.toast.create({
        text: 'Vehicle Added',
        closeTimeout: 1500
    });

    toastCenter.open();

    calculateMotorQuoteTotal();

}

function calculateMotorPremium(CAR_SOURCE, SUM_INSURED) {

    var TRUE_PREMIUM = 0.0;
    var TOTAL_PREMIUM = 0.0;



    if (CAR_SOURCE == "EXJAP") {
        TRUE_PREMIUM = (parseFloat(SUM_INSURED) * 0.08);
    }

    if (CAR_SOURCE == "Other") {
        TRUE_PREMIUM = (parseFloat(SUM_INSURED) * 0.05);
    }

    var LEVY = 54; //TODO: GET FROM FIREBASE OR SERVER
    var STAMP_DUTY_RATE = 0.05;

    var stamp_duty = parseFloat(TRUE_PREMIUM) * STAMP_DUTY_RATE;

    if (stamp_duty > 2 && stamp_duty < 200000) {
        TOTAL_PREMIUM = parseFloat(TRUE_PREMIUM) + LEVY + stamp_duty;
    }

    if (TOTAL_PREMIUM) {
        $('#motor_quote_annual_premium').val(TOTAL_PREMIUM.toFixed(2));
        $('#motor_quote_bi_annual_premium').val((TOTAL_PREMIUM / 2).toFixed(2));
        $('motor_quote_quaterly_premium').val((TOTAL_PREMIUM / 3).toFixed(2));
    } else {
        // alert("Please enter valid Sum Insured");
    }


    return TOTAL_PREMIUM;


}


function calculateMotorQuoteTotal() {


    var list_count = 0;

    var TOTAL_PREMIUM = 0.0;


    $('#quote_motor_vehicles li').each(function(index, xxx) {


        var list_premium = $(xxx).find('.quote_vehicle_premium').html();

        console.log('index ' + index + '  ');

        if (list_premium) {
            console.log('list_premium ' + list_premium);
            TOTAL_PREMIUM += parseFloat(list_premium);
        }


        $('#motor_quote_display_premium').html(TOTAL_PREMIUM.toFixed(2));

        list_count += 1;

    });

    $('#motor_quote_display_vehicles_count').html(list_count);
    console.log(TOTAL_PREMIUM);



}


function quoteRemoveVehicle(the_list_item) {

    $("#quote_motor_vehicles").find('#' + the_list_item + '').remove();

    calculateMotorQuoteTotal();

}

function quoteRemoveBuilding(the_list_item) {

    $("#quote_home_buildings").find('#' + the_list_item + '').remove();

    calculateHomeQuoteTotal();

}



function homeQouteAddBuilding() {

    var building_type = $('#home_quote_thatch_id').val();
    // var building_type = 'thatched';
    // var type = 'building';
    var type = $('#home_quote_type').val();
    var home_quote_address = $('#home_quote_address').val();
    var home_quote_sum_insured = $('#home_quote_sum_insured').val();

    var list_index = $('#quote_home_buildings ul li').length + 1;

    var PremiumCalculated = calculateBuilingPremium(building_type, home_quote_sum_insured,type);

    var output = `<li id="quote_building_item_` + list_index + `" >
    <div class="item-content">

        <div class="item-inner no-arrow">
            <div class="item-title">
                <div class="item-header">` + home_quote_address + `</div>

                    <div><span class="badge quote_badge">$<span class="quote_home_premium">` + parseFloat(PremiumCalculated).toFixed(2) + `</span></span> - Value ` + parseFloat(home_quote_sum_insured).toFixed(2) + `</div>
                    
                    <div><span class="badge quote_badge">$<span class="quote_home_premium">` + parseFloat(PremiumCalculated).toFixed(2) + `</span></span> - Value ` + parseFloat(home_quote_sum_insured).toFixed(2) + `</div>
                    </div>
                </div>
                <div class="item-media">
                    <a href="#" onclick="quoteRemoveBuilding('quote_building_item_` + list_index + `');"><i class="icon material-icons md-only color-danger">delete_outline</i></a>
                </div>
            </div>
        </li>`;



    $("#quote_home_buildings").append(output);



    var toastCenter = app.toast.create({
        text: 'Buiding Added',
        closeTimeout: 1500
    });

    toastCenter.open();

    calculateHomeQuoteTotal();

}

function calculateBuilingPremium(BULDING_TYPE, SUM_INSURED,TYPE) {

    


    var RATE = 0;

    if (TYPE == 'building'){
        if (BULDING_TYPE == 'thatched'){
            RATE = 0.024;
        } else{
            RATE = 0.012;
        }
        console.log(RATE);
    }

    else if (TYPE == 'contents'){
        if (BULDING_TYPE == 'thatched'){
            RATE = 0.03;
        } else{
            RATE = 0.015
        }
        console.log(RATE);
    }



    


    var TRUE_PREMIUM = 0.0;

    

    TRUE_PREMIUM = RATE * SUM_INSURED;
    var stamp = (0.05 * TRUE_PREMIUM);
    var TOTAL_PREMIUM = TRUE_PREMIUM + stamp;

    return TOTAL_PREMIUM;

}

function calculateHomeQuoteTotal() {


    var list_count = 0;

    var TOTAL_PREMIUM = 0.0;


    $('#quote_home_buildings li').each(function(index, xxx) {


        var list_premium = $(xxx).find('.quote_home_premium').html();

        console.log('index ' + index + '  ');

        if (list_premium) {
            console.log('list_premium ' + list_premium);
            TOTAL_PREMIUM += parseFloat(list_premium);
        }


        $('#home_quote_display_premium').html(TOTAL_PREMIUM.toFixed(2));

        list_count += 1;

    });

    $('#home_quote_display_buildings_count').html(list_count);
    console.log(TOTAL_PREMIUM);



}

function getPolicyRisks(POLICY_NUMBER) {

    //app.preloader.show();


    console.log(SRV_URL() + "/thirdpartypolicyrisk/OMICO/" + POLICY_NUMBER + "/" + localStorage.getItem('user_mobile'));



    $.getJSON(SRV_URL() + "/thirdpartypolicyrisk/OMICO/" + POLICY_NUMBER + "/" + localStorage.getItem('user_mobile'), {},

        function(data) {


            var result = data.GetThirdPartyPolicyRiskResult;

            console.log('thirdpartypolicyrisk - ' + JSON.stringify(result));

            $("#portfolio_policy_risks_list_all").empty();
            $.each(result, function(i, field) {

                var output = '';

                // var status = 'F';

                // var status_label = '';

                // if (field.PolicyStatus == 'A') {
                //     status = 'success';
                //     status_label = 'ACTIVE'
                // }

                // if (field.PolicyStatus == 'L') {
                //     status = 'danger';
                //     status_label = 'LAPSED'
                // }


                // if (field.PolicyStatus == 'R') {
                //     status = 'warning';
                //     status_label = 'REOPENED'
                // }

                output += `<li>
                                <a href="javascript:;"  class="item-content" >
                                    <div class="item-inner">
                                        <h4 class="item-title">` + field.RiskType + ` ` + field.RiskTypeDescription + `</h4>
                                        <div class="item-subtitle mb-1">Sum Assured: $` + parseFloat(field.SumAssured).toFixed(2) + `</div>
                                        <div class="item-subtitle mb-1 color-success">Premium: $` + parseFloat(field.Premium).toFixed(2) + ` <span class="status-online bg-color-success"></span></div>

                                        <h2 class="title-number-carousel color-primary"><small>Expiry Date: ` + field.ExpiryDate + `</small></h2>
                                    </div>
                                    <div class="item-media chart-container">
                                        <div class="dynamicsparkline">` + field.RiskNotes1 + `</div>
                                    </div>
                                </a>
                            </li>`;




                $("#portfolio_policy_risks_list_all").append(output);

                // var toastCenter = app.toast.create({
                //     text: 'Risks',
                //     closeTimeout: 2000
                // });

                // toastCenter.open();


            });


            app.preloader.hide();

        }).fail(function(jqxhr) {

        app.preloader.hide();

        console.log("reg fail " + JSON.stringify(jqxhr));


        var toastWithButton = app.toast.create({
            text: '<i class="icon material-icons">error_outline</i> Request failed..Try Again?',
            closeButton: true,
        });

        toastWithButton.open();


        // app.dialog.alert("Request Failed..please check connection!", "Error");

    });


}


function getLatestExchangeRates() {

    //app.preloader.show();


    $.getJSON(SRV_URL() + "/exchangerates/OMICO/1", {},

        function(data) {


            console.log(data);


            var rates = data.GetExchangeRatesResult;


            //console.log(rates);

            $.each(rates, function(i, field) {


                if (field.UploadDate) {
                    $('#rates_last_update span').html(field.UploadDate);
                    console.log('' + field.UploadDate + ' date');
                }


                $('#' + field.CurrencyCode + '_rate_buy').html(parseFloat(field.Buy).toFixed(4));
                $('#' + field.CurrencyCode + '_rate_sell').html(parseFloat(field.Sell).toFixed(4));

                // $('#rates_last_update').html(field.UploadDate);
                //TODO: Save to cache for offline use


            });



            app.preloader.hide();

        }).fail(function(jqxhr) {

        app.preloader.hide();

        console.log("reg fail " + JSON.stringify(jqxhr));

        var toastWithButton = app.toast.create({
            text: '<i class="icon material-icons">error_outline</i> Request failed..Try Again?',
            closeButton: true,
        });

        toastWithButton.open();


        // app.dialog.alert("Request Failed..please check connection!", "Error");

    });


}


function exchangeCurrency() {


    var AMOUNT_TO_CONVET = parseFloat($('#exchange_calc_amount').val());

    var RATE = parseFloat($('#' + $('#exchange_calc_currency').val() + '_rate_buy').html());

    var TOTAL_EXCHANGED = AMOUNT_TO_CONVET * RATE;

    if (TOTAL_EXCHANGED) {
        $('#exchange_calc_total').val(TOTAL_EXCHANGED.toFixed(2));
    }

}




function getCurrencyCodeData() {

    var CURRENCY_CODE = localStorage.getItem("CURRENCY_CODE");

    console.log(SRV_URL() + "/exchangerate/OMICO/" + CURRENCY_CODE);

    $.getJSON(SRV_URL() + "/exchangerate/OMICO/" + CURRENCY_CODE, {},

        function(data) {

            console.log(data);


            var rates_this_week = data.GetExchangeRateAnalysisResult.ExchangeRatesThisWeek;
            var rates_history = data.GetExchangeRateAnalysisResult.ExchangeRatesThisMonth;


            var hist_out = '';
            $.each(rates_history, function(i, field) {

                $('#rates_history_days tbody').append(`<tr>
                    <th scope="row">` + field.UploadDate + `</th>
                    <td>` + field.Buy + `</td>
                    <td>` + field.Sell + `</td>
                </tr>`);

            });


            // /* Google chart */
            google.charts.load('current', {
                'packages': ['corechart']
            });
            google.charts.setOnLoadCallback(drawChart);



            var data_array = [];

            function drawChart() {


                // var data = google.visualization.arrayToDataTable([data_array]);

                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Day');
                data.addColumn('number', 'Buy');
                // data.addColumn('number', 'Sell');


                $.each(rates_this_week, function(i, field) {

                    /// if (i > 0) {

                    //  data_array.push([field.WeekDay, parseFloat(field.Buy).toFixed(4), parseFloat(field.sell).toFixed(4)]);
                    data_array.push([field.WeekDay, parseFloat(field.Buy).toFixed(4)]);
                    //console.log(data_array[i + 1]);
                    //  }
                    //data.addRow([field.WeekDay, parseFloat(field.Buy).toFixed(4), parseFloat(field.sell).toFixed(4)]);

                });

                console.log(data_array);
                // var data = google.visualization.arrayToDataTable(data_array);


                // var data = new google.visualization.DataTable();
                // data.addColumn('string', 'Day');
                // data.addColumn('number', 'Buy');
                // data.addColumn('number', 'Sell');
                data.addRows(data_array);





                var options = {
                    vAxis: {
                        minValue: 0
                    },
                    legend: {
                        position: 'top',
                        maxLines: 5
                    },
                    chartArea: {
                        left: 38,
                        top: 10,
                        bottom: 20,
                        width: '85%'
                    }
                };

                var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
                chart.draw(data, options);


            }





            app.preloader.hide();

        }).fail(function(jqxhr) {

        app.preloader.hide();

        console.log("reg fail " + JSON.stringify(jqxhr));


        var toastWithButton = app.toast.create({
            text: '<i class="icon material-icons">error_outline</i> Request failed..Try Again?',
        });

        toastWithButton.open();



        // app.dialog.alert("Request Failed..please check connection!", "Error");

    });


}

function getClientClaims() {


    var claims = localStorage.getItem('all_user_claims');


    $.each(JSON.parse(claims), function(i, field) {


        var output = '';

        var status = 'F';

        var status_label = '';

        if (field.ClaimStatus == 'F') {
            status = 'success';
            status_label = 'FINALISED'
        }

        if (field.ClaimStatus == 'O') {
            status = 'danger';
            status_label = 'OPEN'
        }


        if (field.ClaimStatus == 'R') {
            status = 'warning';
            status_label = 'REOPENED'
        }

        output += '<li>';
        output += '<a href="#" class="item-content popup-open" data-popup=".claim-popup">';
        output += '    <div class="item-inner">';
        output += '       <h4 class="item-title"><span class="claims_claim_description">' + field.ClaimDescription + '</span></h4>';
        output += '        <div class="item-subtitle mb-1"><span class="cliams_claim_number">' + field.ClaimNumber + '</span></div>';
        output += '        <h2 class="title-number-carousel color-primary " style="display:none;"><span class="claims_claim_value">$' + field.ClaimValue + '</span><small> Value</small></h2>';
        output += '    </div>';
        output += '    <div class="item-media chart-container claims_claim_status" >';
        output += '        <small class="color-' + status + ' ">';
        output += '                        <span >' + status_label + '</span> <span class="status-online bg-color-' + status + '"></span>';
        output += '                    </small>';
        output += '                        </div>';
        output += '</a>';
        output += ' </li>';



        $("#portfolio_claims_list_all").append(output);


    });



}


function openInMaps() {

    var targetLat = localStorage.getItem('targetLat');
    var targetLon = localStorage.getItem('targetLon');
    //
    //window.location = 'comgooglemaps://?center=40.765819,-73.975866&zoom=14&views=traffic'
    window.location = 'geo:' + targetLat + ',' + targetLon;

}


function initMap(currentLat, currentLon) {

    var targetLat = localStorage.getItem('targetLat');
    var targetLon = localStorage.getItem('targetLon');
    var targetLocationName = localStorage.getItem('targetLocationName');
    $('#location_title').html(targetLocationName)
    var pointA = new google.maps.LatLng(currentLat, currentLon),
        pointB = new google.maps.LatLng(targetLat, targetLon),
        myOptions = {
            zoom: 7,
            center: pointA
        },
        map = new google.maps.Map(document.getElementById('om-map-canvas'), myOptions),
        // Instantiate a directions service.
        directionsService = new google.maps.DirectionsService,
        directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
        }),
        markerA = new google.maps.Marker({
            position: pointA,
            title: "Your Location",
            label: "From",
            map: map
        }),
        markerB = new google.maps.Marker({
            position: pointB,
            title: targetLocationName,
            label: "To",
            map: map
        });

    // get route from A to B
    calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

}



function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
    directionsService.route({
        origin: pointA,
        destination: pointB,
        travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function showDirectionOnMap() {

    navigator.geolocation.getCurrentPosition(handle_geolocation_query);
}

function handle_geolocation_query(position) {
    currentGPS = position.coords.latitude + ',' + position.coords.longitude;
    currentLat = position.coords.latitude;
    currentLon = position.coords.longitude;
    localStorage.setItem('currentLat', currentLat);
    localStorage.setItem('currentLon', currentLon);

    initMap(currentLat, currentLon);

}


function setProfileCameraPicture() {


    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        allowEdit: true,
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 200,
        targetHeight: 200,
        correctOrientation: false
    });

    function onSuccess(imageData) {

        // var image = document.getElementById('myImage');
        // image.src = "data:image/jpeg;base64," + imageData;

        //window.localStorage.setItem("profile_image_bg", "url(data:image/jpeg;base64," + imageData + ")");
        window.localStorage.setItem("profile_image_bg", "data:image/jpeg;base64," + imageData + "");
        document.getElementById("profile_image_display").src = window.localStorage.getItem("profile_image_bg");


    }

    function onFail(message) {
        myApp.alert('Failed because: ' + message);
    }


}


function setProfileFilePicture() {



    window.imagePicker.getPictures(
        function(results) {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);

                //profile_image_display
                // window.localStorage.getItem("user_type")=="mentor";



                toDataURL(results[i], function(dataUrl) {
                    // console.log('RESULT:', dataUrl);
                    window.localStorage.setItem("profile_image_bg", "url(" + dataUrl + ")");
                    document.getElementById("profile_image_display").style.backgroundImage = window.localStorage.getItem("profile_image_bg");

                    //myApp.alert(dataUrl);
                });

                //background-image:url('img/user_avatar.png');

                // myApp.alert(results[i]);
            }
        },
        function(error) {
            console.log('Error: ' + error);
        }, {
            maximumImagesCount: 1,
            width: 800
        }
    );

}



function Calculate_Risk() {

    var annual_premium;
    var bi_annual;
    var four_monthly;
    var quartely;

    var risk = document.getElementById('risk').value;
    var insured = document.getElementById('insured').value;
    annual_premium = risk * insured
    var stamp = (0.05 * annual_premium);
    var total = annual_premium + stamp;
    bi_annual = total / 2;
    //  four_monthly = annual_premium / 4;
    quartely = total / 4;

    document.getElementById('value').innerHTML = '$' + total.toFixed(2);
    document.getElementById('value_bi').innerHTML = '$' + bi_annual.toFixed(2);
    document.getElementById('value_qua').innerHTML = '$' + quartely.toFixed(2);

    console.log(total);
    console.log(bi_annual);
    console.log(quartely);
}


function Calculate_Content() {
    //    Content Calculator
    var rate;
    var annual_premium;
    var bi_annual;
    var four_monthly;
    var quartely;

    var that_rate = 0.03;
    var non_that = 0.015;

    if (document.getElementById('that-content').checked) {
        rate = that_rate;
    } else(
        rate = non_that
    )

    // console.log(rate);

    var insured = document.getElementById('content_insured').value;
    annual_premium = rate * insured
    var stamp = (0.05 * annual_premium);
    var total = annual_premium + stamp;
    bi_annual = total / 2;
    //    four_monthly = total / 4;
    quartely = total / 4;
    //    console.log(total);

    document.getElementById('content_value').innerHTML = '$' + total.toFixed(2);
    document.getElementById('content_bi').innerHTML = '$' + bi_annual.toFixed(2);
    document.getElementById('content_qua').innerHTML = '$' + quartely.toFixed(2);

}


function Calculate_Build() {
    // Building Calculator

    var rate;
    var annual_premium;
    var bi_annual;
    var four_monthly;
    var quartely;

    var that_rate = 0.0024;
    var non_that = 0.0012;

    if (document.getElementById('that-build').checked) {
        rate = that_rate;
    } else(
        rate = non_that
    )

    console.log(rate);

    var insured = document.getElementById('build_insure').value;
    annual_premium = rate * insured
    var stamp = (0.05 * annual_premium);
    var total = annual_premium + stamp;
    bi_annual = total / 2;
    //  four_monthly = annual_premium / 4;
    quartely = total / 4;
    console.log(annual_premium);

    document.getElementById('build_value').innerHTML = '$' + total.toFixed(2);
    document.getElementById('build_value_bi').innerHTML = '$' + bi_annual.toFixed(2);
    document.getElementById('build_value_qua').innerHTML = '$' + quartely.toFixed(2);

    console.log(annual_premium);

}

function submitClaimNotification() {

    console.log('Saving claim notification');

    app.preloader.show();

    $.post(SRV_URL() + "/pushclaimnotification", JSON.stringify({
            ClientFullName: $('#claim_client_fullname').val(),
            ContactNumber: $('#claim_client_contact_number').val(),
            EmailAddress: $('#claim_client_email').val(),
            PolicyNumber: $('#claim_client_policy_number').val(),
            LossType: $('#claim_loss_type').val(),
            LossDate: $('#claim_loss_date').val(),
            LossDescriptin: $('#claim_description').val(),
            AttachmentFilename: $('#claim_client_fullname').val(),
            USER_ID: "1",
            COMPANY_NAME: "OMICO"
        }),
        function(data, status) {
            app.preloader.hide();
            console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
            goBack();

            app.notification.create({
                icon: '<i class="icon demo-icon">7</i>',
                title: 'Claim Notification',
                titleRightText: 'now',
                subtitle: 'This is a subtitle',
                text: 'This is a simple notification message',
                closeTimeout: 3000,
            });


        });


    // $.ajax({
    //     type: "POST",
    //     url: SRV_URL() + "/pushclaimnotification",
    //     data: {
    //         ClientFullName: $('#claim_client_fullname').val(),
    //         ContactNumber: $('#claim_client_contact_number').val(),
    //         EmailAddress: $('#claim_client_email').val(),
    //         PolicyNumber: $('#claim_client_policy_number').val(),
    //         LossType: $('#claim_loss_type').val(),
    //         LossDate: $('#claim_loss_date').val(),
    //         LossDescriptin: $('#claim_description').val(),
    //         AttachmentFilename: $('#claim_client_fullname').val(),
    //         USER_ID: "1",
    //         COMPANY_NAME: "OMICO"
    //     }
    // }).done(function() {
    //     console.log('DONE SAVING');
    // });

}


function calculateMotorInsurance() {

    var sumInsured = document.getElementById('sumInsured').value; // fetch value of sum insured //
    var source = document.getElementById('source').value; // fetch current source //
    // var make = document.getElementById('name').value;
    // var frequency = document.getElementById('frequency').value; // fetch interval of insurance 

    //static varriables // 
    var rate_ex_jap = 0.08;
    var rate_other = 0.05;
    var levy = 54;
    var s_rate = 0.05;

    // computable varriables 
    var premium;
    var total_premium;


    // if vehicle is not ex japanese or ex uk 
    if (source == 'Other') {
        premium = parseFloat(sumInsured) * parseFloat(rate_other);
    }


    // if vehicle is ex japanese or ex uk 
    else if (source == 'EXJAP') {
        premium = parseFloat(sumInsured) * parseFloat(rate_ex_jap);
    }

    var stamp_duty = premium * parseFloat(s_rate);
    
    // setting floor and ceiling on stamp duty //
    if (stamp_duty > 2 && stamp_duty < 200000){
        total_premium = premium + levy + stamp_duty;}
        
        //console.log("total premium == "+ total_premium);
    // if (frequency == 'term') {
    //     total_premium = premium / 3;
    //     var value = document.getElementById('value').innerHTML = total_premium.toFixed(2);
    //     var value_bi = document.getElementById('value_bi').innerHTML = (total_premium / 2).toFixed(2);
    //     var value_qua = document.getElementById('value_qua').innerHTML = (total_premium / 3).toFixed(2);
    // } else if (frequency == 'half') {

    //     total_premium = total_premium / 2;

    //     var value = document.getElementById('value').innerHTML = total_premium.toFixed(2);
    //     var value_bi = document.getElementById('value_bi').innerHTML = (total_premium / 2).toFixed(2);
    //     var value_qua = document.getElementById('value_qua').innerHTML = (total_premium / 3).toFixed(2);
    // } else {
    //total_premium = premium;
    if(typeof total_premium != 'undefined')
    {
        var value = document.getElementById('value').innerHTML = total_premium.toFixed(2);
        var value_bi = document.getElementById('value_bi').innerHTML = (total_premium / 2).toFixed(2);
        var value_qua = document.getElementById('value_qua').innerHTML = (total_premium / 3).toFixed(2);
    }

    else
    {
        var value = document.getElementById('value').innerHTML = "0.00";
        var value_bi = document.getElementById('value_bi').innerHTML = "0.00";
        var value_qua = document.getElementById('value_qua').innerHTML = "0.00";
    }
    if (sumInsured != null) {

    }
    //var premium_val = document.getElementById('premium').innerHTML = "$"+ total_premium.toFixed(2);
    //var frequency_val = document.getElementById('frequency_val').innerHTML = frequency;
    //var name = document.getElementById('make').innerHTML = name;

}




function displayDistanceTotollGate() {

    navigator.geolocation.getCurrentPosition(handle_toll_distance_calculation);
}

function handle_toll_distance_calculation(position) {

    //currentGPS = position.coords.latitude + ',' + position.coords.longitude;
    currentLat = position.coords.latitude;
    currentLon = position.coords.longitude;


    $('#toll-gates-list li').each(function(index, xxx) {


        var locationLat = $(xxx).find('.toll-latitude').html();
        var locationLong = $(xxx).find('.toll-longitude').html();

        console.log(locationLat + ' ' + locationLong);

        var start = {
            lat: currentLat || undefined,
            lng: currentLon || undefined
        };


        var end = {
            lat: parseFloat(locationLat) || undefined,
            lng: parseFloat(locationLong) || undefined
        };


        var distance = '-';
        var unit = 'km';

        if (geolib.validate(start) && geolib.validate(end)) {

            distance = geolib.getDistance(start, end);

            $(xxx).find('.toll-distance-display').html(distance + unit);

        } else {

            $(xxx).find('.toll-distance-display').html('-' + unit);


        }

    });




}