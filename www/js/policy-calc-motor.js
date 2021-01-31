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