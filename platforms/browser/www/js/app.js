// Dom7
var $$ = Dom7;

// Theme
var theme = 'md';
if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
    id: 'io.framework7.Overux',
    root: '#Overux',
    theme: theme,
    data: function() {
        return {
            user: {
                firstName: 'Bee',
                lastName: 'Snow',
            },
        };
    },
    methods: {
        helloWorld: function() {
            app.dialog.alert('Hello There!');
        },
    },
    routes: routes,
    vi: {
        placementId: 'pltd4o7ibb9rc653x14',
    }
});

/* show hide app loader */

$(window).on('load', function() {

    app.preloader.hide();

    document.addEventListener('backbutton', onBackKeyDown, false);

    // document.addEventListener('deviceready', onDeviceReady, false);

    toggleUserDisplay();

    var cartSaved;

    if (localStorage.getItem('savedCart') == null) {
        cartSaved = `[{"id":"1",
        "items":[]
    }
]`;
    }
    else {
        
        cartSaved = localStorage.getItem('savedCart');
    }

    localStorage.setItem('savedCart', cartSaved);

})

app.statusbar.setBackgroundColor('#00c0e8');




function onBackKeyDown() {


    if (app.views.main.router.currentPageEl == 'index') {
        console.log("Exit on back again");
        app.dialog.confirm('Exit App?', function() {
            app.exitApp();
        });

    } else {
        goBack();
    }

}

/* page inside iframe just for demo app */
if (self !== top) {
    $('body').addClass('max-demo-frame')
}


var theme = 'theme-light';
var colortheme = 'color-theme-blue';


function mycolortheme() {
    $$('.layout-theme').on('click', function() {
        $('body').removeClass(theme);
        theme = $(this).attr('value');
        $('body').addClass($(this).attr('value'));
    });
    $$('.layout-color-theme').on('click', function() {
        $('body').removeClass(colortheme);
        var colorvalue = 'color-theme-' + $(this).attr('value');
        colortheme = colorvalue;

        $('body').addClass(colortheme);
    });
}

$$(document).on('page:init', '.page[data-name="dashboard"]', function(e) {
    $(".dynamicsparkline").sparkline([5, 6, 7, 2, 0, 4, 2, 5, 6, 7, 2, 0, 4, 2, 4], {
        type: 'bar',
        height: '25',
        barSpacing: 2,
        barColor: '#a9d7fe',
        negBarColor: '#ef4055',
        zeroColor: '#ffffff'
    });
    mycolortheme();
});
$$(document).on('page:init', '.page[data-name="welcome"]', function(e) {
    $(".dynamicsparkline").sparkline([5, 6, 7, 2, 0, 4, 2, 5, 6, 7, 2, 0, 4, 2, 4], {
        type: 'bar',
        height: '25',
        barSpacing: 2,
        barColor: '#a9d7fe',
        negBarColor: '#ef4055',
        zeroColor: '#ffffff'
    });
    mycolortheme();
});

$$(document).on('page:init', '.page[data-name="project-list"]', function(e) {
    $(".dynamicsparkline").sparkline([5, 6, 7, 2, 0, 4, 2, 5, 6, 7, 2, 0, 4, 2, 4], {
        type: 'bar',
        height: '25',
        barSpacing: 2,
        barColor: '#a9d7fe',
        negBarColor: '#ef4055',
        zeroColor: '#ffffff'
    });
    mycolortheme();
});

$$(document).on('page:init', '.page[data-name="aboutus"]', function(e) {
    mycolortheme();
});
$$(document).on('page:init', '.page[data-name="component"]', function(e) {
    mycolortheme();
});
$$(document).on('page:init', '.page[data-name="profile"]', function(e) {
    $(".dynamicsparkline").sparkline([5, 6, 7, 2, 0, 4, 2, 5, 6, 7, 2, 0, 4, 2, 4], {
        type: 'bar',
        height: '25',
        barSpacing: 2,
        barColor: '#a9d7fe',
        negBarColor: '#ef4055',
        zeroColor: '#ffffff'
    });
    mycolortheme();
});

$$(document).on('page:init', '.page[data-name="project-detail"]', function(e) {
    $(".dynamicsparkline").sparkline([5, 6, 7, 2, 0, 4, 2, 5, 6, 7, 2, 0, 4, 2, 4], {
        type: 'bar',
        height: '25',
        barSpacing: 2,
        barColor: '#a9d7fe',
        negBarColor: '#ef4055',
        zeroColor: '#ffffff'
    });

    /* Google chart */
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Year', 'Sales', 'Expenses'],
            ['2013', 1000, 400],
            ['2014', 1170, 460],
            ['2015', 660, 1120],
            ['2016', 1030, 540]
        ]);

        var options = {
            vAxis: {
                minValue: 0
            },
            legend: {
                position: 'top',
                maxLines: 3
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

    mycolortheme();

});


$$(document).on('page:init', '.page[data-name="exchange_rate_stats"]', function(e) {
    $(".dynamicsparkline").sparkline([5, 6, 7, 2, 0, 4, 2, 5, 6, 7, 2, 0, 4, 2, 4], {
        type: 'bar',
        height: '25',
        barSpacing: 2,
        barColor: '#a9d7fe',
        negBarColor: '#ef4055',
        zeroColor: '#ffffff'
    });

    getCurrencyCodeData();

    // /* Google chart */
    // google.charts.load('current', {
    //     'packages': ['corechart']
    // });
    // google.charts.setOnLoadCallback(drawChart);

    // function drawChart() {
    //     var data = google.visualization.arrayToDataTable([
    //         ['Day', 'Buy', 'Sell'],
    //         ['Mon', 10.4564, 11.3278],
    //         ['Tue', 10.46, 11.4278],
    //         ['Wed', 10.3, 11.3268],
    //         ['Thu', 10.457, 11.3378],
    //         ['Fri', 10.4, 11.2278],
    //         ['Sat', 0, 0],
    //         ['Sun', 0, 0]
    //     ]);

    //     var options = {
    //         vAxis: {
    //             minValue: 0
    //         },
    //         legend: {
    //             position: 'top',
    //             maxLines: 5
    //         },
    //         chartArea: {
    //             left: 38,
    //             top: 10,
    //             bottom: 20,
    //             width: '85%'
    //         }
    //     };

    //     var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    //     chart.draw(data, options);


    // }

    mycolortheme();

});

//Custom functions panel_user_fullname

$$(document).on('page:init', '.page[data-name="my_portfolio"]', function(e) {
    // console.log("My Account Clicked");

    // if (IS_LOGGED_IN()) {

    //     loadPortfolioDetails();

    //     if (window.localStorage.getItem("profile_image_bg")) {

    //         document.getElementById("profile_image_display").src = window.localStorage.getItem("profile_image_bg");

    //     }

    // } else {

    //     app.router.navigate('/login/', { transition: 'f7-cover' })
    // }
getCart();


});

$$(document).on('page:init', '.page[data-name="directions"]', function(e) {
    showDirectionOnMap(-17.83523, 31.04807, 'Harare Central');
});

$$(document).on('page:afterin', '.page[data-name="index"]', function(e) {

    console.log("on home now");


    toggleUserDisplay();

    //$('#panel_user_fullname').html(localStorage.getItem('user_full_name'));

});

$$(document).on('page:init', '.page[data-name="index"]', function(e) {

    console.log("init home now");


    // toggleUserDisplay();

    //$('#panel_user_fullname').html(localStorage.getItem('user_full_name'));

}); 

$$(document).on('page:init', '.page[data-name="home"]', function(e) {
    
    //getProduct("4005808685844")

});

$$(document).on('page:init', '.page[data-name="prdt_lst"]', function(e) {
    
    getProducts();

});

$$(document).on('page:init', '.page[data-name="my_profile_all_claims"]', function(e) {
    getClientClaims();
});

$$(document).on('page:init', '.page[data-name="my_profile_all_policies"]', function(e) {
    getClientPolicies();
});

$$(document).on('page:init', '.page[data-name="my_profile_all_claims"]', function(e) {

    app.tooltip.create({
        targetEl: '.navbar-tooltip',
        text: 'Explanation of Claims notificartion here<br>with more text<br><em>Just to let people know it\'s not a cliam</em>'
    });

    app.calendar.create({
        inputEl: '#claim_loss_date',
        openIn: 'customModal',
        header: true,
        footer: true,
        dateFormat: 'MM dd yyyy',
    });

});


$$(document).on('page:init', '.page[data-name="exchange_rates"]', function(e) {
    getLatestExchangeRates();
});

$$(document).on('page:init', '.page[data-name="my_profile_all_policy_risks"]', function(e) {

    console.log('Policy Risks');
    getPolicyRisks(localStorage.getItem('RISK_POLICY_NUMBER'));

});

$$(document).on('page:init', '.page[data-name="quote_motor"]', function(e) {

    $("#add_motor_button").unbind("click");

    $("#add_motor_button").click(function(event) {

        event.preventDefault();
        event.stopPropagation();
        motorQouteAddVehicle();

        return false;
    });

});


$$(document).on('page:init', '.page[data-name="toll-plazzas"]', function(e) {
    displayDistanceTotollGate();
});



$$(document).on('deviceready', function() {
    onDeviceReady()
});

function onDeviceReady() {

    cordova.plugins.firebase.messaging.subscribe("OMICO_GENERAL");

    cordova.plugins.firebase.messaging.getToken().then(function(token) {
        alert("Got device token: ", token);
    });


    cordova.plugins.firebase.messaging.onMessage(function(payload) {
        alert("New foreground FCM message: ", payload);
    });

    cordova.plugins.firebase.messaging.requestPermission({ forceShow: true }).then(function() {
        alert("You'll get foreground notifications when a push message arrives");
    });


    cordova.plugins.firebase.messaging.onBackgroundMessage(function(payload) {
        alert("New background FCM message: ", payload);
    });


}