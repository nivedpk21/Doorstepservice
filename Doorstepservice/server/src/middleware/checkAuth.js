const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, "this_is_an_encrypt_key");
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      role: decodedToken.role,
    };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Auth failed!" });
  }
};
