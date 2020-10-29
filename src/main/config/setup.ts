import express, { Application } from 'express'
import dotenv from 'dotenv-safe'

export default (app: Application) => {
  dotenv.config()

  app.use(express.json())
}
