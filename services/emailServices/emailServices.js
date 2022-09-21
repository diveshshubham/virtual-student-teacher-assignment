const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRIDKEY);

module.exports = {
    sendEmail:async (messages) => {
          try{
            await  sgMail.send(messages)
            console.log('emails sent successfully!');
          }
          catch(err){
            console.log(err)
          }
    }
}

