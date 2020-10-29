import Knex from 'knex'

export function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary().notNullable()
    table.string('username', 120).unique().notNullable()
    table.string('password').notNullable()
  })
}

export const down = (knex: Knex) => knex.schema.dropTable('users')
