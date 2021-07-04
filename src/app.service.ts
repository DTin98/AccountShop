import { Inject, Injectable } from "@nestjs/common";
import { AdminBankInfo } from "./shared/interfaces/admin-bank-info.interface";
import { UsersService } from "./users/users.service";
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
}
