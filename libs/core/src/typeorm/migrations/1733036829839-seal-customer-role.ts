import { MigrationInterface, QueryRunner } from 'typeorm';

//prettier-ignore
export class SealCustomerRole1733036829839 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS no_delete_normal_customer ON customer_roles;`)
        await queryRunner.query(`DROP FUNCTION IF EXISTS prevent_normal_customer_deletion();`)
    }

}
