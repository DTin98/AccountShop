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
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "./schemas/user.schema";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { FilterUserDto } from "./dto/user-filter.dto";
import { AddUserMoneyDto } from "./dto/add-user-money.dto";
import { CutUserMoneyDto } from "./dto/cut-user-money.dto";
import { Roles, ROLES_KEY } from "src/shared/decorators/role.decorator";
import { Role } from "./enums/role.enum";

@Controller("users")
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly mailerService: MailerService
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get("verify")
  @ApiResponse({
    status: 200,
    type: User,
    description: "Verify user",
  })
  @ApiBearerAuth()
  async verify(
    @Request() req,
    @Query("code", ParseIntPipe) code: number
  ): Promise<User> {
    const user = await this.userService.findOne(req.user.username);
    if (!user) throw new BadRequestException("user is not found");
    if (!user.email) throw new BadRequestException("user have not email");
    if (user.isVerified) throw new BadRequestException("user is actived");
    if (code === user.verificationCode)
      return this.userService.patch(user._id, {
        isVerified: true,
        verificationCode: null,
      });
    else throw new BadRequestException("code is wrong");
  }

  @Get("/verify/resend-email")
  @ApiBearerAuth()
  async verifyResend(@Request() req) {
    const user = await this.userService.findOne(req.user.username);
    if (!user) throw new BadRequestException("user is not found");
    if (!user.email) throw new BadRequestException("user have not email");
    const code = Math.floor(Math.random() * 999999);
    const updatedUser = await this.userService.patch(user._id, {
      verificationCode: code,
    });
    this.mailerService
      .sendMail({
        to: `${user.email}`,
        from: "kaisin1505@gmail.com", // Senders email address
        subject: "HelloWorld", // Subject line
        html: `<b>This is your code: ${code}</b>`, // HTML body content
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  @Get()
  @Roles(Role.Admin)
  findAll(@Query() filter: FilterUserDto) {
    return this.userService.findAll(filter);
  }

  @Post(":id/add-money/")
  @Roles(Role.Admin)
  addMoney(
    @Param("id") userId: string,
    @Body() addUserMoneyDto: AddUserMoneyDto
  ): Promise<User> {
    return this.userService.addMoney(userId, addUserMoneyDto);
  }

  @Post(":id/cut-money")
  @Roles(Role.Admin)
  cutMoney(
    @Param("id") userId: string,
    @Body() cutUserMoneyDto: CutUserMoneyDto
  ): Promise<User> {
    return this.userService.cutMoney(userId, cutUserMoneyDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.patch(id, updateUserDto);
  }

  @Patch(":id/reset-password")
  @Roles(Role.Admin)
  resetPassword(@Param("id") id: string): Promise<User> {
    return this.userService.resetPassword(id);
  }
}
