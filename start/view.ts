import View from '@ioc:Adonis/Core/View'
import {appName} from 'Config/app'

View.global('appName', appName)
