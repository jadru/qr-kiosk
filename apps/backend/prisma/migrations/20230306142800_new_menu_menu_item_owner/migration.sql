-- CreateTable
CREATE TABLE "Menu" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "menu_item" (
    "id" INTEGER NOT NULL,
    "item_id" TEXT NOT NULL,
    "photo" TEXT,
    "price" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "menu_id" INTEGER NOT NULL,

    CONSTRAINT "menu_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "owner_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "store_address" TEXT NOT NULL,
    "store_phone" TEXT NOT NULL,
    "store_operating_time" TEXT,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("owner_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_phone_key" ON "Owner"("phone");

-- AddForeignKey
ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
