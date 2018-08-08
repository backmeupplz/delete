import { json, urlencoded } from 'body-parser'
import * as express from 'express'
import { Application, Router } from 'express'
import * as path from 'path'
import { index } from './routes/index'
import * as errorHandler from 'errorhandler'

export class Server {
  public app: Application

  public static bootstrap() {
    return new Server()
  }

  constructor() {
    this.app = express()
    this.config()
    this.routes()
  }

  public config() {
    // Add static paths
    this.app.use(express.static(path.join(__dirname, '..', 'docs')))
    // Configure pug
    this.app.set('views', path.join(__dirname, '..', 'docs'))
    this.app.set('view engine', 'ejs')
    // Mount json form parser
    this.app.use(json())
    // Mount query string parser
    this.app.use(urlencoded({
      extended: true
    }))
    // Catch 404 and forward to error handler
    this.app.use((err: any, req: any, res: any, next: any) => {
        err.status = 404
        next(err)
    })
    // Error handling
    this.app.use(errorHandler())
  }

  private routes() {
    const router = Router()
  
    // Home page
    router.get('/', index)
  
    // Use router
    this.app.use(router)
  }
}