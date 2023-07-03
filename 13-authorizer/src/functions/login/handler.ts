import { BcryptService } from "../services/bcrypt.service";
import { TokenService } from "../services/token.service";
import { UserService } from "../services/user.service";

const login = async (event) => {
  console.log("register -> event", event);
  let { email, password } = event.body;

  const user = await UserService.getUser(email);

  if (user) {
    const isPasswordValid = await BcryptService.comparePassword(
      password,
      user.password
    );

    if (isPasswordValid) {
      const token = await TokenService.createAccessToken(user.name, user.email);
      return {
        statusCode: 200,
        body: JSON.stringify({
          accessToken: token,
          refreshToken: user.refreshToken,
        }),
      };
    } else {
      return {
        statusCode: 409,
        body: "Password is not valid",
      };
    }
  } else {
    return {
      statusCode: 404,
      body: "User not found",
    };
  }
};

export const main = login;
