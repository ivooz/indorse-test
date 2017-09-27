const emailValidator = require("email-validator");
const githubService =  require("./githubService");
const repoService = githubService.repoService;
const dbService = require("./dbService");
const randomChallengeService = require("./randomChallengeService");
const emailService = require("./emailService");
const repoNamePattern = new RegExp(".*\/.*");

module.exports = (() => {

  return {

    /**
     * beginRegistration - description
     *
     * @param  {type} email    description
     * @param  {type} repoName description
     * @return {type}          description
     */
    beginRegistration : async function beginRegistration(email, repoPath) {
      if(!email) {
        throw new Error("Invalid Argument: email is undefined")
      }
      if(!emailValidator.validate(email)) {
        throw new Error("Invalid Argument: malformed email address")
      }
      if(!repoPath) {
        throw new Error("Invalid Argument: repoPath is undefined")
      }
      if(!repoNamePattern.test(repoPath)) {
        throw new Error("Invalid Argument: invalid repoPath format:" + repoPath)
      }

      let [githubUsername , repoName] = repoPath.split("/")
      let repoObj = await repoService.getRepo(githubUsername,repoName);
      console.log(repoObj.data.name + " " + repoObj.data.owner.login)
      if(repoObj.data.name !== repoName || repoObj.data.owner.login !== githubUsername) {
        throw new Error("Invalid repo name provided.")
      }

      let randomChallenge = await randomChallengeService.generateRandomString();

      try {
        await dbService.insertUserRepo(email,randomChallenge,repoName,githubUsername);
        await emailService.sendRegistrationEmail(email,githubUsername,randomChallenge);
      } catch(error) {
        throw new Error("Unable to save registration request: " + error.message)
      }
    }
  }
})();
