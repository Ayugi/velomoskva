/**
 * Created by Yura on 04.05.2014.
 */

var test_csv = "21.04.2014;26;33750;Оплата по счету №17 от 09.04.14г.за поисковое продвижение сайта за апрель 2014г. Сумма 33750-00 Без налога (НДС)\
22.04.2014;30;;Комиссия за расчетные операции за 22/04/2014 согласно тарифам Банка.\
22.04.2014;23200;;За услуги рекламы в интернете и поддержки сайта www.injekt-msk.ru по договору № 23 в апреле 2014г. НДС не облагается. Оплата по счету № 116 от 08 апреля 2014 г.\
24.04.2014;13996;;Уплата единого налога УСН за I квартал 2014 г. Без НДС.";


function test_vms()
{
    var parkingList = document.getElementById("parkingList");
    var c = document.createElement("li");
    c.innerHTML = "<a class=\"navigate-right\" href=\"map.html\"><span class=\"badge\">250 м</span>Dyna22!</a>";
    c.className = "table-view-cell";
    parkingList.appendChild(c);
}

function fillParkingList()
{
    // GET http://api.data.mos.ru/v1/datasets/915/rows?api_key=45e0d8cbfa0cfac2df76c200230b7056?$top=3&$orderby=Number
    // GET http://api.data.mos.ru/v1/datasets/915/rows?api_key=45e0d8cbfa0cfac2df76c200230b7056

    try {
        //
        OData.read(
            "http://api.data.mos.ru/v1/datasets/915/rows?api_key=45e0d8cbfa0cfac2df76c200230b7056",
//            "http://services.odata.org/Northwind/Northwind.svc/Categories",
            function (data) {
                 var html = "";
                 //$.each(data.results, function(l) { html += "<div>" + l.CategoryName + "</div>"; });
                 //$(html).appendTo($("#target-element-id"));
            }
        );
        // Вывести результат.

    } catch(e) {
        // Или вывести сообщение об ошибке.
        alert(e.message);
    }
}