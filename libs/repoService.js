const {promisify} = require('util');

module.exports = function init(githubApi) {

  if(!githubApi) {
    throw new Error("Failed to initialize module: githubApi is undefined")
  }

  const getReposPromise = promisify(githubApi.repos.get);

  return {

    /**
     * getRepo - description
     *
     * @param  {type} owner description
     * @param  {type} repoName  description
     * @return {type}       description
     */
    getRepo : async function getRepo(owner, repoName) {
      if(!owner) {
        throw new Error("Invalid Argument: owner is undefined")
      }
      if(!repoName) {
        throw new Error("Invalid Argument: repoName is undefined")
      }
      try {
        let repo = await getReposPromise({owner : owner, repo : repoName})
        return repo;
      } catch(error) {
        throw new Error("Unable to retrieve repo:" + error.message)
      }
    }
  }
};
