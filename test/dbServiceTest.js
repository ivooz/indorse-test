const dbService = require('../libs/dbService');
const assert = require('assert');
const testUtils = require('./testUtils');

const mockUser = {
  email : "email4@com.com",
  randomChallenge : "abc",
  repo : "repo",
  githubUsername : "user"
}

const mockUser2 = {
  email : "email2@com.com",
  randomChallenge : "abc",
  repo : "repo",
  githubUsername : "user"
}

describe('dbService', () => {

  describe('#insertUserRepo(userEmail, randomChallenge, repo, githubUsername)', () => {

    it('it should throw an exception when the email is undefined', async () => {
      testUtils.expectException(() => {
        return dbService.insertUserRepo(undefined,mockUser.randomChallenge,mockUser.repo,mockUser.githubUsername);
      })
    });

    it('it should throw an exception when the randomChallenge is undefined', async () => {
      testUtils.expectException(() => {
        return dbService.insertUserRepo(mockUser.email,undefined,mockUser.repo,mockUser.githubUsername);
      })
    });

    it('it should throw an exception when the repo is undefined', async () => {
      testUtils.expectException(() => {
        return dbService.insertUserRepo(mockUser.email,mockUser.randomChallenge,undefined,mockUser.githubUsername);
      })
    });

    it('it should throw an exception when the githubUsername is undefined', async () => {
      testUtils.expectException(() => {
        return dbService.insertUserRepo(mockUser.email,mockUser.randomChallenge,mockUser.repo,undefined);
      })
    });

    it('it should insert user into db when user is defined properly', async () => {
      try {
        await dbService.insertUserRepo(mockUser.email,mockUser.randomChallenge,mockUser.repo,mockUser.githubUsername);
        let userRepoInDb = await dbService.getUserRepo(mockUser.email)
      } catch (error) {
        assert.fail("Termination due to exception: " + error);
      }
    });

    it('it should throw exception when trying to insert a duplicate user', async () => {
      testUtils.expectException(() => {
        return dbService.insertUserRepo(mockUser.email,mockUser.randomChallenge,mockUser.repo,mockUser.githubUsername);
      })
    });
  });

  describe('#getUserRepo(userEmail)', () => {

    it('it should throw an exception when the email is undefined', async () => {
      testUtils.expectException(() => {
        return dbService.getUserRepo();
      })
    });
    
    it('it should throw an exception when the user repo does not exist ', async () => {
      testUtils.expectException(() => {
        return dbService.getUserRepo("test");
      })
    });

    it('it retrieve the user repo if it exists', async () => {
      try {
        await dbService.insertUserRepo(mockUser2.email,mockUser2.randomChallenge,mockUser2.repo,mockUser2.githubUsername);
        let userRepoFromDb = await dbService.getUserRepo(mockUser2.email);
        assert.equal(mockUser2.email,userRepoFromDb.email)
        assert.equal(mockUser2.randomChallenge,userRepoFromDb.randomChallenge)
        assert.equal(mockUser2.repo,userRepoFromDb.repo)
        assert.equal(mockUser2.githubUsername,userRepoFromDb.githubUsername)
      } catch (error) {
        assert.fail("Termination due to exception: " + error);
      }
    });
  });

});
