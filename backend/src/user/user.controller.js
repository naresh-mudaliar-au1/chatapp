import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "./user.model";
import userService from "./user.service";

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const checkUser = await userService.findOne({
      $or: [{ username }, { email }],
    });

    if (checkUser) throw new Error(`Credentials are already in use!`);

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const register = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    const registerUser = await register.save();
    if (!registerUser) throw new Error("Error Registering User");

    //Delete password while returning in Response;
    delete registerUser?.password;

    registerUser &&
      res.status(200).send({
        success: true,
        message: "You Have Been Registered",
        data: registerUser,
      });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const checkUser = await userService.findOne(
      { $or: [{ username }, { email }] },
      "+password"
    );
    if (!checkUser) throw new Error("User Does Not Exist Please Register");

    const verifyPassword = await bcrypt.compare(password, checkUser.password);

    if (!verifyPassword) throw new Error("Wrong Password");

    const secretKey = process.env.SECRETKEY;
    const token =
      verifyPassword && jwt.sign({ username: checkUser.username }, secretKey);

    verifyPassword &&
      res.status(200).send({
        success: true,
        message: "Login Successful",
        name: checkUser.username,
        id: checkUser._id,
        auth: token,
      });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const users = await userService.findAll({ search });
    if (users.error) throw new Error("Not able to search user!");

    users &&
      res.status(200).send({
        success: true,
        message: "Users fetched successfully!",
        users,
      });
  } catch (error) {
    console.log("[GET/USERS]", error.message);
    res.status(400).send({ success: false, message: error.message });
  }
};
export default { signup, login, getUsers };
