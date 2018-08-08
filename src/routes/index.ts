import { Request, Response, NextFunction } from "express"


export function index(req: Request, res: Response, next: NextFunction) {
  // Render page
  res.render('index')
}