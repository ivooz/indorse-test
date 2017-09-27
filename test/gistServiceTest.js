const GitHubApi = require("github");
const gistService = require('../libs/gistService')(new GitHubApi());
const assert = require('assert');

const existingGist = {
  file : "gistfile1.txt",
  content : "adadadadadadadadad",
  id : "4d68992900caced3a03f5c1e7fddc247"
}

async function expectGetGistException(gistId) {
  try {
    let gist = await gistService.getGist(gistId);
    assert.fail(gist, "Expected termination due to exception");
  } catch (error) {
  }
}

describe('gistService', () => {

  describe('#init(githubApi)', () => {

    it('it should throw an exception when the githubApi is undefined ', () => {
      try {
        require('../libs/gistService')();
        assert.fail(gist, "Expected termination due to exception");
      } catch (error) {
      }
    });

    describe('#getGist(gistId)', () => {

      it('it should throw an exception when the gistId is undefined ', () => {
        expectGetGistException();
      });

      it('it should throw an exception when the gist does not exist', () => {
        expectGetGistException("abc");
      });

      it('it should return a gist where a valid ID is given', async () => {
        let gist = await gistService.getGist(existingGist.id);
        assert.equal(existingGist.content,gist.data.files[existingGist.file].content);
      });
    });
  });
});
