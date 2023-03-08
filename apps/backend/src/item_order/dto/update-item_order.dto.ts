import { PartialType } from '@nestjs/swagger';
import { CreateItemOrderDto } from './create-item_order.dto';

export class UpdateItemOrderDto extends PartialType(CreateItemOrderDto) {}
