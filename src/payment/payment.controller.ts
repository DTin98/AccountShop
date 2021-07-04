import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dtos/create-payment.dto";
import { UpdatePaymentDto } from "./dtos/update-payment.dto";
import { PaymentFilterDto } from "./dtos/filter-payment.dto";
import { Payment } from "./schemas/payment.schema";
import { PaginateResult } from "src/shared/interfaces/paginate-result.interface";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get("histories")
  findAll(
    @Req() req,
    @Query() filter: PaymentFilterDto
  ): Promise<PaginateResult<Payment>> {
    const { userId } = req.user;
    return this.paymentService.findAll(userId, filter);
  }
}
