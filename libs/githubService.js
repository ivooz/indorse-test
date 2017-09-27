const GitHubApi = require("github");
const githubClient = new GitHubApi();
const gistService = require('./gistService')(githubClient);
const repoService = require('./repoService')(githubClient);

module.exports = (() => {

  return {
    gistService : gistService,
    repoService : repoService
  }
})();
