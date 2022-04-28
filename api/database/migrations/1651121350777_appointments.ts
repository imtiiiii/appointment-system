import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Appointments extends BaseSchema {
    protected tableName = 'appointments'

    public async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string("date").notNullable();
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
