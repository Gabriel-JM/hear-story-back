import Knex from 'knex'

export function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary().notNullable()
    table.string('name', 80).notNullable()
    table.string('username', 20).unique().notNullable()
    table.string('email', 120).notNullable()
    table.string('birthday', 10).notNullable()
    table.string('password').notNullable()
    table.boolean('privacyTerms').notNullable()
  })
}

export const down = (knex: Knex) => knex.schema.dropTable('users')
