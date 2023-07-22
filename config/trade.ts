import Env from '@ioc:Adonis/Core/Env'

export const BINANCE_API_KEY: string = Env.get('BINANCE_API_KEY')

export const BINANCE_API_SECRET: string = Env.get('BINANCE_API_SECRET')

export const LIMIT_CHART: number = Env.get('LIMIT_CHART', 100)

export const INTERVAL_CHART: string = Env.get('INTERVAL_CHART', '1m')
