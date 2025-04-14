import bcrypt, { hash } from "bcrypt";

export const hasPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};
export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
