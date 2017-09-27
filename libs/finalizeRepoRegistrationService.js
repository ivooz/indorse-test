const githubService =  require("./githubService");
const gistService = githubService.gistService;
const dbService = require("./dbService");
const randomChallengeService = require("./randomChallengeService");

module.exports = (() => {

  return {


    /**
     * finalizeRegistration - finalizes the github repo registration process
     *
     * @param  {type} email  description
     * @param  {type} gistId description
     * @return {type}        description
     */
    finalizeRegistration : async function finalizeRegistration(email, gistId) {
      if(!email) {
        throw new Error("Invalid Argument: email is undefined");
      }
      if(!gistId) {
        throw new Error("Invalid Argument: gistId is undefined");
      }

      try {
        let userRepo = await dbService.getUserRepo(email);
        let gist = await gistService.getGist(gistId);

        if(gist.data.owner.login !== userRepo.githubUsername.toLowerCase()) {
          throw new Error("Gist author is not the repo owner");
        }

        let gistFile = gist.data.files["gistfile1.txt"];
        if(!gistFile) {
          throw new Error("The gist does not contain the required file");
        }

        if(gistFile.content !== userRepo.randomChallenge) {
          throw new Error("Gist contents are not equal to the random challenge");
        }
        //No errors means we succeeded!
      } catch(error) {
        throw new Error("Unable to finalize registration: " + error.message);
      }
    }
  }
})();
