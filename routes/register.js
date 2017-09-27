const express = require('express');
const router = express.Router();
const finalizeRepoRegistrationService = require("../libs/finalizeRepoRegistrationService")
const beginRepoRegistrationService = require("../libs/beginRepoRegistrationService")

router.post('/start', async (req, res, next) => {
  try{
    await beginRepoRegistrationService.beginRegistration(req.body.email,req.body.repoName);
    res.status(200).send();
  } catch(error) {
    console.log(error);
    res.status(400).send();
  }
});

router.post('/finish', async function(req, res, next) {
  try {
    await finalizeRepoRegistrationService.finalizeRegistration(req.body.email,req.body.gistId);
    res.status(200).send();
  } catch(error) {
    console.log(error);
    res.status(400).send();
  }
});

module.exports = router;
