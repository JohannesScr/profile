const sgMail = require('@sendgrid/mail');

const send_email = (to, from, subject, text, html) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to,
        from,
        subject,
        text,
        html,
    };
    return new Promise((resolve, reject) => {
        sgMail.send(msg)
                .then(data => {
                    console.log('SendGrid email sent successfully');
                    resolve(data);
                })
                .catch(err => {
                    console.warn('Error: SendGrid email error:', err);
                    reject(err);
                });
    });
};

module.exports = {
    send_email
};