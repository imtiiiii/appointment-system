import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TimeSlots extends BaseSchema {
    protected tableName = 'time_slots'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table.integer("teacher_id").notNullable().unsigned().references("id").inTable("users")
                .onDelete("CASCADE").onUpdate("CASCADE")
            // table.date("day_id").notNullable().unsigned().references('id').inTable('days');
            table.time("start_time").notNullable();
            table.time("end_time").notNullable();
            table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
            table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
