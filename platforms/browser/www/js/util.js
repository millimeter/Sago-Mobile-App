function scanBarcode() {
    // cordova.plugins.barcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com", function(success) {
    //     alert("encode success: " + success);
    //   }, function(fail) {
    //     alert("encoding failed: " + fail);
    //   }
    // );

    cordova.plugins.barcodeScanner.scan(
        function (result) {
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

function getProduct(productID) {
    var name;
    $.getJSON('js/data/json/products.json', {}, function (data) {
        var result = data;

        $.each(result, function (i, field) {

            if (field.item_no == productID) {
                app.dialog.confirm("Do you want to add to cart?", field.name, function () {

                    // add popup class //



                    var dynamicPopup = app.popup.create({
                        content: `    <div class="popup car-popup">
                       <div class="page">
                           <div class="navbar om-gradient">
                               <div class="navbar-inner">
                                   <div class="title">Product Details</div>
                                   <div class="right"><a href="#" class="link popup-close"><i class="material-icons">close</i></a>
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
                                                           placeholder="item name" value="`+ field.name +`" required readonly>
                                                       <span class="input-clear-button"></span>
                                                   </div>
                                               </div>
                                           </li>
                                           <li class="item-content item-input om-no-border">
                                               <div class="item-inner pt-1 pb-1">
                                                   <div class="item-title item-floating-label"></div>
               
                                                   <div class="item-input-wrap">
                                                       <input id="motor_qoute_vehicle_model" type="text"
                                                           name="motor_qoute_vehicle_model" placeholder="Vehicle model" value="category - `+ field.category +`" required readonly>
                                                       <span class="input-clear-button"></span>
                                                   </div>
                                               </div>
                                           </li>
                                           <li class="item-content item-input om-no-border">
                                               <div class="item-inner pt-1 pb-1">
                                                   <div class="item-title item-floating-label"></div>
                                                   <div class="item-input-wrap">
                                                       <input id="motor_qoute_vehicle_reg" type="text" name="motor_qoute_vehicle_reg"
                                                           placeholder="Expiry Date" value="expires - `+ field.created_at +`" required readonly>
                                                       <span class="input-clear-button"></span>
                                                   </div>
                                               </div>
                                           </li>
                                           <li class="item-content item-input om-no-border">
                                               <div class="item-inner pt-1 pb-1">
                                                   <div class="item-title item-floating-label"></div>
               
                                                   <div class="item-input-wrap">
                                                       <input id="motor_quote_vehicle_sum_assured" type="number"
                                                           name="motor_quote_vehicle_sum_assured" placeholder="Item Value" value="`+ field.wholesale_zwl +`" required readonly>
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
                                                       <button onclick="addToCart('`+ field.item_no +`','`+ field.name +`','itemCount')" class="col button button-big button-raised popup-close"
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

                })

            }
        })
    });

    return name;
}

function getProducts() {

    console.log("doing it");

    var output = '';

    $.getJSON('js/data/json/products.json', {}, function (data) {
        var result = data;
        $('#prdt_lst').empty();

        $.each(result, function (i, field) {

            output = `<li>
            <a class="item-content item-link">
                <div class="item-media"><i class="icon material-icons icon-3x">help</i></i>
                </div>
                <div class="item-inner">
                    <div class="item-title">
                        <h3 class="mb-0 om-home-menu-text">` + field.name + `</h3>

                        <p class="small mb-0 text-muted"> itemGroup - `+ field.category + `</p>
                    </div>


                </div>
            </a>
        </li>`
            $('#prdt_lst').append(output);
        });
        console.log(result);

    });





}

function addToCart(item_no, description, quantity) {

    var jsonOBJ = [];

    var cart = `[{"id":"1",
            "items":[
                {


                },
                {
                    'id': 3,
                    'item_no': '6007652000055',
                    'description': 'Belgian Vac Pack 500g',
                    'quantity': 7,
                    'price': 217.00
                }            
            ]
        }
    ]`;

    var result = JSON.parse(localStorage.getItem('savedCart'));
    result[0].items.push({
        "id": 1,
        "item_no":  item_no,
        "description": description,
        "quantity": $('#' + quantity + '').val(),
        'price': 217.00
    })
    //localStorage.setItem('savedCart', cart);
    localStorage.setItem('savedCart', JSON.stringify(result));

    console.log(localStorage.getItem('savedCart'));
}

function getCart()
{
    var output;

    console.log(JSON.parse(localStorage.getItem('savedCart')))

    
    // $.getJSON('js/data/json/cart.json',{}, function(data){
        $('#cartSummary').empty();
        var result = JSON.parse(localStorage.getItem('savedCart'));
        $.each(result[0].items, function(i, field){
            output = `                    <div id="cart_item_` + (i + 1) + `" class="p-1 items row item-content min-height-1 kf-border-top-solid" style="padding-right: 16px !important;">
            <div class = "col color-om-light-gray" style="width: 55% !important; padding-right: 16px !important;">
            ` + field.description + `
            </div>
            <input class="text-right" id="cart_code_`+ (i + 1) + `" type="hidden" value="` + field.item_no + `"/>

            
            <input class="col text-right color-om-light-gray" style="width: 15% !important; vertical-align: top !important;" id="cart_quantity_`+ (i + 1) + `" oninput="calculateOrderTotal(); resetInput('cart_quantity_` + (i + 1) + `'); editCartValues('` + (i + 1) + `')" placeholder="0" type="number" value="` + field.quantity + `"/>

           
            <div id="cart_price_`+ (i + 1) + `" class="color-om-light-gray col text-right" style="width: 20% !important; vertical-align: text-top !important;">
                
            `+ field.price +`
            </div>

            <i style="width: 10% !important;" onclick="removeCartItem(` + field.id + `)" class="text-right col color-red icon material-icons md-only">delete</i>


            <input class="text-right kf-small" id="cart_subtotal_`+ (i + 1) + `" onchage="" type="hidden" value="` + parseFloat(field.quantity * parseFloat(field.retail_zwl).toFixed(2)).toFixed(2) + `"/>
            <input class="text-right kf-small" id="cart_price_raw_`+ (i + 1) + `" onchage="" type="hidden" value="` + parseFloat(field.retail_zwl).toFixed(2) + `"/>
            

            
            
        </div>`

            $('#cartSummary').append(output);
        })
    // });
}

function processOrder() {
    cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com", function(success) {
        alert("encode success: " + success);
      }, function(fail) {
        alert("encoding failed: " + fail);
      }
    );
}