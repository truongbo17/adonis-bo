import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import User from "App/Models/User";

export default class AuthController {
  public async login({view, i18n}) {
    return view.render('auth.login', {
      pageTitle: i18n.formatMessage('auth.login_title_page')
    })
  }

  public async postLogin({auth, request, response, session}) {
    const newLoginSchema = schema.create({
      email: schema.string({}, [
        rules.email()
      ]),
      password: schema.string({}, [
        rules.minLength(8)
      ]),
    })

    const dataValidated = await request.validate({
      schema: newLoginSchema,
      cacheKey: request.routeKey
    })

    try {
      await auth.use('web').attempt(dataValidated.email, dataValidated.password)
      console.error(auth?.user)
    } catch (e) {
      session.flashExcept(['password'])
      session.flash({errors: ['Tài khoản hoặc mật khẩu không chính xác.']})
      return response.redirect().toRoute('auth.login')
    }
    response.redirect().toRoute('home')
  }

  public async register({view, i18n}: HttpContextContract) {
    return view.render('auth.register', {
      pageTitle: i18n.formatMessage('auth.register_title_page')
    })
  }

  public async postRegister({auth, request, response, session}) {
    const newRegisterSchema = schema.create({
      username: schema.string({}, [
        rules.maxLength(50)
      ]),
      email: schema.string({}, [
        rules.email()
      ]),
      password: schema.string({}, [
        rules.confirmed('password_confirm'),
        rules.minLength(8)
      ]),
    })

    const dataValidated = await request.validate({
      schema: newRegisterSchema,
      cacheKey: request.routeKey
    })

    try {
      const user = await User.create(dataValidated)

      // Authenticate the user
      await auth.use('web').login(user)
    } catch (e) {
      session.flashExcept(['password'])
      session.flash({errors: ['Có lỗi xảy ra, vui lòng thử lại.']})
      return response.redirect().toRoute('auth.register')
    }

    return response.redirect().toRoute('home');
  }

  public async logout({auth, response, session}) {
    try {
      await auth.use('web').logout()
    } catch (e) {
      session.flash({errors: ['Có lỗi xảy ra, vui lòng thử lại.']})
      return response.redirect().toRoute('home')
    }
    response.redirect().toRoute('auth.login')
  }
}
