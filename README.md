# Overview

This is an example node.js server that uses [Mathieu2301/TradingView-API](https://github.com/Mathieu2301/TradingView-API) to get TradingView simple chart data and forwards it to a client via WebSockets

![demo](demo.gif)

1. Sets up a simple WebSocket server
2. When a client connects to the WebSocket server it will open up another WebSocket connection to get TradingView data by using [Mathieu2301/TradingView-API](https://github.com/Mathieu2301/TradingView-API)
3. When the TradingView WebSocket gives us any data, that data will be forwarded to the client
4. If the client closes the connection, the server will close the TradingView connection

# How to run

Make sure you have Node.js 20 installed and available

Simply execute the following commands to run the server

```bash
$ nvm use

Now using node v20.10.0 (npm v10.2.3)

$ npm i

up to date, audited XX packages in YYYms

$ npm run dev

> trading-view-api-examples-server-node-express@0.0.1 dev
> node index.js

Server is running on port 3000
```

# How to test

## With CLI tool `wscat`

While the server is running open another terminal and run the following commands

```bash
$ npm i -g wscat

npm i -g wscat

added 9 packages in 211ms

$ wscat -c ws://localhost:3000

Connected (press CTRL+C to quit)

< Hello from WebSocket server
< Market "Bitcoin / Euro" loaded !
< [Bitcoin / Euro]: 38721.43 EUR
< [Bitcoin / Euro]: 38721.43 EUR
...
```

If you look at the server logs you'll see

```bash
...
Server is running on port 3000
Base WebSocket connected
Connecting to TradingView
Setting tvClient & tvChart
Market "Bitcoin / Euro" loaded !
Forwarding to the client: [Bitcoin / Euro]: 38721.43 EUR
Forwarding to the client: [Bitcoin / Euro]: 38721.43 EUR
Forwarding to the client: [Bitcoin / Euro]: 38737.85 EUR
Forwarding to the client: [Bitcoin / Euro]: 38734.25 EUR
...
```

# Comments

Have a look at the functions of the src/websocket.js script to understand how you can select which market, which timeframe among other things. This project does not describe everything you can do but just an example of something that can be done.

# Conclusion

There you have it! With this example you're now able to easily get some data from TradingView ^^

I hope this was helpful for your project

If you liked this project and want to see more like it please consider sponsoring

Feel free to reach out on Twitter or Telegram (@clins777)

Cheers 🍻
