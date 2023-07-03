import { PolicyService } from "@functions/services/policy.service";

import { TokenService } from "../services/token.service";

const authorizer = async (event) => {
  console.log("authorizer -> event", event);
  const { authorizationToken, methodArn } = event;

  try {
    const payload = await TokenService.verifyAccessToken(authorizationToken);
    console.log("authorizer -> payload", payload);
    return PolicyService.generate("user", "Allow", methodArn);
  } catch (error) {
    console.log("authorizer -> error", error);
    return PolicyService.generate("user", "Deny", methodArn);
  }
};

export const main = authorizer;
