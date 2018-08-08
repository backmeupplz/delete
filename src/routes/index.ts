import { Request, Response, NextFunction } from "express"


export function index(req: Request, res: Response, next: NextFunction) {
  //render page
  res.render('index')
}