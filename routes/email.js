const {send_email} = require('./../includes/email');

const contact_email = (req, res) => {
    /** contact_email - send contact email with information
     *
     */
    console.time('contact_email');
    if (!req.body.email) {
        req.result.errors.push({
            error_type: 'required field',
            field: 'email',
            message: 'email is a required field'
        });
    }
    if (!req.body.subject) {
        req.result.errors.push({
            error_type: 'required field',
            field: 'subject',
            message: 'subject is a required field'
        });
    }
    if (!req.body.message) {
        req.result.errors.push({
            error_type: 'required field',
            field: 'message',
            message: 'message is a required field'
        });
    }
    if (!req.body.contact_number) {
        req.result.errors.push({
            error_type: 'required field',
            field: 'contact_number',
            message: 'contact_number is a required field'
        });
    }
    if (req.result.errors.length > 0) {
        req.result.http_code = 400;
        req.result.message = 'Bad request: Validation failed';
        console.timeEnd('contact_email');
        console.log('<### contact_email validation failed');
        return res.status(req.result.http_code).send(req.result);
    }

    let message = `Contact number: ${req.body.contact_number}\n\n${req.body.message}`;

    send_email('info@chaincoffee.com', req.body.email, req.body.subject, message, message)
            .then(data => {
                console.log('send_email email sent successfully:', data);
                req.result.message = 'Email sent successfully';

                console.timeEnd();
                console.log('<### send_email successful');
                res.send(req.result);
            })
            .catch(err => {
                err.function_path = __dirname + '/send_email';
                console.warn('Error: /send_email:', err);

                req.result.http_code = 500;
                req.result.message = 'Unable to send email';
                req.result.errors.push(err);

                console.timeEnd();
                console.log('<### send_email error');
                res.status(req.result.http_code).send(req.result);
            });

};

module.exports = {
    contact_email
};