// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  public home({view, i18n}) {
    return view.render('home', {
      pageTitle: i18n.formatMessage('general.home_page_title')
    })
  }
}
