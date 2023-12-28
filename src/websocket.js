const TradingView = require('@mathieuc/tradingview');

const WebSocket = require('ws');

const DEFAULT_MARKET = 'BINANCE:BTCEUR';
const DEFAULT_MARKET_OPTS = { timeframe: 'D' };

class WebSocketServer {
  constructor(server) {
    this.market = DEFAULT_MARKET;
    this.tvClient = undefined;
    this.tvChart = undefined;
    this.wss = new WebSocket.Server({ server });
    this.setupWebSocket();
  }

  setupWebSocket = () => {
    const onConnection = (ws) => {
      console.log('Base WebSocket connected');

      ws.send('Hello from WebSocket server');

      this.connectToTradingView(ws);

      ws.on('message', (message) =>
        console.log(`Received message from client, doing nothing: ${message}`)
      );

      ws.on('close', () => {
        console.log('WebSocket disconnected, disconnecting TradingView');
        this.disconnectFromTradingView();
      });
    };

    this.wss.on('connection', onConnection);
  };

  connectToTradingView = (ws) => {
    console.log('Connecting to TradingView');

    const client = new TradingView.Client();
    const chart = new client.Session.Chart();

    chart.setMarket(DEFAULT_MARKET, DEFAULT_MARKET_OPTS);

    chart.onError((...err) => console.error('Chart error:', ...err));

    chart.onSymbolLoaded(() => {
      const chartReadyLog = `Market "${chart.infos.description}" loaded !`;
      console.log(chartReadyLog);
      ws.send(chartReadyLog); // let the client know we're ready
    });

    chart.onUpdate(() => {
      if (!chart.periods[0]) return;

      const { infos: chartInfos, periods } = chart;
      const { description, currency_id: currencyId } = chartInfos;

      const priceChangeLog = `[${description}]: ${periods[0].close} ${currencyId}`;

      console.log(`Forwarding to the client: ${priceChangeLog}`);

      ws.send(priceChangeLog);
    });

    console.log('Setting tvClient & tvChart');

    this.tvClient = client;
    this.tvChart = chart;
  };

  setTimeframe = (timeframe) => {
    console.log('\nSetting timeframe to 15 minutes...');
    this.tvChart.setSeries(timeframe);
  };

  setMarket = (market) => {
    console.log('\nSetting market to BINANCE:ETHEUR...');
    this.tvChart.setMarket(market, DEFAULT_MARKET_OPTS);
    this.market = market;
  };

  setChartType = (chartType) => {
    console.log(`\nSetting the chart type to ${chartType}`);
    this.tvChart.setMarket(this.market, {
      ...DEFAULT_MARKET_OPTS,
      type: chartType,
    });
  };

  disconnectFromTradingView = () => {
    console.log('Disconnecting from TradingView');

    this.tvChart.delete();
    this.tvChart = undefined;
    this.tvClient.end();
    this.tvClient = undefined;
  };
}

module.exports = WebSocketServer;
