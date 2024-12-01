import {MigrationInterface, QueryRunner} from "typeorm";

//prettier-ignore
export class SealCustomerRole1733036829839 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION prevent_normal_customer_deletion()
            RETURNS TRIGGER AS $$
            BEGIN
                -- Prevent DELETE
                IF TG_OP = 'DELETE' AND OLD.code = 'NORMAL_CUSTOMER' THEN
                    RAISE EXCEPTION 'You cannot delete the NORMAL_CUSTOMER role.';
                END IF;
            
                -- Prevent UPDATE on deleted_at
                IF TG_OP = 'UPDATE' AND OLD.code = 'NORMAL_CUSTOMER' AND NEW.deleted_at IS NOT NULL THEN
                    RAISE EXCEPTION 'You cannot delete the NORMAL_CUSTOMER role.';
                END IF;
            
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);
        await queryRunner.query(`
            CREATE TRIGGER no_delete_normal_customer
            BEFORE DELETE OR UPDATE ON customer_roles
            FOR EACH ROW
            EXECUTE FUNCTION prevent_normal_customer_deletion();
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS no_delete_normal_customer ON customer_roles;`)
        await queryRunner.query(`DROP FUNCTION IF EXISTS prevent_normal_customer_deletion();`)
    }

}
