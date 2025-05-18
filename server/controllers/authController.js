const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signup =async(req,res)=>{
    const { name, email, password } = req.body;
    console.log(1)
      try {
        const existingUser = await User.findOne({ email });
        console.log(2)
        if (existingUser) return res.status(400).json({ error: "User already exists" });
    
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(2.5)
        const newUser = new User({ name, email, password: hashedPassword });
        console.log(2.7)
        await newUser.save();
        console.log(3)
        res.status(201).json({ message: "Signup successful!" });
      } catch (err) {
        console.log(4)
        res.status(500).json({ error: err.message });
      }
};
const login = async(req,res) =>{
    const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "1234" , { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports = {signup,login};
