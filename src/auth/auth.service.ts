import * as bcrypt from "bcrypt";
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { LoginUserDto } from "./dtos/login-user.dto";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { SALT_OR_ROUNDS } from "./constants";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneWithUsername(username);
    if (!user) return null;
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user._doc;
    return result;
  }

  async createAccessToken(payload: object) {
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  async login(loginUserDto: LoginUserDto) {
    const validatedUser = await this.validateUser(
      loginUserDto.username,
      loginUserDto.password
    );
    if (validatedUser) {
      const payload = {
        username: validatedUser.username,
        sub: validatedUser._id,
      };
      return {
        access_token: this.jwtService.sign(payload),
        user: validatedUser,
      };
    }
    throw new BadRequestException("username or password is wrong");
  }

  async register(registerUserDto: RegisterUserDto) {
    const hash = await bcrypt.hash(registerUserDto.password, SALT_OR_ROUNDS);
    const user = { ...registerUserDto, password: hash };
    const createdUser = await this.usersService.create(user);
    const { password, ...result } = createdUser._doc;
    const payload = {
      username: createdUser.username,
      sub: createdUser._id,
    };
    return {
      access_token: this.createAccessToken(payload),
      user: result,
    };
  }
}
