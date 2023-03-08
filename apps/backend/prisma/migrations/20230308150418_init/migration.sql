-- CreateTable
CREATE TABLE "Item_Order" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,
    "menu_item_id" INTEGER NOT NULL,
    "order_detail_id" INTEGER NOT NULL,

    CONSTRAINT "Item_Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_Detail" (
    "id" SERIAL NOT NULL,
    "order_name" TEXT NOT NULL,
    "toss_status" TEXT NOT NULL,
    "order_status" TEXT NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "approveAt" TIMESTAMP(3),
    "requestAt" TIMESTAMP(3),
    "owner_id" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "Order_Detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu_Item" (
    "id" SERIAL NOT NULL,
    "photo" TEXT,
    "price" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "store_name" TEXT NOT NULL,
    "store_address" TEXT NOT NULL,
    "store_phone" TEXT,
    "theme" TEXT,
    "store_operating_time" TEXT,
    "name" TEXT,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_username_key" ON "Owner"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_phone_key" ON "Owner"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_category_name_key" ON "Menu"("category_name");

-- AddForeignKey
ALTER TABLE "Item_Order" ADD CONSTRAINT "Item_Order_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "Menu_Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_Order" ADD CONSTRAINT "Item_Order_order_detail_id_fkey" FOREIGN KEY ("order_detail_id") REFERENCES "Order_Detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Detail" ADD CONSTRAINT "Order_Detail_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Detail" ADD CONSTRAINT "Order_Detail_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu_Item" ADD CONSTRAINT "Menu_Item_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_id_fkey" FOREIGN KEY ("id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;