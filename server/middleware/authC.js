const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Customer = require("../model/customer");
const { SECRET } = require("../config");

/**
 * @DESC To register the user (ADMIN, SUPER_ADMIN, USER)
 */
const userRegister = async (userDets, res) => {
    console.log(userDets)
  try {
    // Validate the username
    let usernameNotTaken = await validateUsername(userDets.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: `Username is already taken.`,
        success: false
      });
    }

    // validate the email
    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
        success: false
      });
    }


    // Get the hashed password
    const password = await bcrypt.hash(userDets.password, 12);
    // create a new user
    const newUser = new Customer({
      Email : userDets.email,
      Password : password,
      Username : userDets.username,
      Name : userDets.Name,
      PhoneNo : userDets.PhoneNo,
      Address : userDets.Address,
      PurchaseHistory : userDets.PurchaseHistory,
    });
    console.log(newUser)
    await newUser.save();
    return res.status(201).json({
      message: "Hurry! now you are successfully registred. Please nor login.",
      success: true
    });
  } catch (err) {
    // Implement logger function (winston)
    console.log('hey')
    return res.status(500).json({
      message: "Unable to create your account.",
      success: false
    });
  }
};

/**
 * @DESC To Login the user (ADMIN, SUPER_ADMIN, USER)
 */
const userLogin = async (userCreds, role, res) => {
  let { username, password } = userCreds;
  // First Check if the username is in the database
  const user = await Customer.findOne({ Username : username });
  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login credentials.",
      success: false
    });
  }
 
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        username: user.username,
        email: user.email
      },
      SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168
    };

    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
  }
};

const validateUsername = async username => {
  let user = await Customer.findOne({ Username : username });
  return user ? false : true;
};

/**
 * @DESC Passport middleware
 */
const userAuth = passport.authenticate('jwt', { session: false });

/**
 * @DESC Check Role Middleware
 */

const validateEmail = async email => {
  let user = await Customer.findOne({ Email : email });
  return user ? false : true;
};

const serializeUser = req => {
  return {
    Username: req.user.username,
    Email: req.user.email,
    _id: req.user._id,
    updatedAt: req.user.updatedAt,
    createdAt: req.user.createdAt,
  }
}


const updateUser = async (user,req,res) => {
  console.log('trying')
  const id = req.params.username;
  Customer.findOneAndUpdate({Username : id},user)
  .then((data)=>{
      if(!data) {
        res.status(404).send("Failed")
      }
      else {
        res.status(200).send("Updated")
      }
  })
}

const deleteuser = async (req,res) => {
  const id = req.params.username;
  Customer.findOneAndDelete({Username : id})
  .then((data)=>{
      if(!data) {
        res.status(404).send("Failed")
      }
      else {
        res.status(200).send("Deleted")
      }
  })
}

const GetUserData = async (req,res) => {
  Customer.findOne({Username: req.params.username})
  .then((data)=>{
    if(!data) {
      res.status(404).send("Failed")
    }
    else {
      res.status(200).send(data)
    }
  })
}



const findusers = (req, res) => {
  Customer.find()
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res
            .status(500)
            .send({
              message:
                err.message ||
                "Error Occurred while retriving Member information",
            });
        });
};



module.exports = {
    userAuth,
  userLogin,
  userRegister,
  serializeUser,
  updateUser,
  GetUserData,
  deleteuser,
  findusers
};