import { User } from "src/users/schemas/user.schema";

export class LoginResult {
  access_token: string;
  user: User;
}
