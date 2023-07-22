import { Server } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'
import {BINANCE_API_SECRET, BINANCE_API_KEY} from "Config/trade";
import Binance from "node-binance-api";

class Ws {
  public io: Server
  private booted = false
  public binance: Binance;

  public boot() {
    /**
     * Ignore multiple calls to the boot method
     */
    if (this.booted) {
      return
    }

    this.booted = true
    this.io = new Server(AdonisServer.instance!)

    this.binance = new Binance().options({
      APIKEY: BINANCE_API_KEY,
      APISECRET: BINANCE_API_SECRET,
      useServerTime: true,
      test: false
    });
  }
}

export default new Ws()
