const express = require("express");
const { getAllMail, getMail, addUser } = require("../data/users");
const { createJsonToken, isValidPassword } = require("../utils/auth");
const { isValidEmail, isValidText } = require("../utils/validations");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const mail = await getAllMail();
    res.json({mail});
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next)=> {
  try {
    const {id} = req.params
    const allUser = await getAllMail()
    const data = allUser.users.find(list => list.id === id)
    const user = await getMail(data.email)
    res.json({user})
  } catch (error) {
    next(error)
  }
})
router.post("/signup", async (req, res, next) => {
  const data = req.body;
  let err = {};
  if (!isValidEmail(data.email)) {
    err.email = "Invalid Email";
  } else {
    try {
      const existingUser = await getMail(data.email);
      if (existingUser) {
        err.email = "Email exist already";
      }
    } catch (error) {}
  }
  if (!isValidText(data.password, 6)) {
    err.password = "Invalid Password. Must be at least 6 characters long";
  }
  if (Object.keys(err).length > 0) {
    return res.status(422).json({
      message: "User signup failed due to validation errors",
      errors: err,
    });
  }
  try {
    const createUser = await addUser(data);
    const authToken = createJsonToken(createUser.email);
    res.status(201).json({
      message: "User Created",
      user: createUser,
      token: authToken,
    });
  } catch (error) {
    next(error)
  }
});
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await getMail(email);
  } catch (error) {
    return res.status(401).json({
      message: "Authentication Failed",
    });
  }
  const isPwValid = await isValidPassword(password, user.password);
  if (!isPwValid) {
    return res.status(422).json({
      message: "Invalid credentials",
      errors: { credentials: "Invalid email or password entered" },
    });
  }
  const token = createJsonToken(email);
  res.json({token, userId: user.id, isAdmin: user.isAdmin || false})
});
module.exports = router;
