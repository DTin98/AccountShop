import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsMongoId, IsOptional, IsUUID } from "class-validator";
import { FilterDto } from "src/shared/dtos/filter.dto";

export class FilterPaymentDto extends FilterDto {}
