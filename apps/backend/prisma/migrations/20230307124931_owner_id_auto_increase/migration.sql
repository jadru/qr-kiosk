-- AlterTable
CREATE SEQUENCE owner_owner_id_seq;
ALTER TABLE "Owner" ALTER COLUMN "owner_id" SET DEFAULT nextval('owner_owner_id_seq');
ALTER SEQUENCE owner_owner_id_seq OWNED BY "Owner"."owner_id";
