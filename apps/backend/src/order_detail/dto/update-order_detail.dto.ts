import { PartialType } from '@nestjs/swagger';
import { CreateOrderDetailDto } from './create-order_detail.dto';

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {}
