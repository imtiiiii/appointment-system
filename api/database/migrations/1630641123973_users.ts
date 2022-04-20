import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
    protected tableName = 'users'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.string("first_name").notNullable();
            table.string("last_name").notNullable();
            table.string("user_name")
            table.string('email', 255).notNullable()
            table.string('password', 180).notNullable()
            table.enum("user_type", ["admin", "teacher", "student"]).notNullable();
            table.string("student_id")
            table.string("course")
            table.string("dept").notNullable();
            table.enum("status", [0, 1, 2]).defaultTo(0)
            table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
            table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
