const GitHubApi = require("github");
const repoService = require('../libs/repoService')(new GitHubApi());
const assert = require('assert');

const existingRepo = {
  owner : "ivooz",
  name : "gft_digital_banking_2016"
}

async function expectGetRepoException(owner,repoId) {
  try {
    let gist = await repoService.getRepo(owner,repoId)
    assert.fail(gist, "Expected termination due to exception");
  } catch (error) {
  }
}

describe('repoService', () => {

  describe('#init(githubApi)', () => {
    
    it('it should throw an exception when the githubApi is undefined ', () => {
      try {
        require('../libs/repoService')();
        assert.fail(gist, "Expected termination due to exception");
      } catch (error) {
      }
    });
  });

  describe('#getRepo(owner,repoId)', () => {

    it('it should throw an exception when the repoId is undefined ', () => {
      expectGetRepoException(existingRepo.owner);
    });

    it('it should throw an exception when the repo owner is undefined ', () => {
      expectGetRepoException(undefined, existingRepo.name);
    });

    it('it should throw an exception when the repo does not exist', () => {
      expectGetRepoException(existingRepo.owner, "dadapfjsfjsdnzmxnckajhd")
    });

    it('it should return a repo where a valid ID is given', async () => {
      try {
        let repo = await repoService.getRepo(existingRepo.owner, existingRepo.name);
        assert.equal(existingRepo.name,repo.data.name);
        assert.equal(existingRepo.owner,repo.data.owner.login);
      } catch (error) {
        assert.fail("Termination due to exception: " + error);
      }
    });
  });
})
