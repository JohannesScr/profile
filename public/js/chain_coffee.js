let modal = document.getElementById('modal-1');
modal.onwheel = function(event) {
    event.preventDefault();
};
modal.onclick = () => {
    modal.style.display = 'none';
};

function display_modal() {
    modal.style.display = 'block';
    console.log('helo');
    // modal.style.top:
}

function createCORSRequest(method, url) {
    let xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);

    } else if (typeof XDomainRequest !== "undefined") {
        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        // xhr.open(method, url);

    } else {
        // Otherwise, CORS is not supported by the browser.
        xhr = null;

    }
    return xhr;
}

function google_maps_distance() {
    let uri = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=Stellenosch,South+Africa&destinations=Paarl,South+Africa&key=AIzaSyDC8eH6JsjrJBj8a522xxnBjuBGlCYnAb0`;
    // let google_maps_http = new XMLHttpRequest();
    let google_maps_http = createCORSRequest();
    if (!google_maps_http) {
        console.warn('Error: No google_maps_http');
    } else {
        google_maps_http.onreadystatechange = function () {
            console.log('GOOGLE MAPS: ', this.responseText);
            if (this.readyState === 4 && this.status === 200) {
                document.getElementById("demo").innerHTML = this.responseText;
                console.log('GOOGLE MAPS: ', this.responseText);
            }
        };
        google_maps_http.open('GET', uri, false);
        google_maps_http.send();
    }
}

function axios_google_maps_distance() {
    let request_object = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=Stellenosch,South+Africa&destinations=Paarl,South+Africa&key=AIzaSyDC8eH6JsjrJBj8a522xxnBjuBGlCYnAb0`,
        headers: {
            'access-control-allow-credentials': true,
            'access-control-allow-headers': ['Content - Type', 'Authorization'],
            'access-control-allow-methods': ['GET', 'PUT', 'POST', 'DELETE'],
            'access-control-allow-origin': '*'
        }
    };
    axios(request_object)
            .then(data => {
                document.getElementById("demo").innerHTML = data;
                console.log('GOOGLE MAPS: ', data);
            })
            .catch(err => {
                console.warn('Error: GOOGLE MAPS: ', err);
            });
}

function generate_quote() {
    let start_date = document.getElementById('start_date').value;
    let end_date = document.getElementById('end_date').value;
    let start_time = document.getElementById('start_time').value;
    let end_time = document.getElementById('end_time').value;
    let call_out_fee = 2500;
    let hour_rate = 500;
    let after_hour_rate = 500;
    let cup_rate = 10;
    let base_fee = 0;

    // console.log(start_date);
    // console.log(end_date);
    // console.log(start_time);
    // console.log(end_time);

    let err = [];

    if (!start_date) {
        err.push({
            field: 'start date',
            message: 'start date is a required field'
        });
    }
    if (!end_date) {
        err.push({
            field: 'end date',
            message: 'end date is a required field'
        });
    }
    if (!start_time) {
        err.push({
            field: 'start time',
            message: 'start time is a required field'
        });
    }
    if (!end_time) {
        err.push({
            field: 'end time',
            message: 'end time is a required field'
        });
    }

    if (err.length > 0) {
        display_modal();
    } else {
        google_maps_distance();
        // axios_google_maps_distance();
        // WIP google_maps_distance
        console.warn('WIP google_maps_distance');

        let pax = document.getElementById('pax').value;

        let start = new Date(`${start_date}T${start_time}:00.000`);
        let end = new Date(`${end_date}T${end_time}:00.000`);
        let start_hour = Math.floor(start.getHours() + (start.getMinutes()/60));
        let end_hour = Math.ceil(end.getHours() + (end.getMinutes()/60));
        let hours = (end.getTime() - start.getTime())/(1000*60*60);
        let days = end.getDate() - start.getDate();

        console.log('START: ', start);
        console.log('START HOUR: ', start_hour);
        console.log('END: ', end);
        console.log('END HOUR: ', end_hour);

        base_fee = call_out_fee + (cup_rate * pax) + (hour_rate * hours);

        // Finish after 23:00 (after hours)
        if (start_hour >= 23 && end_hour >= 23) {
            console.log('SPECIAL CASE');
        } else if (end_hour >= 23) {
            let after_hours = end_hour - 23;
            console.log('AFTER HOURS: ', after_hours);
            base_fee = base_fee + (after_hours * after_hour_rate);
        }


        let xhr = new XMLHttpRequest();
        // https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyDC8eH6JsjrJBj8a522xxnBjuBGlCYnAb0
        // https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=Stellenosch,South+Africa&destinations=Paarl,South+Africa&key=AIzaSyDC8eH6JsjrJBj8a522xxnBjuBGlCYnAb0

        console.log('DAYS', days);
        console.log('PAX:', pax);
        console.log('HOURS:', hours);
        console.log('START TIME:', start_hour);
        console.log('END TIME:', end_hour);

        document.getElementById('quote_amount').innerText =  `R ${base_fee}`;
    }
}

