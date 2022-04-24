import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterTimeSlotsAddDayIds extends BaseSchema {
  protected tableName = 'time_slots'

  public async up () {
    this.schema.alterTable(this.tableName,(table)=>{
      table.integer("day_id").notNullable().unsigned().references('id').inTable('days');
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName,(table)=>{
      table.dropColumn('day_id')
    })
  }
}
