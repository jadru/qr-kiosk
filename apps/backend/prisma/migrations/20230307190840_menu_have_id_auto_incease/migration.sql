-- AlterTable
CREATE SEQUENCE menu_item_id_seq;
ALTER TABLE "Menu_Item" ALTER COLUMN "id" SET DEFAULT nextval('menu_item_id_seq');
ALTER SEQUENCE menu_item_id_seq OWNED BY "Menu_Item"."id";
