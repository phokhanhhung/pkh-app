const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
  console.log("token", req);
  if(req.headers.authorization) {
    var data = jwt.verify(req.headers.authorization, "SECRET");
    console.log("data", data);
    if(data) {
      req.dataToken = data;
      next();
    } else {
      res.send("Token is expired!");
    }

  } else {
    res.send("Token is not provided!");
  }
}

module.exports = Auth