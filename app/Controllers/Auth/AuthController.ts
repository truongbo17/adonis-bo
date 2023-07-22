// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login ({view}) {
    return view.render('trade')
  }
}
