import axios from "axios";
import { prismaClient } from "../clients/db";
import JWTService from "./jwt";
import { generateUsername, getUserByUsername } from "./username-generator";
import bcrypt from 'bcrypt';
import { redisClient } from "../clients/redis";
import { Prisma } from "@prisma/client";

interface GoogleTokenResult {
  iss?: string;
  nbf?: string;
  aud?: string;
  sub?: string;
  email: string;
  email_verified: string;
  azp?: string;
  name?: string;
  picture?: string;
  given_name: string;
  family_name?: string;
  iat?: string;
  exp?: string;
  jti?: string;
  alg?: string;
  kid?: string;
  typ?: string;
}

interface LoginUser {
  email: string;
  password: string;
}

interface CreateUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface UpdateUser {
  id: string;
  name: string;
  username: string | undefined;
  email: string | undefined;
  password?: string;
  newPassword?: string;
  bio?:  string | undefined;
  coverImage?: string | undefined;
  profileImage?: string | undefined;
}

class UserService {
  public static async verifyGoogleAuthToken(token: string) {
    const googleToken = token;
    const googleOauthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
    googleOauthURL.searchParams.set("id_token", googleToken);

    const { data } = await axios.get<GoogleTokenResult>(
      googleOauthURL.toString(),
      {
        responseType: "json",
      }
    );

    const user = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      const username = await generateUsername(data.email);

      await prismaClient.user.create({
        data: {
          email: data.email,
          name: data.given_name,
          username: username,
          profileImage: data.picture,
          isOAuth: true,
        },
      });
    }

    const userInDb = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!userInDb) throw new Error("User with email not found");

    const userToken = JWTService.generateTokenForUser(userInDb);

    return userToken;
  }

  public static getUserById(id: string) {
    return prismaClient.user.findUnique({ where: { id } });
  }

  public static async getUserByUsername(username: string) {

    const cachedValue = await redisClient.get(`GetUserByUsername:${username}`);
    if (cachedValue) return JSON.parse(cachedValue);

    const user = await prismaClient.user.findUnique({
      where: {
        username: username
      }
    });

    if (!user) {
      // throw new Error("User does not exists!");
      return { error: "User doest not exists" };
    }

    await redisClient.set(`GetUserByUsername:${username}`, JSON.stringify(user));
    return user;

  }

  public static async loginUser(data: LoginUser) {
    const { email, password, } = data;

    const existingUser = await prismaClient.user.findUnique({
      where: {
        email
      }
    });


    if (!existingUser || !existingUser.password) {
      return { error: "Your email or password is incorrect" };
    };

    const comparePassword = await bcrypt.compare(password, existingUser?.password!);

    if (!comparePassword) {
      return { error: "Your email or password is incorrect" };
    }

    const userToken = JWTService.generateTokenForUser(existingUser);

    return userToken;
  };

  public static async updateUser(data: UpdateUser) {

    let { name, username, email, password, newPassword, bio, coverImage, profileImage, id } = data;
    console.log(name, username, email, password, newPassword, bio, coverImage, profileImage, id);

    const dbUser = await prismaClient.user.findUnique({
      where: {
        id
      }
    });

    if (!dbUser) {
      console.log("user don't exists");
      return { error: "User dosn't exists!" };
    }
    console.log("user exists")

    if (dbUser.isOAuth) {
      console.log("user isOAuth")

      password = undefined;
      newPassword = undefined;
    }

    console.log("user .")

    if (username && username !== dbUser.username) {
      const usernameAvailable = await getUserByUsername(username);
      if (usernameAvailable) {
        return { error: "Username already in use!" };
      }
      
    }

    if (email) {
      const existingUser = await prismaClient.user.findUnique({
        where: {
          email
        }
      });

      if (existingUser && existingUser.id !== dbUser.id) {
        return { error: "Email already in use!" };
      }
    }

    if (password && newPassword && dbUser.password) {
      const passwordsMatch = await bcrypt.compare(
        password,
        dbUser.password,
      );

      if (!passwordsMatch) {
        return { error: "Incorrect password!" };
      }

      const hashedPassword = await bcrypt.hash(
        newPassword,
        10,
      );
      password = hashedPassword;
      newPassword = undefined;
    };

    // if (!bio || !profileImage || !coverImage) {
    //   bio = null;
    //   profileImage = null;
    //   coverImage = null;
    // }

    const updatedUser = await prismaClient.user.update({
      where: { id: dbUser.id },
      data: {
        name,
        username,
        email,
        bio,
        profileImage,
        coverImage,
        password
      }
    });

    const userToken = JWTService.generateTokenForUser(updatedUser);

    return userToken;

  };

  public static async createUser(payload: CreateUser) {
    const { email, password, name, username } = payload;

    const saltPassword = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltPassword);

    const existingUser = await prismaClient.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      // return { error: "Email already in use" };
      throw new Error("Email already in use!");

    }

    const existingUsername = await prismaClient.user.findUnique({
      where: {
        username
      }
    });

    if (existingUsername) {
      // return { error: "Email already in use" };
      throw new Error("Username already in use!");

    }

    const createdUser = await prismaClient.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        isOAuth: false,
      }
    });

    const userToken = JWTService.generateTokenForUser(createdUser);

    return userToken;
  };

  public static followUser(from: string, to: string) {
    return prismaClient.follows.create({
      data: {
        follower: { connect: { id: from } },
        following: { connect: { id: to } },
      },
    });
  }

  public static unfollowUser(from: string, to: string) {
    return prismaClient.follows.delete({
      where: { followerId_followingId: { followerId: from, followingId: to } },
    });
  }
}

export default UserService;