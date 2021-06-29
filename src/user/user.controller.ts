import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Request,
  Patch,
  Param,
  Delete,
  Options,
  BadRequestException,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "./schemas/user.schema";
import { ApiBearerAuth, ApiTags, ApiResponse } from "@nestjs/swagger";
import { randomVerificationCode } from "src/utils/randomVerificationCode";

@Controller("users")
@ApiTags("User")
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get("verify")
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: User,
  })
  async verify(
    @Request() req,
    @Query("code", ParseIntPipe) code: number
  ): Promise<User> {
    const user = await this.userService.findOne(req.user.userId);
    if (!user) throw new BadRequestException("user is not found");
    if (!user.email) throw new BadRequestException("user have not email");
    if (user.isVerified) throw new BadRequestException("user is actived");

    if (code === user.verificationCode)
      return this.userService.update(user._id, {
        isVerified: true,
        verificationCode: null,
      });
    else throw new BadRequestException("code is wrong");
  }

  @Get("/verify/resend-email")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  sendVerificationEmail(@Request() req) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
