import { string } from "yup";

export default async (input: string) => {
  const usernameSchema = string()
    .required("Username is required.")
    .min(3, "Username must be at least 3 characters.")
    .max(20, "Username must be at most 20 characters.")
    .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters and numbers.");

  try {
    await usernameSchema.validate(input);
  } catch (error: any) {
    return error.message;
  }

  return "";
};
