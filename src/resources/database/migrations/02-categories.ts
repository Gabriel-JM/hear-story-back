import Knex from 'knex'

export function up(knex: Knex) {
  return knex.schema.createTable('categories', table => {
    table.increments('id').primary().notNullable()
    table.string('name', 80).unique().notNullable()
    table.string('color', 7).notNullable()
    table.integer('user_id').unsigned().notNullable()

    table.foreign('user_id').references('users.id')
  })
}

export const down = (knex: Knex) => knex.schema.dropTable('users')
