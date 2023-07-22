// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ws from 'App/Services/Ws'
import {LIMIT_CHART} from "Config/trade";
import {INTERVAL_CHART} from "Config/trade";

Ws.boot()

export default class TradesController {
  public async index({view}) {
    return view.render('trade')
  }

  public async chart({request, response}) {
    const requestQueryString = request.qs();
    const data = await Ws.binance.futuresCandles(requestQueryString?.symbol, INTERVAL_CHART, {limit: LIMIT_CHART});

    return response.json(data)
  }
}
