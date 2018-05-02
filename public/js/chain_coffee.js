let modal = document.getElementById('modal-1');
modal.onwheel = function(event) {
    event.preventDefault();
};
modal.onclick = () => {
    modal.style.display = 'none';
};

function display_modal(data) {
    console.warn('>> show modal-1');
    modal.style.display = 'block';
    document.getElementById('modal-1-header').innerText = data.header;
    document.getElementById('modal-1-message').innerText = data.message;

    let list = '';
    for (let i = 0; i < data.list.length; i++) {
        list += `<li><strong>${data.list[i].field}</strong>: ${data.list[i].message}</li>`;
    }
    document.getElementById('modal-1-list').innerHTML = list;
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

function calculate_quote(input) {
    input.call_out_fee = 2500;
    input.after_hours = 0;
    input.rate_per_hour = 500;
    input.rate_after_hours = 500;
    input.rate_per_cup = 10;
    input.rate_per_kilometer = 3;
    input.kilometers = 0;
    input.base_fee = 0;

    // google_maps_distance();
    // axios_google_maps_distance();
    // WIP google_maps_distance
    console.warn('WIP google_maps_distance');

    input.start = new Date(`${input.start_date}T${input.start_time}:00.000`);
    input.end = new Date(`${input.end_date}T${input.end_time}:00.000`);
    input.start_hour = Math.floor(input.start.getHours() + (input.start.getMinutes()/60));
    input.end_hour = Math.ceil(input.end.getHours() + (input.end.getMinutes()/60));
    input.hours = Math.ceil((input.end.getTime() - input.start.getTime())/(1000*60*60));
    input.days = input.end.getDate() - input.start.getDate();

    console.log('START: ', input.start);
    console.log('START HOUR: ', input.start_hour);
    console.log('END: ', input.end);
    console.log('END HOUR: ', input.end_hour);

    input.total_fee = input.call_out_fee + (input.rate_per_cup * input.pax) + (input.rate_per_hour * input.hours);

    // Finish after 23:00 (after hours)
    if (input.start_hour >= 23 && input.end_hour >= 23) {
        console.log('SPECIAL CASE');
    } else if (input.end_hour >= 23) {
        input.after_hours = input.end_hour - 23;
        console.log('AFTER HOURS: ', input.after_hours);
        input.total_fee = input.total_fee + (input.after_hours * input.rate_after_hours);
    }

    console.log('DAYS', input.days);
    console.log('PAX:', input.pax);
    console.log('HOURS:', input.hours);
    console.log('START TIME:', input.start_hour);
    console.log('END TIME:', input.end_hour);

    delete input.start_hour;
    delete input.end_hour;
    delete input.days;

    return input;
}

function build_detail(quote_variables) {

     return [
        // ['start', '', '', (quote_variables.start_date + ' ' + quote_variables.start_time)],
        // ['end', '', '', (quote_variables.end_date + ' ' + quote_variables.end_time)],
        ['call out fee', quote_variables.call_out_fee, 1, quote_variables.call_out_fee],
        ['pax', quote_variables.rate_per_cup, quote_variables.pax, (quote_variables.rate_per_cup * quote_variables.pax)],
        ['hours', quote_variables.rate_per_hour, quote_variables.hours, (quote_variables.rate_per_hour * quote_variables.hours)],
        ['after hours', quote_variables.rate_after_hours, quote_variables.after_hours, (quote_variables.rate_after_hours * quote_variables.after_hours)],
        ['travelling fee', quote_variables.rate_per_kilometer, quote_variables.kilometers, (quote_variables.rate_per_kilometer * quote_variables.kilometers)],
        ['total', '', '', quote_variables.total_fee]
    ];
}

function show_cost_breakdown(quote_detail) {
    let cost_breakdown = document.getElementById('cost_breakdown');

    document.getElementById('quote_breakdown').style.display = 'block';
    document.getElementById('quote_detail_breakdown').setAttribute('open', '');
    // clear table
    cost_breakdown.innerHTML = '';

    for (let i = 0; i < quote_detail.length; i++) {
        let row = cost_breakdown.insertRow(i);
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        let cell3 = row.insertCell(3);

        cell0.innerHTML = quote_detail[i][0];
        cell0.classList.add('td-description');

        if (typeof quote_detail[i][1] === 'number') {
            cell1.innerHTML = quote_detail[i][1] > 0 ? `R ${quote_detail[i][1]}` : '';
        } else {
            cell1.innerHTML = quote_detail[i][1];
        }
        cell1.classList.add('td-price-unit');

        cell2.innerHTML = quote_detail[i][2];
        cell2.classList.add('td-unit');

        if (typeof quote_detail[i][1] === 'number') {
            cell3.innerHTML = quote_detail[i][3] > 0 ? `R ${quote_detail[i][3]}`: '';
        } else {
            cell3.innerHTML = quote_detail[i][3];
        }
        cell3.classList.add('td-price');
    }
}

function generate_quote() {
    let start_date = document.getElementById('start_date').value;
    let end_date = document.getElementById('end_date').value;
    let start_time = document.getElementById('start_time').value;
    let end_time = document.getElementById('end_time').value;
    let pax = document.getElementById('pax').value;

    let quote_variables = {
        start_date,
        end_date,
        start_time,
        end_time,
        pax
    };

    let err = [];

    if (!quote_variables.start_date) {
        err.push({
            field: 'start date',
            message: 'start date is a required field'
        });
    }
    if (!quote_variables.end_date) {
        err.push({
            field: 'end date',
            message: 'end date is a required field'
        });
    }
    if (!quote_variables.start_time) {
        err.push({
            field: 'start time',
            message: 'start time is a required field'
        });
    }
    if (!quote_variables.end_time) {
        err.push({
            field: 'end time',
            message: 'end time is a required field'
        });
    }

    if (err.length > 0) {
        display_modal({
            header: 'Validation',
            message: 'Form incomplete',
            list: err
        });
    } else {
        let quote = calculate_quote(quote_variables);
        let quote_detail = build_detail(quote);

        // document.getElementById('quote_block').style.display = 'block';
        // document.getElementById('quote_amount').innerText =  `R ${quote.total_fee}`;

        show_cost_breakdown(quote_detail);
    }
}

