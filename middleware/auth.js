const jwt = require("jsonwebtoken")
const userModel = require("../models/user")

async function generateJWTToken(user) {
    try {
      const secretKey = process.env.JWT_SECRET_KEY;
      const expireKey = { expiresIn: process.env.TOKEN_EXP_TIME };
      const token = jwt.sign(user, secretKey, expireKey);
      return token;
    } catch (error) {
        console.log(error)
        return res.status(400).send({
         message: error?.message || "something went wrong"
       });
    }
}

async function verifyJWTToken(req, res, next) {
    try {
        const token = req.headers['authorization'] ? req.headers['authorization'].split(" ")[1] : '';
        if (!token) {
          return res.status(401).json({message:"Bearer token missing"})
        }

        const secretKey = process.env.JWT_SECRET_KEY;
        const jwtResult = await jwt.verify(token, secretKey);
        if (jwtResult.error) return res.status(401).json({error: "Invalid Token", message: jwtResult.error});

        const data = await userModel.findOne({_id: jwtResult.userId});
        if (!data) return res.status(401).json({error: "user not found!", message: "Unable retrieve user details"});
        req.user = data;
        next();
    } catch (error) {
       console.log(error)
       return res.status(400).send({
         message: error?.message || "something went wrong"
       });
    }
}

module.exports = {generateJWTToken,verifyJWTToken}