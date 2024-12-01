import {MigrationInterface, QueryRunner} from "typeorm";

//prettier-ignore
export class Initial1732946728321 implements MigrationInterface {
    name = 'Initial1732946728321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."ENUM_STATUS" AS ENUM('ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."ENUM_STATUS" NOT NULL DEFAULT 'ACTIVE', "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_UNIQUE_UserTypeormEntity_username" ON "users" ("username") WHERE "deleted_at" IS NULL`);
        await queryRunner.query(`CREATE TYPE "public"."ENUM_EVENT_TYPE" AS ENUM('EVENT', 'PARK', 'VOUCHER', 'OTHER')`);
        await queryRunner.query(`CREATE TYPE "public"."ENUM_DATE_TYPE" AS ENUM('FIXED', 'DURATION')`);
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."ENUM_STATUS" NOT NULL DEFAULT 'ACTIVE', "name" character varying NOT NULL, "event_type" "public"."ENUM_EVENT_TYPE" NOT NULL, "image" character varying NOT NULL, "thumbnail" character varying NOT NULL, "description" character varying, "rating_star" integer NOT NULL DEFAULT 5, "display_price" integer NOT NULL, "is_banner" boolean NOT NULL DEFAULT true, "order" integer NOT NULL DEFAULT '1', "location" character varying, "date_type" "public"."ENUM_DATE_TYPE" NOT NULL, "dates" jsonb, "from_date" TIMESTAMP, "to_date" TIMESTAMP, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket_groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."ENUM_STATUS" NOT NULL DEFAULT 'ACTIVE', "event_id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_acaded98a40ff7381ba3f897225" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket_infos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."ENUM_STATUS" NOT NULL DEFAULT 'ACTIVE', "event_id" uuid NOT NULL, "ticket_group_id" uuid NOT NULL, "name" character varying NOT NULL, "quantity" integer, CONSTRAINT "PK_a78a8eba7e0db8f98b2f09cfd16" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer_roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."ENUM_STATUS" NOT NULL DEFAULT 'ACTIVE', "name" character varying NOT NULL, CONSTRAINT "PK_032727c6b2f9abee3b06d3e78e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ENUM_DISCOUNT_TYPE" AS ENUM('FIXED', 'PERCENTAGE')`);
        await queryRunner.query(`CREATE TABLE "ticket_prices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."ENUM_STATUS" NOT NULL DEFAULT 'ACTIVE', "ticket_info_id" uuid NOT NULL, "customer_role_id" uuid NOT NULL, "event_id" uuid NOT NULL, "ticket_group_id" uuid NOT NULL, "base_price" integer NOT NULL, "discount_type" "public"."ENUM_DISCOUNT_TYPE", "discount_value" integer, "discounted_price" integer NOT NULL, CONSTRAINT "IDX_UNIQUE_TicketPriceTypeormEntity_ticket_info_id_customer_role_id" UNIQUE ("ticket_info_id", "customer_role_id"), CONSTRAINT "PK_a77beda837474792ca1309973c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."ENUM_STATUS" NOT NULL DEFAULT 'ACTIVE', "customer_role_id" uuid NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "allow_debt_purchase" boolean NOT NULL, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ENUM_PAYMENT_METHOD" AS ENUM('MOMO', 'BANKING', 'VISA')`);
        await queryRunner.query(`CREATE TYPE "public"."ENUM_ORDER_STATUS" AS ENUM('RESERVED', 'PAID', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."ENUM_STATUS" NOT NULL DEFAULT 'ACTIVE', "event_id" uuid NOT NULL, "customer_id" uuid NOT NULL, "code" character varying NOT NULL, "note" character varying, "event_name" character varying NOT NULL, "customer_name" character varying NOT NULL, "customer_phone" character varying NOT NULL, "customer_email" character varying NOT NULL, "payment_method" "public"."ENUM_PAYMENT_METHOD" NOT NULL, "card_id" character varying, "card_name" character varying, "total_price" integer NOT NULL, "order_status" "public"."ENUM_ORDER_STATUS" NOT NULL DEFAULT 'RESERVED', CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."ENUM_STATUS" NOT NULL DEFAULT 'ACTIVE', "event_id" uuid NOT NULL, "ticket_group_id" uuid NOT NULL, "ticket_info_id" uuid NOT NULL, "order_id" uuid NOT NULL, "customer_id" uuid NOT NULL, "code" character varying NOT NULL, "use_at" TIMESTAMP, "expires_at" TIMESTAMP NOT NULL, "base_price" integer, "discount_type" character varying, "discount_value" integer, "discounted_price" integer, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."ENUM_STATUS" NOT NULL DEFAULT 'ACTIVE', "order_id" uuid NOT NULL, "ticket_group_id" uuid NOT NULL, "ticket_id" uuid NOT NULL, "ticket_name" character varying NOT NULL, "ticket_base_price" integer NOT NULL, "ticket_discount_type" character varying, "ticket_discount_value" integer, "ticket_discounted_price" integer NOT NULL, "quantity" integer NOT NULL, "total_price" integer NOT NULL, CONSTRAINT "PK_278a6e0f21c9db1653e6f406801" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ticket_groups" ADD CONSTRAINT "FK_c433d7e783152fc8e1648faa7b9" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_infos" ADD CONSTRAINT "FK_d273eabbf81086be89f47840645" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_infos" ADD CONSTRAINT "FK_29463f10b8e62d9e6006b205a8f" FOREIGN KEY ("ticket_group_id") REFERENCES "ticket_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" ADD CONSTRAINT "FK_987f8f30dcc316c949fe7fd5fc3" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" ADD CONSTRAINT "FK_a9cf953abe4a87442c7b349e586" FOREIGN KEY ("ticket_info_id") REFERENCES "ticket_infos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" ADD CONSTRAINT "FK_6fbbed3091c5cfc611ce35914e1" FOREIGN KEY ("customer_role_id") REFERENCES "customer_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" ADD CONSTRAINT "FK_e1bdacc1de4e497c12c48304244" FOREIGN KEY ("ticket_group_id") REFERENCES "ticket_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_e2a0ca7867a49de7caf9a1708a9" FOREIGN KEY ("customer_role_id") REFERENCES "customer_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_642ca308ac51fea8327e593b8ab" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_bd5387c23fb40ae7e3526ad75ea" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_9f12cb36fa6024fde0a2d56c248" FOREIGN KEY ("ticket_group_id") REFERENCES "ticket_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_13bc82db9f0217abd4145713592" FOREIGN KEY ("ticket_info_id") REFERENCES "ticket_infos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_bd5636236f799b19f132abf8d70" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_42e4343476d9c4a46fb565a5c46" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_details" ADD CONSTRAINT "FK_3ff3367344edec5de2355a562ee" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_details" ADD CONSTRAINT "FK_be94057dc980d02a31f08099b06" FOREIGN KEY ("ticket_group_id") REFERENCES "ticket_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_details" ADD CONSTRAINT "FK_553c4e818ba603e32a99371079b" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_details" DROP CONSTRAINT "FK_553c4e818ba603e32a99371079b"`);
        await queryRunner.query(`ALTER TABLE "order_details" DROP CONSTRAINT "FK_be94057dc980d02a31f08099b06"`);
        await queryRunner.query(`ALTER TABLE "order_details" DROP CONSTRAINT "FK_3ff3367344edec5de2355a562ee"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_42e4343476d9c4a46fb565a5c46"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_bd5636236f799b19f132abf8d70"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_13bc82db9f0217abd4145713592"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_9f12cb36fa6024fde0a2d56c248"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_bd5387c23fb40ae7e3526ad75ea"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_642ca308ac51fea8327e593b8ab"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_e2a0ca7867a49de7caf9a1708a9"`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" DROP CONSTRAINT "FK_e1bdacc1de4e497c12c48304244"`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" DROP CONSTRAINT "FK_6fbbed3091c5cfc611ce35914e1"`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" DROP CONSTRAINT "FK_a9cf953abe4a87442c7b349e586"`);
        await queryRunner.query(`ALTER TABLE "ticket_prices" DROP CONSTRAINT "FK_987f8f30dcc316c949fe7fd5fc3"`);
        await queryRunner.query(`ALTER TABLE "ticket_infos" DROP CONSTRAINT "FK_29463f10b8e62d9e6006b205a8f"`);
        await queryRunner.query(`ALTER TABLE "ticket_infos" DROP CONSTRAINT "FK_d273eabbf81086be89f47840645"`);
        await queryRunner.query(`ALTER TABLE "ticket_groups" DROP CONSTRAINT "FK_c433d7e783152fc8e1648faa7b9"`);
        await queryRunner.query(`DROP TABLE "order_details"`);
        await queryRunner.query(`DROP TYPE "public"."ENUM_STATUS"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TYPE "public"."ENUM_STATUS"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."ENUM_ORDER_STATUS"`);
        await queryRunner.query(`DROP TYPE "public"."ENUM_PAYMENT_METHOD"`);
        await queryRunner.query(`DROP TYPE "public"."ENUM_STATUS"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TYPE "public"."ENUM_STATUS"`);
        await queryRunner.query(`DROP TABLE "ticket_prices"`);
        await queryRunner.query(`DROP TYPE "public"."ENUM_DISCOUNT_TYPE"`);
        await queryRunner.query(`DROP TYPE "public"."ENUM_STATUS"`);
        await queryRunner.query(`DROP TABLE "customer_roles"`);
        await queryRunner.query(`DROP TYPE "public"."ENUM_STATUS"`);
        await queryRunner.query(`DROP TABLE "ticket_infos"`);
        await queryRunner.query(`DROP TYPE "public"."ENUM_STATUS"`);
        await queryRunner.query(`DROP TABLE "ticket_groups"`);
        await queryRunner.query(`DROP TYPE "public"."ENUM_STATUS"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TYPE "public"."ENUM_DATE_TYPE"`);
        await queryRunner.query(`DROP TYPE "public"."ENUM_EVENT_TYPE"`);
        await queryRunner.query(`DROP TYPE "public"."ENUM_STATUS"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_UNIQUE_UserTypeormEntity_username"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."ENUM_STATUS"`);
    }

}
