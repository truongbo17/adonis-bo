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
import './view'

Route.get('/', async ({ view,auth }) => {
  console.error(auth?.user)
  return view.render('welcome')
}).as('home')

Route.get('/trade', 'TradesController.index')
Route.get('/chart', 'TradesController.chart')

Route.group(() => {
  Route.get('login', 'Auth/AuthController.login').as('auth.login')
  Route.post('login', 'Auth/AuthController.postLogin').as('auth.postLogin')
  Route.get('register', 'Auth/AuthController.register').as('auth.register')
  Route.post('register', 'Auth/AuthController.postRegister').as('auth.postRegister')
}).middleware('guest');

Route.post('/logout', 'Auth/AuthController.logout').as('auth.logout').middleware('auth')


Route.post('language/:locale', async ({ session, response, params }) => {
  /**
   * Only update locale when it is part of the supportedLocales
   */
  if (I18n.supportedLocales().includes(params.locale)) {
    session.put('locale', params.locale)
  }

  response.redirect().back()
}).as('language.update')

Route.get('reload-tran', async () => {
  await I18n.reloadTranslations()

  return 'OK'
})
