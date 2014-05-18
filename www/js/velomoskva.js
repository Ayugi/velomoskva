/**
 * Created by Yura on 04.05.2014.
 */

// Globals

var curPos;
curPos = 0;

const PARKINGS_LIMIT = 20;


function showMap(parkName, parkPosLat, parkPosLon)
{
    $('#mapContent').show();
    $('#backButton').show();

    $('#pageTitle').html(parkName);

    $('#parkingListContent').hide();

    // Also works with: var yourStartLatLng = '59.3426606750, 18.0736160278';
//    var yourStartLatLng = new google.maps.LatLng(55.8166345, 37.7191818);

    $('#map_canvas').gmap('clear', 'markers');

    var clientPosition = new google.maps.LatLng(curPos.coords.latitude, curPos.coords.longitude);
    var parkPosition = new google.maps.LatLng(parkPosLat, parkPosLon);

    $('#map_canvas').gmap({'zoom': 15, 'center': clientPosition});

    $('#map_canvas').gmap('addMarker', {
        'position': clientPosition,
        'bounds': false,
        'icon': "img/mb.png",
        bounds: true

    });

    $('#map_canvas').gmap('addMarker', {'position': parkPosition, 'bounds': true});

//    $('#map_canvas').gmap('addMarker', {'position': '55.8166345, 37.7191818', 'bounds': false});
    // $('#map_canvas').gmap('option', 'zoom', 8);

//    console.log(curPos.coords.latitude);
//    console.log(curPos.coords.longitude);




//    $('#map_controls').gMap('centerAt', {
//        latitude: position.coords.latitude,
//        longitude: position.coords.longitude,
//        zoom: 8
//    });
}

function showParkingList()
{
    $('#mapContent').hide();
    $('#pageTitle').html("Велопарковки");
    $('#backButton').hide();
    $('#parkingListContent').show();
}

function fillHtmlList(parks, curPosition)
{
//    console.log(parks);
    if(curPosition) {
        parks.forEach(function(entry) {
            // console.log(entry.Lat);
            // console.log(entry.Lon);
            var p1 = new LatLon(entry.Lat, entry.Lon);
            var distance = p1.distanceTo(curPosition);
//            console.log(distance +' km');
//            console.log(entry.distance);
            entry.distance = distance;
            entry.pos = p1;
        });

        function compareDistance(a,b) {
            // console.log(a.distance);
            // console.log(b.distance);
            return a.distance - b.distance;
        }

        parks = parks.sort(function(a,b) {
            // console.log(a.distance);
            // console.log(b.distance);
            return a.distance - b.distance;
        });

        var limit = PARKINGS_LIMIT;
        if(limit > parks.length) limit = parks.length;
        for (var i = 0; i < PARKINGS_LIMIT; i++) {
            var parkingName = parks[i].Cells.NAME;

            parkingName = parkingName.replace(/Велосипедная парковка /g, "");
            parkingName = parkingName.replace(/\"/g, "");
            parkingName = parkingName.replace(/№\d{5}/g, "");


            var text = '<li class="table-view-cell"><a class="navigate-right" href="#" onClick="showMap('
                + "'" + parkingName + "'," + parks[i].pos.lat + ',' + parks[i].pos.lon + ');"><span class="badge">'
                + parks[i].distance +' км</span>' + parkingName + '</a></li>';
            // console.log(text);
            $("#parkingList").append(text);
        }
/*
        parks.forEach(function(entry) {
            var parkingName = entry.Cells.NAME;
            parkingName = parkingName.replace(/Велосипедная парковка /g, "");

            var text = '<li class="table-view-cell"><a class="navigate-right" href="#" onClick="showMap();"><span class="badge">'+entry.distance
                +' км</span>' + parkingName + '</a></li>';
            // console.log(text);
            $("#parkingList").append(text);
        });
*/

    } else {
       // fill without distance
        parks.forEach(function(entry) {
            var parkingName = entry.Cells.NAME;
            parkingName = parkingName.replace(/Велосипедная парковка /g, "");
            var text = '<li class="table-view-cell"><a class="navigate-right" onClick="showMap('
                + parkingName + ',' + '0, 0);">' + parkingName + '</a></li>';
            // console.log(text);
            $("#parkingList").append(text);
        });
    }
}

function fillParkingList()
{
    console.log( "IN fillParkingList" );

    var parkings;

    // 1. get parking list
    //
    // URL веб-сервиса портала Открытых данных Москвы с нужными переметрами
    var serviceUrl = "http://api.data.mos.ru/v1/datasets/916/rows?api_key=45e0d8cbfa0cfac2df76c200230b7056";
    // выполняем запрос
    $.ajax({
        'type': 'GET',
        'url': serviceUrl,
        'dataType': 'json',
        'success': function( response ) {
//            console.log( response ); // server response
            //console.log (response[0].Cells.NAME);
            //$("#wpuser_name").text(data.Name);
            parkings = response;
            // copy response
//            parkings =  JSON.stringify(response);
//            parkings =  JSON.parse(parkings);

            // 2. get current pos
            // 2. if got current postion calculate distance and fill list with it
            // 2.1 otherwise fill list without distance
            //
            // var currentLat = 55.8166345;
            // var currentLon = 37.7191818;
            var currentLat = 0;
            var currentLon = 0;

            var onSuccess = function(position) {
/*
                alert('Latitude: '          + position.coords.latitude          + '\n' +
                    'Longitude: '         + position.coords.longitude         + '\n' +
                    'Altitude: '          + position.coords.altitude          + '\n' +
                    'Accuracy: '          + position.coords.accuracy          + '\n' +
                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                    'Heading: '           + position.coords.heading           + '\n' +
                    'Speed: '             + position.coords.speed             + '\n' +
                    'Timestamp: '         + position.timestamp                + '\n');
*/
                curPos = position;
                currentLat = curPos.coords.latitude;
                currentLon = curPos.coords.longitude;
                var p2Current = new LatLon(currentLat, currentLon);
                fillHtmlList(parkings, p2Current);
            };

            // onError Callback receives a PositionError object
            //
            function onError(error) {
                // alert('code: '    + error.code    + '\n' +
                //       'message: ' + error.message + '\n');
                fillHtmlList(parkings, 0);
            }

            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
    }); // $.ajax ends




    // $("#parkingList").append('<li class="table-view-cell"><a href="#"> TEXT </a></li>');


}

