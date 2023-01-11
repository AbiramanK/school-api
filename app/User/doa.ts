import { USER_TYPES } from "../../constants";
import { UserModel } from "./model";

export const isUserExist = async (email: string) => {
  const result = await UserModel?.findOne({
    where: { email },
  });

  if (!!result) {
    return result;
  }

  return false;
};

export const createUser = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  type: USER_TYPES
) => {
  const result = await UserModel.create({
    first_name,
    last_name,
    email,
    password,
    type,
  });

  if (!!result) {
    return result;
  }

  throw new Error("Somthing went wrong, Please try again later!");
};
