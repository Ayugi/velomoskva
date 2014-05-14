/**
 * Created by Yura on 04.05.2014.
 */

function test_vms()
{
    var parkingList = document.getElementById("parkingList");
    var c = document.createElement("li");
    c.innerHTML = "<a class=\"navigate-right\" href=\"map.html\"><span class=\"badge\">250 м</span>Dyna22!</a>";
    c.className = "table-view-cell";
    parkingList.appendChild(c);
}

/*function apiCallSuccess (data){
    // Вывести результат.
    console.log( data ); // server response
}

function apiCallFailure(error){
    alert(['apiCallFailure', error]);
    $.each(error, function(el){
        alert(['key', el, 'value', error[el]]);
    })

}*/

function fillParkingList()
{
    console.log( "IN fillParkingList" );
    // GET http://api.data.mos.ru/v1/datasets/915/rows?api_key=45e0d8cbfa0cfac2df76c200230b7056?$top=3&$orderby=Number

    // URL веб-сервиса с нужными переметрами
    var serviceUrl = "http://api.data.mos.ru/v1/datasets/916/rows?api_key=45e0d8cbfa0cfac2df76c200230b7056";
    // выполняем запрос
    $.ajax({
        'type': 'GET',
        'url': serviceUrl,
        'dataType': 'json',
        'success': function( response ) {
            // console.log( response ); // server response
            console.log (response[0].Cells.NAME);

            //$("#wpuser_name").text(data.Name);

            response.forEach(function(entry) {
                var text = '<li class="table-view-cell"><a href="#">' + entry.Cells.NAME + '</a></li>';
                console.log(text);
                $("#parkingList").append(text);
            });

            // $("#parkingList").append('<li class="table-view-cell"><a href="#"> TEXT </a></li>');
        }
    });    

}
