import I18n from "@ioc:Adonis/Addons/I18n";
import { types } from '@ioc:Adonis/Core/Helpers'

export default class LanguageHelper{
  /**
   * Detect user language using "Accept-language" header or
   * the "lang" query string parameter.
   *
   * The user language must be part of the "supportedLocales", otherwise
   */
  public static getUserLanguage(request): string {
    const availableLocales = I18n.supportedLocales()
    let languageUser = request?.language(availableLocales) || request?.input('lang')
    if (types.isNull(languageUser)) {
      return I18n.defaultLocale
    }
    return languageUser
  }
}
