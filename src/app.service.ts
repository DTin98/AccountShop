import { Inject, Injectable } from "@nestjs/common";
import { AdminBankInfo } from "./shared/interfaces/admin-bank-info.interface";
import { UsersService } from "./users/users.service";
import * as fs from "fs";
import { join } from "path";
@Injectable()
export class AppService {
  constructor(private userService: UsersService) {}

  getHello(): string {
    return "Hello World!";
  }

  async getAdminBankInfo(userId: string): Promise<AdminBankInfo> {
    const transferContent = await this.userService.getTransferContent(userId);
    return {
      bankName: "Vietcombank - CN TPHCM",
      accountNumber: "0071000873564",
      accountName: "NGUYEN VAN NINH",
      transferContent: transferContent,
    };
  }

  updateHTML(content: string): string {
    fs.writeFile(
      join(__dirname, "..", "views" + "/header.hbs"),
      content,
      (err) => {
        if (err) throw err;
        console.log("Successfully Written to File.");
      }
    );

    return content;
  }
}
