import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RedirectIfAuthenticated {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    try {
      if (await auth.check()) {
        return response.redirect().toRoute('home')
      }
    } catch (e) {}

    await next()
  }
}
