const {promisify} = require('util');
const loki = require('lokijs');
const db = new loki('users.json');

module.exports = (() => {

  let users = db.addCollection("users");

  return {

    /**
     * insertUserRepo - description
     *
     * @param  {type} userEmail       description
     * @param  {type} randomChallenge description
     * @param  {type} repo            description
     * @param  {type} githubUsername  description
     * @return {type}                 description
     */
    insertUserRepo : async function insertUserRepo(userEmail, randomChallenge, repo, githubUsername) {
      if(!userEmail) {
        throw new Error("Invalid Argument: userEmail is undefined")
      }
      if(!randomChallenge) {
        throw new Error("Invalid Argument: randomChallenge is undefined")
      }
      if(!repo) {
        throw new Error("Invalid Argument: repo is undefined")
      }
      if(!githubUsername) {
        throw new Error("Invalid Argument: githubUsername is undefined")
      }

      let queryPromise = new Promise((resolve,reject) => {
        resolve(users.find({'email':userEmail}));
      })

      let reposInDb = await queryPromise

      if(reposInDb.length >= 1) {
        throw new Error("User already exists!")
      }

      return new Promise((resolve,reject) => {
        users.insert({
          email : userEmail,
          randomChallenge : randomChallenge,
          repo : repo,
          githubUsername : githubUsername
        })
        resolve()
      })
    },

    /**
     * getUserRepo - description
     *
     * @param  {type} userEmail description
     * @return {type}           description
     */
    getUserRepo : function getUserRepo(userEmail) {
      if(!userEmail) {
        throw new Error("Invalid Argument: userEmail is undefined")
      }
      return new Promise((resolve,reject) => {
        let userFromDb = users.find({'email':userEmail});
        if(userFromDb.length < 1) {
          reject(new Error("User repo not found"))
        } else {
          resolve(userFromDb[0])
        }
      })
    }
  }
})();
