const mock = require('mock-require');

const mockUserRepo = {
  email : "email@email.com",
  randomChallenge : "adadadadadadadadad",
  repo : "gft_digital_banking_2016",
  githubUsername : "ivooz"
};

const dbService = require('../libs/dbService');

(async () => {
  await dbService.insertUserRepo(mockUserRepo.email, mockUserRepo.randomChallenge, mockUserRepo.repo, mockUserRepo.githubUsername)
})();

const testUtils = require('./testUtils');
const assert = require('assert');
const matchingGistId = "4d68992900caced3a03f5c1e7fddc247";
const noFileGistId = "89ee7b31a92406cb2ba2c6bb7b0da45e"
const mismatchedOwnerGistId = "d4244f1581d8bd82fcc3fa983ca80622"
const mismatchedContentGistId = "36a1c547300f9a12b62633dff89ecaa9"

const finalizeRepoRegistrationService = require('../libs/finalizeRepoRegistrationService');

describe('finalizeRepoRegistrationService', () => {

  describe('#finalizeRegistration(email, gistId)', () => {

    it('it should throw an exception when the email is undefined', async () => {
      testUtils.expectException(() => {
        return finalizeRepoRegistrationService.finalizeRegistration(undefined,gistId);
      })
    });

    it('it should throw an exception when the gistId is undefined', async () => {
      testUtils.expectException(() => {
        return finalizeRepoRegistrationService.finalizeRegistration(mockUserRepo.email,undefined);
      })
    });


    it('it should throw an exception when the gist is not owned by the user', async () => {
      testUtils.expectException(() => {
        return finalizeRepoRegistrationService.finalizeRegistration(mockUserRepo.email,mismatchedOwnerGistId);
      })
    });

    it('it should throw an exception when the gist content does not equal the random challenge', async () => {
      testUtils.expectException(() => {
        return finalizeRepoRegistrationService.finalizeRegistration(mockUserRepo.email,mismatchedContentGistId);
      })
    });

    it('it should throw an exception when the gist does not contain the required file', async () => {
      testUtils.expectException(() => {
        return finalizeRepoRegistrationService.finalizeRegistration(mockUserRepo.email,noFileGistId);
      })
    });

    it('it should succesfully finish if all data is valid', async () => {
      try {
        await finalizeRepoRegistrationService.finalizeRegistration(mockUserRepo.email,matchingGistId);
      } catch (error) {
        assert.fail("Termination due to exception: " + error);
      }
    });
  });
});
