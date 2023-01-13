import {
  Resolver,
  Mutation,
  InputType,
  ObjectType,
  Field,
  Arg,
} from "type-graphql";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, isUserExist } from "./doa";
import * as constants from "./../../constants";

@InputType()
class RegistrationInput {
  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: false })
  type: constants.USER_TYPES;
}

@InputType()
class LoginInput {
  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;
}

@ObjectType()
class AuthenticationOutput {
  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  type: constants.USER_TYPES;

  @Field({ nullable: false })
  token: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => AuthenticationOutput)
  async register(
    @Arg("input") input: RegistrationInput
  ): Promise<AuthenticationOutput> {
    const { firstName, lastName, email, password, type } = input;

    if (await isUserExist(email)) {
      throw new Error("User already exist!");
    }

    const token: string = jwt.sign(
      { email: input?.email },
      constants?.AUTH_TOKEN_SECRET,
      { expiresIn: constants?.AUTH_TOKEN_EXP }
    );

    try {
      const hashedPassword: string = await bcrypt.hash(
        password,
        constants?.PASSWORD_ENCRYPTION_SALT_ROUNDS
      );

      const result = await createUser(
        firstName,
        lastName,
        email,
        hashedPassword,
        type
      );

      return {
        firstName: result?.first_name!,
        lastName: result?.last_name!,
        email: result?.email!,
        type: result?.type!,
        token,
      };
    } catch (error: any) {
      console.error(`Password encryption failed: ${error?.message}`);
      throw new Error(error?.message);
    }
  }

  @Mutation(() => AuthenticationOutput)
  async login(@Arg("input") input: LoginInput): Promise<AuthenticationOutput> {
    const { email, password } = input;

    const user = await isUserExist(email);
    if (!user) {
      throw new Error("User not found!");
    }

    try {
      const valid: boolean = await bcrypt.compare(password, user?.password!);
      if (valid) {
        const token: string = jwt.sign(
          { email: input?.email },
          constants?.AUTH_TOKEN_SECRET,
          { expiresIn: constants?.AUTH_TOKEN_EXP }
        );

        return {
          firstName: user?.first_name!,
          lastName: user?.last_name!,
          email: user?.email!,
          token,
          type: user?.type!,
        };
      } else {
        throw new Error(`Email/Password is incorrect`);
      }
    } catch (error: any) {
      console.error("Password comapre failed: ", error?.message);
      throw new Error(error?.message);
    }
  }
}
