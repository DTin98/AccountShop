import { Controller, Get, Req, Query } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { FilterPaymentDto } from "./dtos/filter-payment.dto";
import { Payment } from "./schemas/payment.schema";
import { PaginateResult } from "src/shared/interfaces/paginate-result.interface";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get("histories")
  findAll(
    @Req() req,
    @Query() filter: FilterPaymentDto
  ): Promise<PaginateResult<Payment>> {
    const { userId } = req.user;
    return this.paymentService.findAll(userId, filter);
  }
}
