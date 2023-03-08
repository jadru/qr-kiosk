import { Test, TestingModule } from '@nestjs/testing';
import { ItemOrderService } from './item_order.service';

describe('ItemOrderService', () => {
  let service: ItemOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemOrderService],
    }).compile();

    service = module.get<ItemOrderService>(ItemOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
