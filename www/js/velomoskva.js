/**
 * Created by Yura on 04.05.2014.
 */

function fillParkingList()
{
    console.log( "IN fillParkingList" );
    // GET http://api.data.mos.ru/v1/datasets/915/rows?api_key=45e0d8cbfa0cfac2df76c200230b7056?$top=3&$orderby=Number

    // var currentLat = 55.8166345;
    // var currentLon = 37.7191818;

    var currentLat = 0;
    var currentLon = 0;

    var p = getCurrentPostion();
    if(p) {
        currentLat = p.coords.latitude;
        currentLon = p.coords.longitude;        
    }

    var p2Current = new LatLon(currentLat, currentLon);

    // URL веб-сервиса с нужными переметрами
    var serviceUrl = "http://api.data.mos.ru/v1/datasets/916/rows?api_key=45e0d8cbfa0cfac2df76c200230b7056";
    // выполняем запрос
    $.ajax({
        'type': 'GET',
        'url': serviceUrl,
        'dataType': 'json',
        'success': function( response ) {
            console.log( response ); // server response
            console.log (response[0].Cells.NAME);

            //$("#wpuser_name").text(data.Name);

            response.forEach(function(entry) {
                // console.log(entry.Lat);
                // console.log(entry.Lon);
                var p1 = new LatLon(entry.Lat, entry.Lon);
                var distance = p1.distanceTo(p2Current);
                console.log(distance +' km');
                console.log(entry.distance);
                entry.distance = distance;

            });

            function compareDistance(a,b) {
                // console.log(a.distance);
                // console.log(b.distance);
                return a.distance - b.distance;
            }

            response = response.sort(function(a,b) {
                // console.log(a.distance);
                // console.log(b.distance);
                return a.distance - b.distance;
            });

            response.forEach(function(entry) {
                var parkingName = entry.Cells.NAME;
                parkingName = parkingName.replace(/Велосипедная парковка /g, "");
                
                var text = '<li class="table-view-cell"><a href="#"><span class="badge">'+entry.distance
                    +' км</span>' + parkingName + '</a></li>';
                // console.log(text);
                $("#parkingList").append(text);
            });



            // $("#parkingList").append('<li class="table-view-cell"><a href="#"> TEXT </a></li>');
        }
    });    

}

function getCurrentPostion()
{
    // onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    var p;

    var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
        p = position;
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        // alert('code: '    + error.code    + '\n' +
        //       'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    return p;
}