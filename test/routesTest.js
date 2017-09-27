const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const mock = require('mock-require');

mock('mailgun-js', './mailgunMock');

chai.use(chaiHttp);

const app = require('../app.js');

let mockUser = {
  email : "emaila81@com.com",
  repo : "ivooz/gft_digital_banking_2016"
}

let mockUser2 = {
  email : "emaila3@com.com",
  repo : "gft_digital_banking_2016",
  githubUsername : "ivooz",
  repo : "ivooz/gft_digital_banking_2016",
  randomChallenge : "adadadadadadadadad",
  matchingGistId : "4d68992900caced3a03f5c1e7fddc247"
}

const dbService = require('../libs/dbService');

(async () => {
  await dbService.insertUserRepo(mockUser2.email, mockUser2.randomChallenge, mockUser2.repo, mockUser2.githubUsername)
})();

describe('routes', () => {

  describe('/register/start', () => {
    it('Returns a 200 response when the data is correct', async () => {

      await chai.request(app)
      .post('/register/start')
      .send({
        email: mockUser.email,
        repoName: mockUser.repo
      })
      .then(response => {
        expect(response).to.have.status(200);
      })
    });
  });

  describe('/register/finish', () => {
    it('Returns a 200 response when the data is correct', async () => {

      await chai.request(app)
      .post('/register/finish')
      .send({
        email:  mockUser2.email,
        gistId: mockUser2.matchingGistId
      })
      .then(response => {
        expect(response).to.have.status(200);
      })
    });
  });
});
