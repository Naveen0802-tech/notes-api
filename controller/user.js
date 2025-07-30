const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const Auth = require("../middleware/auth");

async function register(req,res){
    try {
      const { email, password } = { ...req.body };
      if (!email || !password) {
        return res.status(400).send({
          message: "Email/Password is required",
        });
      }
      // Check existing user
      const existingUser = await userModel.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "User already exists with this email" });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({email:email,password:hashedPassword})
      return res.status(200).send({
        message:"User registered successfully",
        user: user,
      });
    } catch (error) {
        console.log(error)
         return res.status(400).send({
         message: error?.message || "something went wrong"
       });
    }
}

async function login(req,res){
    try{
      const { email, password } = { ...req.body };
      if (!email || !password) {
        return res.status(400).send({
          message: "Email/Password is required",
        });
      }
      let user = await userModel.findOne({ email });
      if (!user) return res.status(400).send({ message: "Invalid Email" });

      const isPassMatch = await bcrypt.compare(password, user.password);
      if (!isPassMatch)
        return res.status(400).send({ message: "Invalid Password" });

      // generate token
      const jwtToken = await Auth.generateJWTToken({userId:user._id})

      return res.status(200).send({
        message:"User login successfully",
        user: user,
        token: jwtToken,
      });
    }catch(error){
       console.log(error)
        return res.status(400).send({
         message: error?.message || "something went wrong"
       });
    }
}
module.exports ={register,login}