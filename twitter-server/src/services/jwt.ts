import JWT from "jsonwebtoken";
import { User } from "@prisma/client";
import { JWTUser } from "../types";


class JWTService {

  public static generateTokenForUser(user: User) {
    const payload: JWTUser = {
      id: user?.id,
      email: user?.email,
    };
    const token = JWT.sign(payload, process.env.JWT_SECRET!);
    return token;
  }

  public static decodeToken(token: string) {
    try {
      return JWT.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      return null;
    }
  }

}

export default JWTService;