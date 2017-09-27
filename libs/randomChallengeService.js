const crypto = require('crypto');
const {promisify} = require('util');
const randomBytesAsync = promisify(crypto.randomBytes);
const BUFFER_SIZE = 48

module.exports = (() => {

  return {

    /**
    * generateRandomString - TODO
    *
    * @return {type}  description
    */
    generateRandomString : async function generateRandomString() {
      try {
        let buffer = await randomBytesAsync(BUFFER_SIZE)
        return buffer.toString('hex');
      } catch(error) {
        throw new Error("Unable to generate a random challenge: " + error.message);
      }
    }
  }
})();
