const {promisify} = require('util');

module.exports = function init(githubApi) {

  if(!githubApi) {
    throw new Error("Failed to initialize module: githubApi is undefined")
  }

  const getGistsPromise = promisify(githubApi.gists.get);

  return {

    /**
     * getGist - TODO
     *
     * @param  {type} gistId description
     * @return {type}        description
     */
    getGist : async function getGist(gistId) {
      if(!gistId) {
        throw new Error("Invalid Argument: gistId is undefined")
      }
      try {
        let gist = await getGistsPromise({id : gistId})
        return gist;
      } catch (error) {
        throw new Error("Unable retrieve gist: " + error.message)
      }
    }
  }
};
