import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login ({view}) {
    return view.render('auth.login')
  }

  public async register ({ view, i18n }: HttpContextContract) {

    return view.render('auth.register', {
      pageTitle: i18n.formatMessage('auth.register_title_page')
    })
  }
}
