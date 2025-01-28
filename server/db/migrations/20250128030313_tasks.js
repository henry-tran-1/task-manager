export async function up(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id')
    table.string('title')
    table.string('details')
    table.integer('priority')
    table.boolean('is_completed').defaultTo(false)
    table.timestamp('created_at')
    table.timestamp('updated_at')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('tasks')
}
