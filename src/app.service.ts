import { Inject, Injectable } from "@nestjs/common";
import { AdminBankInfo } from "./shared/interfaces/admin-bank-info.interface";
import { UsersService } from "./users/users.service";
import * as fs from "fs";
import { join } from "path";
import { UpdateAdminBankInfoDto } from "./shared/dtos/update-admin-bank-info.dto";
import { UpdateHeaderHTMLDto } from "./shared/dtos/update-header-html.dto";
@Injectable()
export class AppService {
  constructor(private userService: UsersService) {}

  getHello(): string {
    return "Hello World!";
  }

  async getAdminBankInfo(username: string): Promise<AdminBankInfo> {
    let adminBankInfo;
    try {
      adminBankInfo = fs.readFileSync(
        join(__dirname, "..", "public", "adminBankInfo.json")
      );
    } catch (error) {
      throw error;
    }
    adminBankInfo = JSON.parse(adminBankInfo);
    return {
      ...adminBankInfo,
      transferContent: username,
    };
  }

  getHTML(): string {
    let contents;
    try {
      contents = fs.readFileSync(
        join(__dirname, "..", "public", "header.html")
      );
    } catch (error) {
      throw error;
    }
    return contents.toString();
  }

  updateHTML(updateHeaderHTMLDto: UpdateHeaderHTMLDto): string {
    try {
      fs.writeFileSync(
        join(__dirname, "..", "public", "header.html"),
        updateHeaderHTMLDto.file
      );
    } catch (error) {
      throw error;
    }
    return updateHeaderHTMLDto.file;
  }

  updateAdminBankInfo(updateAdminBankInfoDto: UpdateAdminBankInfoDto) {
    try {
      fs.writeFileSync(
        join(__dirname, "..", "public", "adminBankInfo.json"),
        JSON.stringify(updateAdminBankInfoDto)
      );
    } catch (error) {
      throw error;
    }
    return updateAdminBankInfoDto;
  }
}
