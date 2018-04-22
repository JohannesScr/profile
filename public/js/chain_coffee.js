function generate_quote() {
    let start_date = document.getElementById('start_date').value;
    let end_date = document.getElementById('end_date').value;
    let start_time = document.getElementById('start_time').value;
    let end_time = document.getElementById('end_time').value;
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
        alert('Please fill in required fields');
    } else {
        let start = new Date(`${start_date}T${start_time}}:00.000Z`);
        let end = new Date(`${end_date}T${end_time}}:00.000Z`);
        let pax = document.getElementById('pax').value;

        document.getElementById('quote_amount').innerText =  `R ${(pax * 10)}`;
    }


}