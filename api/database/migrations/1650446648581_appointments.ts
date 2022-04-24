import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Appointments extends BaseSchema {
    protected tableName = 'appointments'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table.integer("time_slot_id").notNullable().unsigned().references("id").inTable("time_slots").onDelete("CASCADE").onUpdate("CASCADE")
            table.integer("student_id").unsigned().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE")
            table.enum("status", ['0', '1', '2']).defaultTo('0')
            table.string("agenda").notNullable()
            table.timestamp('date').notNullable()
            table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
            table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
