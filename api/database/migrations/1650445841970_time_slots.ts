import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TimeSlots extends BaseSchema {
    protected tableName = 'time_slots'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table.integer("teacher_id").notNullable().unsigned().references("id").inTable("users")
                .onDelete("CASCADE").onUpdate("CASCADE")
            table.date("date").notNullable();
            table.time("start_time").notNullable();
            table.integer("duration").defaultTo(30);
            table.integer("student_id").unsigned().references("id").inTable("users")
            table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
            table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
