-- AlterTable
ALTER TABLE "Menu_Item" ALTER COLUMN "image_url" SET DEFAULT 'path';

-- AlterTable
ALTER TABLE "Order_Detail" ALTER COLUMN "toss_status" SET DEFAULT '결제대기중',
ALTER COLUMN "order_status" SET DEFAULT '주문대기중',
ALTER COLUMN "approveAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "requestAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Owner" ALTER COLUMN "theme" SET DEFAULT 'simple',
ALTER COLUMN "store_operating_time" SET DEFAULT '시간',
ALTER COLUMN "name" SET DEFAULT '이름',
ALTER COLUMN "facility" SET DEFAULT 'facility';
