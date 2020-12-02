import Knex from 'knex'

export function up(knex: Knex) {
  return knex.schema.createTable('categories', table => {
    table.increments('id').primary().notNullable()
    table.string('name', 80).notNullable()
    table.string('color', 7).notNullable()
    table.integer('user').unsigned().notNullable()

    table.foreign('user').references('users.id')
  })
}

export const down = (knex: Knex) => knex.schema.dropTable('users')
