function scanBarcode() {
    // cordova.plugins.barcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com", function(success) {
    //     alert("encode success: " + success);
    //   }, function(fail) {
    //     alert("encoding failed: " + fail);
    //   }
    // );

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text);
            getProduct(result.text)
        },
        function (error) {
            alert("Scanning failed: " + error);
        }
    );
    $('.openCart').trigger('click');
}

function openCamera() {
    navigator.camera.getPicture(function onSuccess(imageData) {

    }, function onFail(message) {
        alert('Failed because: ' + message);
    }, {
        quality: 25,
        allowEdit: true,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: window.Camera.PictureSourceType.CAMERA,
    });
}


function addToCart(item_no, quantity, price) {

    var jsonOBJ = [];

    var cart = `{
        "shop_id" : "`+ localStorage.getItem('shop') + `",
        "itemCode" : "`+ item_no + `",
        "cardCode" : "`+ localStorage.getItem('cardCode') + `",
        "quantity" : "`+ $('#' + quantity + '').val() + `",
        "created" : "2020-06-01 00:35:07"
    }`;

    //localStorage.setItem('savedCart', cart);
    app.preloader.show();
    var result = $.ajax({
        url: SERVER('cart/create'),
        type: 'POST',
        data: cart,
        dataType: 'json',

        async: true,
        complete: function () {
            app.preloader.hide();
        },
        success: function (response) {
            var toast = app.toast.create({
                text: 'added to cart',
                closeTimeout: 1000
            })

            toast.open();
            getCartCount();

        },
        error: function (error) {
            var toast = app.toast.create({
                text: error.statusText,
                closeTimeout: 1000
            })

            toast.open();
        }


    })

}

function getCart() {
    var output;
    var test = 'test';
    console.log(JSON.parse(localStorage.getItem('savedCart')))

    $('#cartSummary').empty();

    $.ajax({
        url: SERVER('cart/read') + '?cardCode=' + localStorage.getItem('cardCode') + '&shop_id=' + localStorage.getItem('shop'),
        type: 'POST',
        data: {},
        dataType: 'json',

        async: true,
        success: function (response) {
            console.log(response);

            $.each(response.records, function (i, field) {

                if (field.customer_invoice_status == "0") {
                    output = `<div id="cart_item_` + (i + 1) + `" class="p-1 items row item-content min-height-1 kf-border-top-solid" style="padding-right: 16px !important;">
                    <div class = "col color-om-light-gray" style="width: 55% !important; padding-right: 16px !important;">
                    ` + field.name + `
                    </div>
                    <input class="text-right" id="cart_code_`+ (i + 1) + `" type="hidden" value="` + field.itemCode + `"/>
        
                    
                    <input class="col text-right color-om-light-gray" style="width: 15% !important; vertical-align: top !important;" id="cart_quantity_`+ (i + 1) + `" oninput="calculateOrderTotal(); resetInput('cart_quantity_` + (i + 1) + `'); editCartValues('` + (i + 1) + `')" placeholder="0" type="number" value="` + field.quantity + `"/>
        
                   
                    <div id="cart_price_`+ (i + 1) + `" class="color-om-light-gray col text-right" style="width: 20% !important; vertical-align: text-top !important;">
                        
                    `+ (parseInt(field.quantity) * parseFloat(field.price)) + `
                    
                    </div>
        
                    <i style="width: 10% !important;" onclick="removeCartItem('`+ field.id + `','cart_item_` + (i + 1) + `')" class="text-right col color-red icon material-icons md-only">delete</i>
        
        
                    <input class="text-right kf-small" id="cart_subtotal_`+ (i + 1) + `" onchage="" type="hidden" value="` + + `"/>
                    <input class="text-right kf-small" id="cart_price_raw_`+ (i + 1) + `" onchage="" type="hidden" value="` + + `"/>
                    
        
                    
                    
                </div>`;
                    $('#cartSummary').append(output);
                }


            })
        }
    });
    // });
}

function processOrder(data) {
    // $("#qr-gn").click(function () {

    $("#qrcode").html("");
    var txt = data;
    if (txt == '') {
        alert("No Product Information Found!");
        return false;
    }
    var size = "200x200";
    var sizeSplit = size.split('x');
    var width = sizeSplit[0];
    var height = sizeSplit[1];
    generateQRcode(width, height, txt);
    return false;
    // });
}

function generateQRcode(width, height, text) {
    $('#qrcode').qrcode({ width: width, height: height, text: text });
}

function removeCartItem(index, the_list_item) {

    spliceCartItems(index)

    $("#cartSummary").find('#' + the_list_item + '').remove();

    getCartCount();

}

function spliceCartItems(itemID) {

    console.log("trying to delete")
    var data = `{
        
        "id" : "`+ itemID + `"
       
    }`;

    $.ajax({
        url: SERVER('cart/delete_one'),
        type: 'POST',
        data: data,
        dataType: 'json',

        async: true,
        success: function (response) {
            var toast = app.toast.create({
                text: "Removed From Cart!",
                closeTimeout: 1000,
            });

            toast.open();
        }
    });


}

function getCartCount() {

    var count = 0;

    $.ajax({
        url: SERVER('cart/get_count') + '?cardCode=' + localStorage.getItem('cardCode') + '&shop_id=' + localStorage.getItem('shop'),
        type: 'GET',
        dataType: 'json',

        async: true,
        complete: function () {
            app.preloader.hide();
        },
        success: function (result) {
            console.log(result);
            $('#profile_cart_count').html('(' + result.count + ')');
            count = result.count;
        },
        error: function () {
            var toast = app.toast.create({
                text: 'Something went wrong',
                closeTimeout: 1000
            })

            toast.open();
        }
    });
}

function loginToAccount() {
    var username = $('#username').val();
    var password = $('#password').val();

    if (!username) {
        app.dialog.alert("Enter username!", "Required!");
        app.preloader.hide();
        return;
    }


    if (!password) {
        app.dialog.alert("Enter password!", "Required!");
        app.preloader.hide();
        return;
    }

    app.preloader.show();

    $.ajax({

        url: SERVER('user/read_one') + '?email=' + username + '&password=' + password,
        type: 'POST',
        data: {},
        dataType: 'json',

        async: true,
        success: function (response) {
            localStorage.setItem('user_name', response.name)
            localStorage.setItem('user_surname', response.surname)
            localStorage.setItem('user_email', response.email)
            localStorage.setItem('cardCode', response.cardCode)

            openRoutePage('/my_shop/');

            console.log(response);

        },

        error: function (response) {

            var toast = app.toast.create({
                text: response.statusText,
                closeTimeout: 1000,
            });

            toast.open();

            console.log(response);

        },

        complete: function () {
            app.preloader.hide();
        }
    });
}

function LogInByVerificationCode() {
    // var username = $('#username').val();
    var vCode = $('#r_code').val();

    // if (!username) {
    //     app.dialog.alert("Enter username!", "Required!");
    //     app.preloader.hide();
    //     return;
    // }


    if (!vCode) {
        app.dialog.alert("Enter Verification Code!", "Required!");
        app.preloader.hide();
        return;
    }

    app.preloader.show();

    $.ajax({

        url: SERVER('user/verifyPhone') + '?vCode=' + vCode,
        type: 'POST',
        data: {},
        dataType: 'json',

        async: true,
        success: function (response) {
            localStorage.setItem('user_name', response.name)
            localStorage.setItem('user_surname', response.surname)
            localStorage.setItem('user_email', response.email)
            localStorage.setItem('cardCode', response.cardCode)

            openRoutePage('/my_shop/');

            console.log(response);

        },

        error: function (response) {

            var toast = app.toast.create({
                text: response.statusText,
                closeTimeout: 1000,
            });

            toast.open();

            console.log(response);

        },

        complete: function () {
            app.preloader.hide();
        }
    });
}

function getUserDetails() {
    $('#edit_user_name').val(localStorage.getItem('user_name'));
    $('#edit_user_surname').val(localStorage.getItem('user_surname'));
    $('#edit_user_email').val(localStorage.getItem('user_email'));

}

function updateUserDetails() {
    var password = $('#password');

}

function getProducts() {

    var output = '';
    $.ajax({
        url: SERVER('product/read') + '?shop_id=' + localStorage.getItem('shop'),
        type: 'GET',
        data: {},
        dataType: 'json',

        async: true,
        success: function (response) {

            $('#prdt_lst').empty();

            $.each(response.records, function (i, field) {

                output = `<li onclick="getProduct(` + field.item_no + `)">
                <a class="item-content item-link popup-open" data-popup=".product-popup">
                    <div class="item-media"><img width="40px" src="`+ field.file_path + `"/></i>
                    </div>
                    <div class="item-inner">
                        <div class="item-title">
                            <h3 class="mb-0 om-home-menu-text">` + field.name + `</h3>
    
                            <p class="small mb-0 text-muted"> itemGroup - `+ field.category_name + `</p>
                        </div>
    
    
                    </div>
                </a>
            </li>`
                $('#prdt_lst').append(output);
            });

            console.log(response);

        },

        error: function (response) {

            console.log(response);

        }
    });
}

function getProduct(productID) {
    var name;
    var output = '';
    $.ajax({
        url: SERVER('product/read_one') + '?item_no=' + productID + '&shop_id=' + localStorage.getItem('shop'),
        type: 'GET',
        data: {},
        dataType: 'json',

        async: true,

        statusCode: {
            404: function (error) {
                var toast = app.toast.create({
                    text: JSON.parse(error.responseText).message,
                    closeTimeout: 1000,
                });

                toast.open();
                app.preloader.hide();
            }
        },
        success: function (response) {

            console.log(response);

            // add popup class //

            var dynamicPopup = app.popup.create({
                content: `    <div class="popup car-popup">
                        <div class="page">
                            <div class="navbar om-gradient">
                                <div class="navbar-inner">
                                    <div class="title">Product Details</div>
                                    <div class="right"><a href="#" class="link popup-close"><i class="material-icons">arrow_back</i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="page-content">
                                <div class="block-om-block">
                                    <div class="list form-store-data">
                                        <ul id="list">
                                            <li class="item-content item-input om-no-border">
                                                <div class="item-inner pt-1 pb-1">
                                                    <div class="item-title item-floating-label"></div>
                
                                                    <div class="item-input-wrap">
                                                        <input id="motor_qoute_vehicle_make" type="text" name="motor_qoute_vehicle_make"
                                                            placeholder="item name" value="`+ response.name + `" required readonly>
                                                        <span class="input-clear-button"></span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="item-content item-input om-no-border">
                                                <div class="item-inner pt-1 pb-1">
                                                    <div class="item-title item-floating-label"></div>
                
                                                    <div class="item-input-wrap">
                                                        <input id="motor_qoute_vehicle_model" type="text"
                                                            name="motor_qoute_vehicle_model" placeholder="Vehicle model" value="category - `+ response.category_name + `" required readonly>
                                                        <span class="input-clear-button"></span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="item-content item-input om-no-border">
                                                <div class="item-inner pt-1 pb-1">
                                                    <div class="item-title item-floating-label"></div>
                                                    <div class="item-input-wrap">
                                                        <input id="motor_qoute_vehicle_reg" type="text" name="motor_qoute_vehicle_reg"
                                                            placeholder="Expiry Date" value="expires - `+ response.expiry + `" required readonly>
                                                        <span class="input-clear-button"></span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="item-content item-input om-no-border">
                                                <div class="item-inner pt-1 pb-1">
                                                    <div class="item-title item-floating-label"></div>
                
                                                    <div class="item-input-wrap">
                                                        <input id="motor_quote_vehicle_sum_assured" type="number"
                                                            name="motor_quote_vehicle_sum_assured" placeholder="Item Value" value="`+ response.price + `" required readonly>
                                                        <span class="input-clear-button"></span>
                                                    </div>
                                                </div>
                                            </li>
 
                                            <li class="item-content item-input om-no-border">
                                            <div class="item-inner pt-1 pb-1">
                                                <div class="item-title item-floating-label">Item Count</div>
            
                                                <div class="item-input-wrap">
                                                    <input id="itemCount" type="number"
                                                        name="motor_quote_vehicle_sum_assured" placeholder="Item Count" required>
                                                    <span class="input-clear-button"></span>
                                                </div>
                                            </div>
                                        </li>
                
                                            <li class="item-content item-input om-no-border">
                                                <div class="item-inner">
                                                    <div class="item-input-wrap">
                                                        <button onclick="addToCart('`+ response.item_no + `','itemCount', '` + response.price + `')" class="col button button-big button-raised popup-close"
                                                            id="add_motor_button">Add <i
                                                                class="icon material-icons md-only color-info">add</i> </button>
                
                                                    </div>
                                                </div>
                                            </li>
                
                                        </ul>
                                    </div>
                                </div>
                            </div>
                
                        </div>
                    </div>`

            });

            dynamicPopup.open();


        },
        error: function (response) {
            console.log(response);
        }
    });


    return name;
}

function Get(url, data) {

    var result = $.ajax({
        url: SERVER() + url,
        type: 'GET',
        data: data,
        dataType: 'json',

        async: true,
        success: function (response) {

            result += JSON.stringify(response);

        },

        error: function (error) {

            result += JSON.stringify(error);;

        }

    }).responseText;

    return result;
}

function Post(url, data, callBackFunction) {
    app.preloader.show();
    var result = $.ajax({
        url: SERVER() + url,
        type: 'POST',
        data: data,
        dataType: 'json',

        async: true,
        beforeSend: setHeader,
        complete: function () {
            app.preloader.hide();
        },
        success: function (response) {
            var toast = app.toast.create({
                text: response.success,
                closeTimeout: 1000
            })

            toast.open();

            callBackFunction(page);

        },
        error: function (error) {
            var toast = app.toast.create({
                text: error.statusText,
                closeTimeout: 1000
            })

            toast.open();
        }

    }).responseText;

    return result;
}

function SERVER(url) {
    //return 'https://api.protendai.com/' + url +'.php';
    return 'http://localhost:8440/Open_Space/saga/api/' + url + '.php';
    //return 'http://api.southpolenerd.co.zw/' + url + '.php';
}

function check_out() {
    var data = '{"cardCode":"' + localStorage.getItem('cardCode') + '"}';
    app.preloader.show();
    $.ajax({
        url: SERVER('cart/check_out'),
        type: 'POST',
        data: data,
        dataType: 'json',

        async: true,
        complete: function () {
            app.preloader.hide();
        },
        success: function () {
            var toast = app.toast.create({
                text: 'Order Created',
                closeTimeout: 1000
            })

            toast.open();

            getCartCount();

            openRoutePage('/qrcode/');

        },
        error: function () {
            var toast = app.toast.create({
                text: 'Something went wrong',
                closeTimeout: 1000
            })

            toast.open();
        }
    });

}

function signUp() {
    var data = `{"name": "` + $('#_name').val() + `",
                "surname": "`+ $('#_surname').val() + `",
                "email": "`+ $('#_email').val() + `",
                "password": "`+ $('#_password').val() + `",
                "number": "`+ $('#_number').val() + `",
                "cardCode": "TMP003"}`;
    app.preloader.show();
    if ($('#_password').val() == $('#_password_confirm').val()) {
        $.ajax({
            url: SERVER('user/create'),
            type: 'POST',
            data: data,
            dataType: 'json',

            async: true,
            complete: function () {
                app.preloader.hide();
            },
            success: function () {
                var toast = app.toast.create({
                    text: 'User Created',
                    closeTimeout: 1000
                })

                toast.open();

                openRoutePage('/');

            },
            error: function (response) {
                var toast = app.toast.create({
                    text: response.message,
                    closeTimeout: 1000
                })

                toast.open();
            }
        });
    }
    else {
        app.preloader.hide();
        var toast = app.toast.create({
            text: 'passwords do not match',
            closeTimeout: 1000
        })

        toast.open();
    }
}

function randomPassword() {
    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = array(); //remember to declare $pass as an array
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < 8; $i++) {
        $n = rand(0, $alphaLength);
        $pass[$n] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}

function getOrders() {
    var output = '';
    $.ajax({
        url: SERVER('cart/check_out') + '?cardCode=' + localStorage.getItem('cardCode') + '&shop_id=' + localStorage.getItem('shop'),
        type: 'GET',
        dataType: 'json',

        async: true,
        success: function (response) {

            console.log(response)

            $('#prdt_lst').empty();

            $.each(response.records, function (i, field) {

                output = `<li onclick="getProduct(` + field.item_no + `)">
                <a class="item-content item-link popup-open" data-popup=".product-popup">
                    <div class="item-media"><img width="40px" src="`+ field.file_path + `"/></i>
                    </div>
                    <div class="item-inner">
                        <div class="item-title">
                            <h3 class="mb-0 om-home-menu-text">` + field.itemCode + `</h3>
    
                            <p class="small mb-0 text-muted"> itemGroup - `+ field.name + `</p>
                        </div>
    
    
                    </div>
                </a>
            </li>`
                $('#order_lst').append(output);
            });

            console.log(response);

        },

        error: function (response) {

            console.log(response);

        }
    });
}

function passwordReset() {
    $("#button").on("click", function (event) {
        $(this).attr('href', 'mailto:chirume37@gmail.com.com?subject=hello');
    });
}

function readOrders() {
    $('#product_items').empty();
    var output;

    var bg = '';
    var status = '';

    $.ajax({
        url: SERVER('orders/readOrders') + '?shop_id=' + localStorage.getItem('shop'),
        type: 'GET',
        dataType: 'json',
        async: true,
        complete: function () {
            app.preloader.hide();
        },
        success: function (result) {

            console.log(result)

            $.each(result, function (i, field) {

                if (field.admin_approval_status == 1) {
                    bg = "bg-color-success";
                    status = 'approved'
                }

                else if (field.admin_approval_status == 0) {
                    bg = "bg-color-gray";
                    status = 'pending';
                }
                if (field.cardCode == localStorage.getItem('cardCode')) {

                    var _output = `<li id="item_` + field.id + `" onclick="reWriteOrderNumber('` + field.id + `') " class="mb-2 kf-border-0" style="padding-left: 16px !important; padding-right: 16px !important; border-radius: 0; border: 1px solid black;">
                    <div class="row item-content  kf-no-padding min-height-2 kf-border-dotted"
                        id="product_item_`+ field.id + `">
                        <div id="`+ field.id + `" class="col kf-text-bold search-text">
                            `+ field.id + `
                        </div>
                        <div class="col text-right">
                            <span class="social kf-badge `+ bg + ` kf-small search-text">` + status + `</span>
            
                        </div>
                    </div>
                    <div class="row item-content  kf-no-padding min-height-1">
                        <div class="col kf-small">
                             Order Date
                        </div>
            
            
                        <div class="text-right col search-text kf-small">
                        `+ field.created + `
            
                        </div>
            
            
                    </div>
            
                    <div class="row item-content  kf-no-padding min-height-1">
                        <div class="col kf-small">
                            Order Total
            
                        </div>
            
            
                        <div class="text-right col kf-small kf-text-bold">
                        ZWL $1000
            
                        </div>
            
            
                    </div>
                </li>`;

                    $('#order_lst').append(_output);


                }
            });

        },
        error: function (result) {
            var toast = app.toast.create({
                text: result.message,
                closeTimeout: 1000
            })

            //toast.open();
        }

    });

}

function readOrdersPartial() {
    $('#home_items').empty();
    var output;

    var bg = '';
    var status = '';

    $.ajax({
        url: SERVER('orders/readOrders') + '?shop_id=' + localStorage.getItem('shop'),
        type: 'GET',
        dataType: 'json',
        async: true,
        complete: function () {
            app.preloader.hide();
        },
        success: function (result) {

            console.log(result)

            $.each(result.splice(0, 3).reverse(), function (i, field) {

                if (field.admin_approval_status == 1) {
                    bg = "bg-color-success";
                    status = 'approved'
                }

                else if (field.admin_approval_status == 0) {
                    bg = "bg-color-gray";
                    status = 'pending';
                }
                if (field.cardCode == localStorage.getItem('cardCode')) {

                    var _output = `<li id="item_` + field.id + `" onclick="reWriteOrderNumber('` + field.id + `')" class="mb-2 kf-border-0" style="padding-left: 16px !important; padding-right: 16px !important; border-radius: 0; border: 1px solid black;">
                    <div class="row item-content  kf-no-padding min-height-2 kf-border-dotted"
                        id="product_item_`+ field.id + `">
                        <div id="`+ field.id + `" class="col kf-text-bold search-text">
                            `+ field.id + `
                        </div>
                        <div class="col text-right">
                            <span class="social kf-badge `+ bg + ` kf-small search-text">` + status + `</span>
            
                        </div>
                    </div>
                    <div class="row item-content  kf-no-padding min-height-1">
                        <div class="col kf-small">
                             Order Date
                        </div>
            
            
                        <div class="text-right col search-text kf-small">
                        `+ field.created + `
            
                        </div>
            
            
                    </div>
            
                    <div class="row item-content  kf-no-padding min-height-1">
                        <div class="col kf-small">
                            Order Total
            
                        </div>
            
            
                        <div class="text-right col kf-small kf-text-bold">
                        ZWL $1000
            
                        </div>
            
            
                    </div>
                </li>`;

                    if (i < 3) {
                        $('#home_items').append(_output);
                    }


                }
                //return i < 1;
            });

        },
        error: function (result) {
            var toast = app.toast.create({
                text: 'successfully created order',
                closeTimeout: 1000
            })

            //toast.open();
        }

    });

}

function generateOrder() {
    $('#product_items').empty();
    var output;

    var data = `{
                    "shop_id" : "`+ localStorage.getItem('shop') + `",
                    "cardCode" : "`+ localStorage.getItem('cardCode') + `",
                    "itemCode" : "1234567890123",
                    "created" : "2020-11-17 13:12:32"
                }`;

    app.dialog.confirm('Note, this operation will deduct from the supplied account', 'Confirm', function () {
        app.preloader.show();

        $.ajax({
            url: SERVER('orders/create'),
            type: 'POST',
            dataType: 'json',
            data: data,
            async: true,
            complete: function () {
                app.preloader.hide();
            },
            success: function (result) {

                app.preloader.hide();
                var toast = app.toast.create({
                    text: result.message,
                    closeTimeout: 1000
                })

                toast.open();

                localStorage.setItem('orderNumber', result.orderNumber)

                openRoutePage('/qrcode/');

            },
            error: function (result) {
                app.preloader.hide();
                var toast = app.toast.create({
                    text: 'Can`t create order',
                    closeTimeout: 1000
                })

                toast.open();
                console.log(result);
            }

        });
    });

}

function goToPayment() {
    $.ajax({
        url: SERVER('cart/get_count') + '?cardCode=' + localStorage.getItem('cardCode') + '&shop_id=' + localStorage.getItem('shop'),
        type: 'GET',
        dataType: 'json',
        async: true,
        complete: function () {

        },
        success: function (result) {
            if (result.count >= 1) {
                openRoutePage('/payment_form/');
            }
            else {
                app.preloader.hide();
                var toast = app.toast.create({
                    text: 'Cart is empty',
                    closeTimeout: 1000
                })

                toast.open();
            }
        },
        error: function (result) {



        }

    });
}

function selectShop(component) {
    localStorage.setItem('shop', $('#' + component + '').val());
    openRoutePage('/home_page/');
}

function getShops(component) {
    $('#_shop').empty();
    $.ajax({
        url: SERVER('shop/read'),
        type: 'GET',
        dataType: 'json',
        async: true,
        complete: function (result) {
            app.preloader.hide();
        },
        success: function (result) {

            console.log(result.records)
            $.each(result.records, function (i, field) {
                var output = `<option value="` + field.id + `">` + field.name + `</option>`
                $('#' + component + '').append(output);

            })
        },
        error: function (result) {



        }

    });
}

function reWriteOrderNumber(orderNumber) {

    localStorage.setItem('orderNumber', orderNumber);

    openRoutePage('/qrcode/');

}

// GET VERIFICATION CODE //

function getVerificationCode() {
    // var username = $('#username').val();
    var number = $('#r_number').val();

    // if (!username) {
    //     app.dialog.alert("Enter username!", "Required!");
    //     app.preloader.hide();
    //     return;
    // }


    if (!number) {
        app.dialog.alert("Enter Mobile Number!", "Required!");
        app.preloader.hide();
        return;
    }
    app.preloader.show();

    var number = $('#r_number').val();

    var data = `{"number":"` + number + `"}`;

    console.log(SERVER('user/email') + '?number = ' + number);

    $.ajax({

        url: SERVER('user/email'),
        type: 'POST',
        dataType: 'json',
        data: data,
        async: true,
        complete: function () {
            app.preloader.hide();
        },
        success: function (result) {
            console.log(result.message)
        },
        error: function (result) {
            console.log(result.message)
        }

    });
}

function openForgot() {
    $('#forgot').on('click', function () {
        openRoutePage('/pwd/');
    })
}

function getCategories(component) {
    $('#_shop').empty();
    $.ajax({
        url: SERVER('category/getRowCount'),
        type: 'GET',
        dataType: 'json',
        async: true,
        complete: function (result) {
            app.preloader.hide();
        },
        success: function (result) {

            console.log(result);

            $('#' + component + '').html(result.count);


        },
        error: function (result) {
            console.log(result);
            app.preloader.hide();
            var toast = app.toast.create({
                text: result.message,
                closeTimeout: 1000
            })

            toast.open();

        }

    });
}

function getPayments(component) {
    $('#_shop').empty();
    $.ajax({
        url: SERVER('orders/getPayments') + '?shop_id=' + localStorage.getItem('shop') + '&cardCode=' + localStorage.getItem('cardCode'),
        type: 'GET',
        dataType: 'json',
        async: true,
        complete: function (result) {
            app.preloader.hide();
        },
        success: function (result) {

            console.log(result);

            $('#' + component + '').html(result.count);


        },
        error: function (result) {
            console.log(result);
            app.preloader.hide();
            var toast = app.toast.create({
                text: result.message,
                closeTimeout: 1000
            })

            toast.open();

        }

    });
}