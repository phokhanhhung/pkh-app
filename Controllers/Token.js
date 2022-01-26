const TokenModel = require('../Models/Token');
const jwt = require('jsonwebtoken');

const refreshToken = (req, res) => {
  TokenModel.find({
    refreshToken: req.body.refreshToken
  })
  .then(data => {
    if(data) {
      var payload = jwt.verify(req.body.refreshToken, "REFRESH_SECRET");

      // console.log(payload)

      const token = jwt.sign({id: payload.id}, "SECRET", {expiresIn: '2 minutes'});
      res.send({
        token: token
      })
    } else {
      console.log("Ko có RefreshToken");
    }
  })
  .catch(err => console.log(err));
}

module.exports = {
  refreshToken: refreshToken
}