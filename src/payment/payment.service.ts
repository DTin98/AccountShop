import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PaginateResult } from "src/shared/interfaces/paginate-result.interface";
import { getFilterQueries } from "src/utils/getFilterQueries";
import { FilterPaymentDto } from "./dtos/filter-payment.dto";
import { Payment, PaymentDocument } from "./schemas/payment.schema";

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>
  ) {}

  async findAll(
    userId: string,
    filter: FilterPaymentDto
  ): Promise<PaginateResult<Payment>> {
    const { pageSize, page, skip } = getFilterQueries(filter);

    const paymentCount = await this.paymentModel.countDocuments().exec();

    const paymentLst = await this.paymentModel
      .find({ owner: userId })
      .populate({ path: "products", select: "data" })
      .select("-owner")
      .limit(pageSize)
      .skip(skip)
      .exec();

    return {
      data: paymentLst,
      totalPage: Math.ceil(paymentCount / pageSize),
      page,
    };
  }
}
