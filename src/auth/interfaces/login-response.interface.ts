import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/schemas/user.schema";

export class LoginResponse {
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpbjk4Iiwic3ViIjoiNjBkN2U4ZTE4MGM2ZTZmYTRjYjUyYzBhIiwiaWF0IjoxNjI0NzgwOTY5fQ.5uBYzN1sxK1lyclRTxBqDMcQwYCGgfPqtHx9ks4sER8",
    description: "The phone number of user",
  })
  access_token: string;

  @ApiProperty({
    example: {
      verificationCode: 137241,
      isVerified: false,
      role: ["user"],
      balance: 0,
      _id: "60d7e8e180c6e6fa4cb52c0a",
      username: "tin98",
      email: "truongdaitin98@gmail.com",
      phone: "0986114478",
      __v: 0,
    },
    description: "The phone number of user",
  })
  user: User;
}
