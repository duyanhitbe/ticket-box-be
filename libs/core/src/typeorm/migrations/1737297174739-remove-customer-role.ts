import { MigrationInterface, QueryRunner } from 'typeorm';

//prettier-ignore
export class RemoveCustomerRole1737297174739 implements MigrationInterface {
    name = 'RemoveCustomerRole1737297174739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_e2a0ca7867a49de7caf9a1708a9"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "customer_role_id"`);
        await queryRunner.query(`DROP TRIGGER IF EXISTS no_delete_normal_customer ON customer_roles;`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS prevent_normal_customer_deletion();`);
        await queryRunner.query(`DROP TABLE "customer_roles";`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "customer_role_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_e2a0ca7867a49de7caf9a1708a9" FOREIGN KEY ("customer_role_id") REFERENCES "customer_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "customer_roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "public"."ENUM_STATUS" NOT NULL DEFAULT 'ACTIVE', "name" character varying NOT NULL, CONSTRAINT "PK_032727c6b2f9abee3b06d3e78e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION prevent_normal_customer_deletion()
            RETURNS TRIGGER AS $$
            BEGIN
            
                IF TG_OP = 'DELETE' THEN
                    IF OLD.code = 'NORMAL_CUSTOMER' THEN
                        RAISE EXCEPTION 'Deletion of NORMAL_CUSTOMER is not allowed.';
                    END IF;
                    RETURN OLD;
                END IF;
            
                IF TG_OP = 'UPDATE' THEN
                    IF NEW.deleted_at IS NOT NULL AND OLD.code = 'NORMAL_CUSTOMER' THEN
                        RAISE EXCEPTION 'Deletion of NORMAL_CUSTOMER is not allowed.';
                    END IF;
                    RETURN NEW;
                END IF;
            
            END;
            $$ LANGUAGE plpgsql;
        `);
        await queryRunner.query(`
            CREATE TRIGGER no_delete_normal_customer
            BEFORE DELETE OR UPDATE ON public.customer_roles
            FOR EACH ROW
            EXECUTE FUNCTION prevent_normal_customer_deletion();
        `);
    }

}
