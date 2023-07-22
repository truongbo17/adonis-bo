/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/
import I18n from '@ioc:Adonis/Addons/I18n'
import Route from '@ioc:Adonis/Core/Route'
import {appName} from 'Config/app'
import './view'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/trade', 'TradesController.index')
Route.get('/chart', 'TradesController.chart')

Route.group(() => {
  Route.get('login', 'Auth/AuthController.login')
  Route.get('register', 'Auth/AuthController.register')
  Route.get('test', ({logger}) => {
    logger.info('An info message')
    logger.info(appName)
  })
});



Route.post('language/:locale', async ({ session, response, params }) => {
  /**
   * Only update locale when it is part of the supportedLocales
   */
  if (I18n.supportedLocales().includes(params.locale)) {
    session.put('locale', params.locale)
  }

  response.redirect().back()
}).as('language.update')
