const config = require('../config/config.js')
const mailgun = require('mailgun-js')({apiKey: config.mailgunApiKey, domain: config.mailgunDomain});

module.exports = (() => {

  return {

    /**
    * sendRegistrationEmail - description
    *
    * @param  {type} email           description
    * @param  {type} githubUsername  description
    * @param  {type} randomChallenge description
    * @return {type}                 description
    */
    sendRegistrationEmail : function sendRegistrationEmail(email, githubUsername, randomChallenge) {
      if(!email) {
        throw new Error("Invalid Argument: email is undefined")
      }
      if(!githubUsername) {
        throw new Error("Invalid Argument: githubUsername is undefined")
      }
      if(!randomChallenge) {
        throw new Error("Invalid Argument: randomChallenge is undefined")
      }
      let data = {
        from: 'Indorse.io <ivo@indorse.io>',
        to: email,
        subject: 'Finalize your indorse.io github repository registration',
        text: 'Please create a gist with your github user ' + githubUsername +
        ' with the following content: ' + randomChallenge +
        '. After you are done please enter the gist ID (last part of the url in your browser) on our website.'
      };

      return new Promise((resolve,reject) => {
        mailgun.messages().send(data, function (error, body) {
          if(error) {
            reject(error)
          } else {
            resolve(body)
          }
        });
      });
    }
  }
})();
