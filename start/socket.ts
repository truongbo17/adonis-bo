import Ws from 'App/Services/Ws';
import {INTERVAL_CHART} from "Config/trade";
// import Binance from "node-binance-api";

// const WebSocket = require('ws');

Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.on('get-price', () => {
    Ws.binance.candlesticks("BTCUSDT", "1m", (error, ticks) => { //symbol
      if (error == null) {

        console.log(ticks, Date.now())

        // let last_tick = ticks[ticks.length - 1];
        //
        // let [time, open, high, low, close, volume] = last_tick;
        //
        // const h = parseFloat(parseFloat(high).toFixed(2));
        // const l = parseFloat(parseFloat(low).toFixed(2));
        // const c = parseFloat(parseFloat(close).toFixed(2));
        // const v = parseFloat(parseFloat(volume).toFixed(2));
        //
        // console.log(time, h, l, c ,v)
      }
    })

    // const symbol = 'btcusdt'; // Cặp giao dịch bạn muốn theo dõi (BTC/USDT)
    // const ws = new WebSocket('wss://stream.binance.com:9443/ws/' + symbol + '@ticker');
    //
    // ws.on('message', (data) => {
    //   const parsedData = JSON.parse(data);
    //
    //   console.log(parsedData)
    //   socket.emit('send-price-btc', {
    //     close: parsedData.c
    //   })
    // });

  });


  socket.on('get-new-chart-data', async (data) => {
    const daiLyChartBTC = await Ws.binance.futuresCandles(data?.symbol, INTERVAL_CHART, {limit: 1})
    socket.emit('send-new-chart-data', daiLyChartBTC)
  });

  socket.emit('news', {hello: 'world'})
});
