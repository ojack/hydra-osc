const OSC = require('osc-js')

const config = {
    receiver: 'ws',         // @param {string} Where messages sent via 'send' method will be delivered to, 'ws' for Websocket clients, 'udp' for udp client
    udpServer: {
      host: 'localhost',    // @param {string} Hostname of udp server to bind to
      port: 41234,          // @param {number} Port of udp server to bind to
      exclusive: false      // @param {boolean} Exclusive flag
    },
    udpClient: {
      host: 'localhost',    // @param {string} Hostname of udp client for messaging
      port: 41235           // @param {number} Port of udp client for messaging
    },
    wsServer: {
      host: 'localhost',    // @param {string} Hostname of WebSocket server
      port: 8080            // @param {number} Port of WebSocket server
    }
  }
const osc = new OSC({ plugin: new OSC.BridgePlugin(config) })

osc.open() // start a WebSocket server on port 8080

console.log('osc client running on port', config.udpClient.port)
console.log('osc server running on port', config.udpServer.port)
console.log('websocket server running on port', config.wsServer.port)