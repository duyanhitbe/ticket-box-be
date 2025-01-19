import { MigrationInterface, QueryRunner } from 'typeorm';

//prettier-ignore
export class CreateCustomerRole1733033714090 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // const customerRoleRepository = queryRunner.connection.getRepository(CustomerRoleTypeormEntity);
        // await customerRoleRepository.create({
        //     name: 'Khách hàng',
        //     code: ENUM_CUSTOMER_ROLE_CODE.NORMAL_CUSTOMER
        // }).save();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // const customerRoleRepository = queryRunner.connection.getRepository(CustomerRoleTypeormEntity);
        // await customerRoleRepository.delete({
        //     code: ENUM_CUSTOMER_ROLE_CODE.NORMAL_CUSTOMER
        // });
    }

}
