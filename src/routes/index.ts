import { getUser } from "./get";
import { login } from "./login";
import { register } from "./register";

export const handler = { register, login, "user-get": getUser };
