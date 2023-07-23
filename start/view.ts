import View from '@ioc:Adonis/Core/View'
import {appName} from 'Config/app'
import Logger from "@ioc:Adonis/Core/Logger";
import { types } from '@ioc:Adonis/Core/Helpers'

View.global('appName', appName)

View.global('stringTitleCase', (input) => {
  try {
    if (types.isArray(input)) {
      input = input[0]
    }

    if (types.isObject(input)) {
      input = Object.entries(input)[0][1]
    }

    return input.toLowerCase().replace(/(^|\s)\S/g, (match) => match.toUpperCase());
  } catch (e) {
    Logger.error(e)
  }

  return 'Error'
})
