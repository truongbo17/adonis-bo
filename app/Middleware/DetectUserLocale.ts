import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LanguageHelper from "Helpers/LanguageHelper"

/**
 * The middleware detects the user language using the "Accept-language" HTTP header
 * or the "lang" query string parameter.
 *
 * Feel free to change the middleware implementation to what suits your needs. Just
 * make sure
 *
 * - You always ensure the user selected language is supported by your app.
 * - Only call "switchLocale" when the detected language is valid string value and
 *   not "null" or "undefined"
 */
export default class DetectUserLocale {
  /**
   * Handle method is called by AdonisJS automatically on every middleware
   * class.
   */
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const language = LanguageHelper.getUserLanguage(ctx.request)

    /**
     * Switch locale when we are able to detect the user language and it
     * is supported by the application
     */
    if (language) {
      ctx.i18n.switchLocale(language)
    }

    /**
     * Share i18n with view
     */
    if ('view' in ctx) {
      ctx.view.share({ i18n: ctx.i18n })
    }

    await next()
  }
}
