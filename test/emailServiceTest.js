const mock = require('mock-require');

mock('mailgun-js', 'mailgunMock');

const emailService = require('../libs/emailService');
const testUtils = require('./testUtils');
const assert = require('assert');

const mockEmail = {
  email : "fake-email@gmail.com",
  githubUsername : "adadadadadadadadad",
  randomChallenge : "4d68992900caced3a03f5c1e7fddc247"
}

describe('emailService', () => {

  describe('#sendRegistrationEmail(email, githubUsername, randomChallenge)', () => {

    it('it should throw an exception when the email is undefined ', async () => {
      testUtils.expectException(() => {
        return emailService.sendRegistrationEmail(undefined,mockEmail.githubUsername,mockEmail.randomChallenge);
      })
    });
    
    it('it should throw an exception when the githubUsername is undefined ', async () => {
      testUtils.expectException(() => {
        return emailService.sendRegistrationEmail(mockEmail.email,undefined,mockEmail.randomChallenge);
      })
    });

    it('it should throw an exception when the randomChallenge is undefined ', async () => {
      testUtils.expectException(() => {
        return emailService.sendRegistrationEmail(mockEmail.email,mockEmail.githubUsername,undefined);
      })
    });

    it('it should send an email ', async () => {
      try {
        let result = await emailService.sendRegistrationEmail(mockEmail.email,mockEmail.githubUsername,mockEmail.randomChallenge);
        console.log(JSON.stringify(result));
      } catch (error) {
        assert.fail("Termination due to exception: " + error);
      }
    });
  });
});
