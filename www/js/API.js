function SRV_URL()
{
    return 'https://192.168.43.27:44331/api/';
}

function Post(url, data)
{

   var post = $.ajax({
        url: SRV_URL() + url,
        type: 'POST',
        data: data,
        dataType: 'json',
        contentType: 'json',
        success: function(){},
        error: function(){},
        complete: function(){}
    });

}

function Get(url, data)
{

}