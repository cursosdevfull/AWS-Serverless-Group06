import { BcryptService } from "../services/bcrypt.service";
import { UserService } from "../services/user.service";

const register = async (event) => {
  console.log("register -> event", event);
  let { name, email, password } = event.body;

  const user = await UserService.getUser(email);

  if (!user) {
    password = await BcryptService.hashPassword(password);
    await UserService.register(name, email, password);
    return {
      statusCode: 200,
      body: "User registered successfully",
    };
  } else {
    return {
      statusCode: 404,
      body: "User already exists",
    };
  }
};

export const main = register;
