const randomChallengeService = require('../libs/randomChallengeService');
const assert = require('assert');

describe('randomChallengeService', () => {

  describe('#generateRandomString()', () => {

    it('should return a string of length equal to 96 ', async () => {
      try {
        let randomString = await randomChallengeService.generateRandomString()
        assert.equal(96, randomString.length);
      } catch(error) {
        assert.fail("Termination due to exception: " + error)
      }
    });
  })
});
