import express, { Application } from 'express'
import cors from 'cors'

export default (app: Application) => {
  app.use(express.json())
  app.use(cors({
    origin: 'http://localhost:3000'
  }))
}
