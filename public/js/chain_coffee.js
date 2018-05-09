let modal = document.getElementById('modal-1');
modal.onwheel = function(event) {
    event.preventDefault();
};
modal.onclick = (click_remove=true) => {
    if (click_remove) {
        modal.style.display = 'none';
    }
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

function build_form_urlencoded(data) {
    let keys = Object.keys(data);
    let data_string = '';
    for (let i = 0; i < keys.length; i++) {
        if (typeof data[keys[i]] === 'string') {
            data[keys[i]] = data[keys[i]].replace(/\s/g, '+');
        } else if (typeof data[keys[i]] === 'object') {
            data[keys[i]] = build_form_urlencoded(data[keys[i]]);
        }
        data_string += `${keys[i]}=${data[keys[i]]}`;
        if (i !== keys.length - 1) {
            data_string += '&';
        }
    }
    return data_string;
}

function google_maps_distance(data) {
    // let uri = `http://localhost:3010/test_ajax`;

    return new Promise(resolve => {
        data = build_form_urlencoded(data);
        console.log('GOOGLE MAPS DATA:', data);

        let uri = `/google_maps`;
        let method = 'POST';
        let xhr = new XMLHttpRequest();
        xhr.open(method, uri, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let res = JSON.parse(this.responseText);
                console.log(`Data fetch successfully ${uri}`, res);
                resolve(res);
            }
        };
        xhr.send(data);
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
    input.min_kilometer_thershold = 50;
    input.travel_time = 0;
    input.base_fee = 0;
    input.travel_fee = '-';
    input.pax_fee = 0;
    input.hour_fee = 0;
    input.after_hours_fee = 0;

    // WIP google_maps_distance
    if (input.google_maps_data) {
        input.kilometers = Math.floor(input.google_maps_data.rows[0].elements[0].distance.value / 1000);
        input.travel_time = input.google_maps_data.rows[0].elements[0].duration.text;
    }

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

    input.pax_fee = (input.rate_per_cup * input.pax);
    input.hour_fee = (input.rate_per_hour * input.hours);
    input.total_fee = input.call_out_fee + input.pax_fee + input.hour_fee;

    if (input.kilometers >= input.min_kilometer_thershold) {
        input.travel_fee = (input.rate_per_kilometer * input.kilometers);
        input.total_fee += input.travel_fee;
    }

    // Finish after 23:00 (after hours)
    if (input.start_hour >= 23 && input.end_hour >= 23) {
        console.log('SPECIAL CASE');
    } else if (input.end_hour >= 23) {
        input.after_hours = input.end_hour - 23;
        console.log('AFTER HOURS: ', input.after_hours);
        input.after_hours_fee = (input.after_hours * input.rate_after_hours);
        input.total_fee = input.total_fee + input.after_hours_fee;
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
        ['pax', quote_variables.rate_per_cup, quote_variables.pax, quote_variables.pax_fee],
        ['hours', quote_variables.rate_per_hour, quote_variables.hours, quote_variables.hour_fee],
        ['after hours', quote_variables.rate_after_hours, quote_variables.after_hours, quote_variables.after_hours_fee],
        ['travelling fee', quote_variables.rate_per_kilometer, quote_variables.kilometers, quote_variables.travel_fee],
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
            cell1.innerHTML = quote_detail[i][1] > 0 ? `R ${quote_detail[i][1]}` : '-';
        } else {
            cell1.innerHTML = quote_detail[i][1];
        }
        cell1.classList.add('td-price-unit');

        cell2.innerHTML = quote_detail[i][2];
        cell2.classList.add('td-unit');

        if (typeof quote_detail[i][3] === 'number') {
            cell3.innerHTML = quote_detail[i][3] > 0 ? `R ${quote_detail[i][3]}`: '-';
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
    let venue = document.getElementById('venue').value.trim();
    let city = document.getElementById('city').value.trim();
    let province = document.getElementById('province').value.trim();

    let quote_variables = {
        start_date,
        end_date,
        start_time,
        end_time,
        pax,
        venue,
        city,
        province
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
    if (new Date(quote_variables.start_date) > new Date(quote_variables.end_date)) {
        err.push({
            field: 'invalid timeline',
            message: 'end date cannot be before the start date'
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
    if (quote_variables.start_date === quote_variables.end_date) {
        if (quote_variables.start_time > quote_variables.end_time) {
            err.push({
                field: 'invalid timeline',
                message: 'end time cannot be before the start time'
            });
        }
    }
    if (!quote_variables.city || quote_variables.city.length === 0) {
        err.push({
            field: 'city/town',
            message: 'city/town is a required field'
        });
    }
    if (!quote_variables.province || quote_variables.province.length === 0) {
        err.push({
            field: 'province',
            message: 'province is a required field'
        });
    } else {
        quote_variables.province = quote_variables.province.replace(/_/g, '+');
    }


    if (err.length > 0) {
        display_modal({
            header: 'Validation',
            message: 'Form incomplete',
            list: err
        });
    } else {

        let google_maps_data = {
            city,
            province
        };

        if (quote_variables.venue && quote_variables.venue.length !== 0) {
            google_maps_data.venue = venue.trim();
        }

        let quote = calculate_quote(quote_variables);
        let quote_detail = build_detail(quote);

        show_cost_breakdown(quote_detail);

        google_maps_distance(google_maps_data)
                .then(data => {
                    quote_variables.google_maps_data = data.data;
                    console.log('GOOGLE MAPS:', quote_variables.google_maps_data);

                    let quote = calculate_quote(quote_variables);
                    let quote_detail = build_detail(quote);

                    show_cost_breakdown(quote_detail);
                })
                .catch(data => {
                    quote_variables.google_maps_data = data;
                    console.warn('GOOGLE MAPS DATA:', quote_variables.google_maps_data);

                    let quote = calculate_quote(quote_variables);
                    let quote_detail = build_detail(quote);

                    show_cost_breakdown(quote_detail);
                });
    }
}

function toggle_contact_form() {
    document.getElementById('web_mail').classList.toggle('hide-block');
    document.getElementById('web_mail_btn').classList.toggle('contact-active');
    document.getElementById('e_mail').classList.toggle('hide-block');
    document.getElementById('e_mail_btn').classList.toggle('contact-active');
    window.scrollTo(0,document.body.scrollHeight);
}

function send_email() {
    let info = {
        header: 'Coming soon',
        message: 'This feature will soon be available.'
    };
    display_modal(info);
}

