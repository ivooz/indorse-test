const mock = require('mock-require');

mock('mailgun-js', './mailgunMock');

const testUtils = require('./testUtils');
const beginRepoRegistrationService = require('../libs/beginRepoRegistrationService');
const assert = require('assert');

const mockUser = {
  email : "emaila@com.com",
  repo : "ivooz/gft_digital_banking_2016"
}

const invalidMockUser = {
  email : "adsvxvx024a./.,.,.,",
  repo : "repo"
}

describe('beginRepoRegistrationService', () => {

  describe('#beginRegistration(email, repoName)', () => {

    it('it should throw an exception when the email is undefined ', async () => {
      testUtils.expectException(() => {
        return beginRepoRegistrationService.beginRegistration(undefined,mockUser.repoName);
      })
    });

    it('it should throw an exception when the repoName is undefined ', async () => {
      testUtils.expectException(() => {
        return beginRepoRegistrationService.beginRegistration(mockUser.repoName,undefined);
      })
    });

    it('it should throw an exception when the email is malformed ', async () => {
      testUtils.expectException(() => {
        return beginRepoRegistrationService.beginRegistratio(invalidMockUser.email,mockUser.repo);
      })
    });

    it('it should throw an exception when the repo name is malformed ', async () => {
      testUtils.expectException(() => {
        return beginRepoRegistrationService.beginRegistration(mockUser.email,invalidMockUser.repo);
      })
    });

    it('it should throw an exception when the repo does not exist ', async () => {
      testUtils.expectException(() => {
        return beginRepoRegistrationService.beginRegistration(mockUser.email,"dafsfxvc/djsefhw");
      })
    });

    it('it should insert user into db when arguments is defined properly ', async () => {
      try {
        await beginRepoRegistrationService.beginRegistration(mockUser.email,mockUser.repo);
      } catch (error) {
        assert.fail("Termination due to exception: " + error);
      }
    });
  });
});
